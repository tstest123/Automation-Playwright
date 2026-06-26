Feature: Completing census form


Scenario: Completing Census form
Given I am on Census Form page1 "Are you completing the 2026 Census Test for:"
Then I verify the address "246 Round Top Dr HARVEST, AL 35749" is displayed
And User clicks Yes button
And User clicks Next
Then I verify that page2 "Do YOU live or stay at:" is displayed

Then I verify the address "246 Round Top Dr HARVEST, AL 35749" is displayed
And click Help link
