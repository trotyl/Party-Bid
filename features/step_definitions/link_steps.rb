# encoding: utf-8

# 使用Capybara

When /^我访问"(.*?)"并点击(.*)链接时$/ do |arg1, arg2|
  # puts arg1
  # puts arg2
  visit arg1
  @elem = find("a", :text => /\A#{arg2}\z/)
end

Then /^页面状态应该为"(.*?)"$/ do |arg1|
  # pending # express the regexp above with the code you wish you had
  @elem.click
end

# 使用http client

When /^我访问(.*)链接时$/ do |arg1|
  puts arg1
  @response = RestClient.get arg1
end

Then /^我得到的页面状态应该为"(.*)"$/ do |arg1|
  puts arg1
  @response.code.to_s.should eq(arg1)
end
