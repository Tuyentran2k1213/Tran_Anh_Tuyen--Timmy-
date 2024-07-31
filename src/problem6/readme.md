# Live Scoreboard Update Module

## Overview

This module is responsible for handling live updates to the scoreboard on our website. It processes user actions that increase scores and ensures the integrity of the score updates to prevent unauthorized modifications.

## Features

1. **Live Scoreboard Updates**: Updates the scoreboard in real-time, reflecting the top 10 user scores.
2. **Secure Score Increment**: Validates and processes score increments securely.
3. **API Integration**: Provides an API endpoint to update user scores upon action completion.

## API Endpoint

### POST /api/update-score

**Description**: Updates the score of a user upon action completion.

**Request Body**:

```json
{
  "user_id": "string",
  "action_id": "string",
  "auth_token": "string"
}
```

- `user_id`: The unique identifier of the user.
- `action_id`: Unique identifier of the action completed.
- `auth_token`: Authorization token to validate the request.

#### Response:

- `200 OK`: When the user send action and update the score successfully.
- `400 Bad Request`: Invalid request parameters.
- `401 Unauthorized`: Invalid or missing authorization token (Authorized faild).
- `500 Internal Server Error`: Server error occurred.

## Database Schema

### Users Table

| Column       | Type      | Description                                   |
| :----------- | :-------- | :-------------------------------------------- |
| `user_id`    | `STRING`  | **Required**. Unique identifier for the user  |
| `score`      | `INTEGER` | **Required**. Current score of the user       |
| `auth_token` | `STRING`  | **Required**.Authorization token for the user |

### Actions Table

| Column        | Type      | Description                                    |
| :------------ | :-------- | :--------------------------------------------- |
| `action_id`   | `STRING`  | **Required**. Unique identifier for the action |
| `score_value` | `INTEGER` | **Required**. The score value of the action    |

## Implementation Details

1. **Authentication**: Validate the `auth_token` to ensure the request is authorized.
2. **Action Validation**: Verify the `action_id` to ensure it is a valid and recognized action.
3. **Score Update**: Increment the user's score based on the `score_value` of the action.
4. **Concurrency Handling**: Ensure atomic updates to prevent race conditions.
5. **Real-time Update**: Push the updated scoreboard to connected clients.

## Diagram

![View Diagram](./Diagram.drawio.svg)

## Improvements

1. **Rate Limiting**: Implement rate limiting to prevent abuse of the score update endpoint.
2. **Detailed Logging**: Add logging for audit and debugging purposes.
3. **Caching**: Use caching mechanisms to optimize scoreboard retrieval and reduce database load.
4. **Monitoring and Alerts**: Set up monitoring and alerts to detect and respond to anomalies or failures promptly.

## Contact

For any issues or inquiries, please contact me at [tuyendev21@gmail.com](tuyendev21@gmail.com).
