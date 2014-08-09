'use strict';

describe('MessageModel:', function () {

	var spy_activity;
	var new_register;
	var native_accessor;
	var spy_dictionary;

	beforeEach(function () {
		localStorage.clear();

		native_accessor = {
			send_sms: function (phone, text) {
				this.message = phone + ' ' + text;
			}
		};

		spy_activity = {
			name: 'mock',
			count: 3,
			setRegister: function (status) {
				this.register = status;
			},
			setBid: function (status) {
				this.bid = status;
			}
		};

		spy_dictionary = {
			register_run: "恭喜！报名成功！^o^",
			register_prepare: "活动尚未开始，请稍后~ >.<",
			register_over: "Sorry，活动报名已结束.. =.=",
			register_repeat: "您已经报过名了，请勿浪费短信费.. -_-||",
			bid_run: "恭喜！您已出价成功！^o^",
			bid_prepare: "竞价尚未开始，请稍后~ >.<",
			bid_over: "Sorry，活动竞价已结束.. =.=",
			bid_undefined: "对不起，您没有报名此次活动.. T.T",
			bid_repeat: "您已成功出价，请勿重复出价.. -_-||"
		};

		spyOn(Activity, "now").and.returnValue(spy_activity);
		spyOn(Data, "get_sendback_text").and.returnValue(spy_dictionary);
		spyOn(Data, "get_native_accessor").and.returnValue(native_accessor);
		spyOn(Data, "refresh_ui_list").and.returnValue(null);
	});

	describe('The Message', function () {
		beforeEach(function () {
		});

		it('should return right info', function () {
			spy_activity.setRegister('prepare');
			Message.received_new_item({messages:[{create_date:"",message:"bm余泽江",phone:"11111111111"}]});
			expect(native_accessor.message).toEqual('11111111111 活动尚未开始，请稍后~ >.<');
			
			spy_activity.setRegister('run');
			Message.received_new_item({messages:[{create_date:"",message:"bm余泽江",phone:"11111111111"}]});
			expect(native_accessor.message).toEqual('11111111111 恭喜！报名成功！^o^');

			Message.received_new_item({messages:[{create_date:"",message:"bm余泽江",phone:"11111111111"}]});
			expect(native_accessor.message).toEqual('11111111111 您已经报过名了，请勿浪费短信费.. -_-||');
			
			spy_activity.setRegister('over');
			Message.received_new_item({messages:[{create_date:"",message:"bm余泽江",phone:"11111111111"}]});
			expect(native_accessor.message).toEqual('11111111111 Sorry，活动报名已结束.. =.=');
			
			spy_activity.setRegister('run');
			Message.received_new_item({messages:[{create_date:"",message:"bm李杨",phone:"22222222222"}]});
			expect(native_accessor.message).toEqual('22222222222 恭喜！报名成功！^o^');
			
			spy_activity.setBid('prepare');
			Message.received_new_item({messages:[{create_date:"",message:"jj余泽江",phone:"11111111111"}]});
			expect(native_accessor.message).toEqual('11111111111 竞价尚未开始，请稍后~ >.<');
			
			spy_activity.setBid('run');
			Message.received_new_item({messages:[{create_date:"",message:"jj余泽江",phone:"11111111111"}]});
			expect(native_accessor.message).toEqual('11111111111 恭喜！您已出价成功！^o^');
			
			Message.received_new_item({messages:[{create_date:"",message:"jj余泽江",phone:"11111111111"}]});
			expect(native_accessor.message).toEqual('11111111111 您已成功出价，请勿重复出价.. -_-||');

			Message.received_new_item({messages:[{create_date:"",message:"jj李杨",phone:"22222222222"}]});
			expect(native_accessor.message).toEqual('22222222222 恭喜！您已出价成功！^o^');
			
			Message.received_new_item({messages:[{create_date:"",message:"jj卢来金",phone:"33333333333"}]});
			expect(native_accessor.message).toEqual('33333333333 对不起，您没有报名此次活动.. T.T');

			spy_activity.setBid('over');
			Message.received_new_item({messages:[{create_date:"",message:"jj余泽江",phone:"11111111111"}]});
			expect(native_accessor.message).toEqual('11111111111 Sorry，活动竞价已结束.. =.=');
		});

		it('should deal with multi format', function () {
			spy_activity.setRegister('run');
			Message.received_new_item({messages:[{create_date:"",message:"bm 余泽江",phone:"11111111111"}]});
			expect(native_accessor.message).toEqual('11111111111 恭喜！报名成功！^o^');

			Message.received_new_item({messages:[{create_date:"",message:"BM 李杨",phone:"22222222222"}]});
			expect(native_accessor.message).toEqual('22222222222 恭喜！报名成功！^o^');

			spy_activity.setBid('run');
			Message.received_new_item({messages:[{create_date:"",message:"jj 余泽江",phone:"11111111111"}]});
			expect(native_accessor.message).toEqual('11111111111 恭喜！您已出价成功！^o^');
			
			Message.received_new_item({messages:[{create_date:"",message:"JJ 李杨",phone:"22222222222"}]});
			expect(native_accessor.message).toEqual('22222222222 恭喜！您已出价成功！^o^');
		});

		it('should refresh the views', function () {
			spy_activity.setRegister('run');
			Message.received_new_item({messages:[{create_date:"",message:"bm 余泽江",phone:"11111111111"}]});
			expect(Data.refresh_ui_list).toHaveBeenCalledWith('register');

			spy_activity.setBid('run');
			Message.received_new_item({messages:[{create_date:"",message:"jj 余泽江",phone:"11111111111"}]});
			expect(Data.refresh_ui_list).toHaveBeenCalledWith('bid');

		});

	});

});
