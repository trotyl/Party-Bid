Feature: 中间页死链
  为了保证中间页没有死链。

  Scenario Outline: 测死链（Capybara）
    When 我访问"http://weigou.baidu.com"并点击<some_link>链接时
    Then 页面状态应该为"200"

  Examples: 点这些
  	| some_link |
  	| 团购 |

  @new	
  Scenario Outline: 测死链（http client）
    When 我访问<some_link>链接时
    Then 我得到的页面状态应该为"200"

  Examples: 点这些
  	| some_link |
  	| http://weigou.baidu.com/ |
  	| http://weigou.baidu.com/topic/food |
  	| http://weigou.baidu.com/topic/beauty |
