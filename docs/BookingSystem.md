# Booking System Documentation
By Team 107

## Models
### Activity
| Name            | Type           | Required | Description                                                       | Possible Values                    |
|-----------------|----------------|----------|-------------------------------------------------------------------|------------------------------------|
| `name`          | `String`       | yes      | Title of activity                                                 |                                    |
| `subtitle`      | `String`       | yes      | A short description, will be shown in "all activities" page       |                                    |
| `activity_type` | `String`       | yes      | Type of activity                                                  | course \| event                    |
| `labels`        | `List<String>` | no       | Category labels, used for filtering                               |                                    |
| `image`         | `String`       | no       | A resource URI pointing to an image (please put in public folder) | /res/courses/Falls and Balance.jpg |
| `description`   | `String`       | no       | A longer description, will be shown in "details" page             |                                    |
| `time`          | `Date`         | yes      | Time of the activity                                              |                                    |
| `duration`      | `Number`       | yes      | Duration of the activity (in minutes)                             |                                    |
| `location`      | `String`       | yes      | Location of the activity                                          |                                    |
| `cost`          | `Number`       | no       | Cost of the activity, default to be 0 for free activities         |                                    |
| `max_capacity`  | `Number`       | no       | Max capacity of an activity, default to be no limit               |                                    |
| `bookings`      | `[ObjectId]`   | no       | List of bookings, used to calculate availability                  |                                    |
### Booking
### Transaction