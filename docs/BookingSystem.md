# Booking System Documentation
![By Team 107](https://img.shields.io/badge/By-Team_107-blue?style=for-the-badge)

## Models
### Activity
| Name            | Type           | Required | Description                                                       | Possible Values                    |
|-----------------|----------------|----------|-------------------------------------------------------------------|------------------------------------|
| `_id`           | `ObjectId`     | N/A      | Primary key                                                       |                                    |
| `name`          | `String`       | yes      | Title of activity                                                 |                                    |
| `subtitle`      | `String`       | yes      | A short description, will be shown in "all activities" page       |                                    |
| `activity_type` | `String`       | yes      | Type of activity                                                  | course \| event                    |
| `labels`        | `[String]`     | no       | Category labels, used for filtering                               |                                    |
| `image`         | `String`       | no       | A resource URI pointing to an image (please put in public folder) | /res/courses/Falls and Balance.jpg |
| `description`   | `String`       | no       | A longer description, will be shown in "details" page             |                                    |
| `time`          | `Date`         | yes      | Time of the activity                                              |                                    |
| `duration`      | `Number`       | yes      | Duration of the activity (in minutes)                             |                                    |
| `location`      | `String`       | yes      | Location of the activity                                          |                                    |
| `cost`          | `Number`       | no       | Cost of the activity, default to be 0 for free activities         |                                    |
| `max_capacity`  | `Number`       | no       | Max capacity of an activity, default to be no limit               |                                    |
| `bookings`      | `[ObjectId]`   | no       | List of bookings, used to calculate availability                  |                                    |
### Booking
| Name              | Type           | Required | Description                                                       | Possible Values                    |
|-------------------|----------------|----------|-------------------------------------------------------------------|------------------------------------|
| `_id`             | `ObjectId`     | N/A      | Primary key                                                       |                                    |
| `activity_id`     | `ObjectId`     | yes      | Associated activity                                               |                                    |
| `member_id`       | `ObjectId`     | yes      | Associated member, including guests                               |                                    |
| `payment_required` | `Number`       | no       | Total amount of payment required (default to 0 for free activities). This should not change once booking has made. Outstanding payment should be calculated by adding transactions (manual credit adjustments can be made using virtual transactions with no member_id stated)  |                                    |
| `transaction_id`  | `[ObjectId]`   | no       | Records relevant transactions (to calculate outstanding payment)  |                                    |

### Transaction

## Endpoints
Please check out [`BookingSystemFrontendAPI.md`](https://github.com/lbp-inc/lbp-website/blob/main/docs/BookingSystemFrontendAPI.md)https://github.com/lbp-inc/lbp-website/blob/main/docs/BookingSystemFrontendAPI.md
