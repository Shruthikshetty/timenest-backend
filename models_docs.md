NOTE: AI generated for reference only

Here are the models in a table structure for visualization:

**User Model**

| Field Name  | Data Type | Description                                  |
| ----------- | --------- | -------------------------------------------- |
| \_id        | ObjectId  | Unique identifier for the user               |
| name        | String    | User's name                                  |
| email       | String    | User's email address                         |
| password    | String    | User's password                              |
| designation | String    | User's designation                           |
| task        | Number    | User's task count                            |
| mentor      | Boolean   | User's who have register'd to be a mentor    |
| ratings     | Number    | User's ratings count                         |
| createdAt   | Date      | Timestamp for when the user was created      |
| updatedAt   | Date      | Timestamp for when the user was last updated |

**Task Model**

| Field Name     | Data Type | Description                                  |
| -------------- | --------- | -------------------------------------------- |
| \_id           | ObjectId  | Unique identifier for the task               |
| title          | String    | Task title                                   |
| description    | String    | Task description                             |
| category       | String    | Task category                                |
| timeToComplete | Number    | Time to complete the task                    |
| displayMedia   | String    | URI for the task's display media             |
| createdAt      | Date      | Timestamp for when the task was created      |
| updatedAt      | Date      | Timestamp for when the task was last updated |

**UserTask Model**

| Field Name  | Data Type | Description                                                     |
| ----------- | --------- | --------------------------------------------------------------- |
| \_id        | ObjectId  | Unique identifier for the user task                             |
| userId      | ObjectId  | Foreign key referencing the User model                          |
| taskId      | ObjectId  | Foreign key referencing the Task model                          |
| progress    | Number    | User's progress on the task                                     |
| rating      | Number    | User's rating for the task                                      |
| status      | String    | User's status on the task (planned, inProgress, complete, quit) |
| startedAt   | Date      | Timestamp for when the user started the task                    |
| completedAt | Date      | Timestamp for when the user completed the task                  |
| createdAt   | Date      | Timestamp for when the user task was created                    |
| updatedAt   | Date      | Timestamp for when the user task was last updated               |

**Review Model**

| Field Name | Data Type | Description                                    |
| ---------- | --------- | ---------------------------------------------- |
| \_id       | ObjectId  | Unique identifier for the review               |
| reviewerId | ObjectId  | Foreign key referencing the User model         |
| revieweeId | ObjectId  | Foreign key referencing the User model         |
| message    | String    | Review message                                 |
| rating     | Number    | Review rating                                  |
| createdAt  | Date      | Timestamp for when the review was created      |
| updatedAt  | Date      | Timestamp for when the review was last updated |

**Follower Model**

| Field Name  | Data Type | Description                                      |
| ----------- | --------- | ------------------------------------------------ |
| \_id        | ObjectId  | Unique identifier for the follower               |
| userId      | ObjectId  | Foreign key referencing the User model           |
| followingId | ObjectId  | Foreign key referencing the User model           |
| createdAt   | Date      | Timestamp for when the follower was created      |
| updatedAt   | Date      | Timestamp for when the follower was last updated |
