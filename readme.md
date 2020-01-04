# Recipe Saver README

## Recipe Saver Plan Types (Legacy)
The following plan types exist:
  - Full (Legacy)
  - Full
  - Basic
  - Full (9/monthy) - To signify subscription plans
  - Basic (Subscription ended year-month-day) - To signify plans that may still be really Full plans if the end date hasn't happened yet.

## New Subscription Process (Legacy)
When purchasing the Full plan subscription a new customer is created in Stripe each time (even if they've bought the plan and the past and then canceled). A new subscription is also created and attached to this new customer object in Stripe so the subscription ID should be new with each purchase.

## Checking Active Subscriptions (Legacy)
To check if a customer has a truly active subscription and may still use the Full plan features the following checks should be performed:
`subscription` is either `Full` or `Basic (Subscription ended xxxx-xx-xx)` AND the current time is less than `subEnds`.