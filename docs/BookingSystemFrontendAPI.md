# Booking System Frontend API
![By Team 107](https://img.shields.io/badge/By-Team_107-blue?style=for-the-badge)

This frontend API manages the traffic between frontend and backend servers.

## Activity
| Method                     | Arguments    | Returns                                                                                         | Description                |
|----------------------------|--------------|-------------------------------------------------------------------------------------------------|----------------------------|
| `async getActivitiesAsync` | `void`       | [`[Activity]`](https://github.com/lbp-inc/lbp-website/blob/main/docs/BookingSystem.md#activity) | Returns all activities     |
| `async getActivityAsync`   | `activityId` | [`[Activity]`](https://github.com/lbp-inc/lbp-website/blob/main/docs/BookingSystem.md#activity) | Gets an activity by its ID |
