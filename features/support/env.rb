#!/bin/env ruby
# encoding: utf-8
require 'selenium-webdriver'
require 'capybara/cucumber'
# require 'pry'
# require 'spreadsheet'
# require 'csv'
# require 'mail'
require 'rest-client'

Capybara.default_driver = :selenium
Capybara.run_server = false
Capybara.ignore_hidden_elements = true
Capybara.default_wait_time = 20

MANUAL_PAY = false

# Spreadsheet.client_encoding = 'UTF-8'

# module HasBrowser
#   @@browser = Selenium::WebDriver.for :firefox
#   # at_exit { @@browser.quit }
#   def browser
#     @@browser
#   end
# end

# World(HasBrowser)
