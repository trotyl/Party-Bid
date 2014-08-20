Feature: Create Activity Page
  In order to check all the functions of the createActivity page is right.

  Scenario: The Back button should not shown if there's no activity

    Given there is "0" activity
    When it's now in "createActivity" page
    Then the "返回" "button" should be "hidden"


  Scenario: The create button should be disabled if input is empty

    Given there is "0" activity
    When it's now in "createActivity" page
    And the input activity name is ""
    Then the "创建" "button" should be "disabled"


  Scenario: The warning should be shown if the name is already exist

    Given there is "3" activity
    When it's now in "createActivity" page
    And the input activity name is "活动二"
    Then the "名称与现有活动重复！" "label" should be "shown"
