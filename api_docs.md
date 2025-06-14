NOTE :- AI GENERATED JUST FOR REFERENCE 

# API Documentation
======================

## Base URL
------------

* `http://localhost:3000`

## User Endpoints
-----------------

### Get All Users

* **GET** `{{baseUrl}}/api/users/all`
* Response: Array of user objects

### Get Single User

* **GET** `{{baseUrl}}/api/users`
* Response: Single user object

### Add a New User

* **POST** `{{baseUrl}}/api/users`
* Request Body:
	+ `name`: string
	+ `email`: string
	+ `password`: string
	+ `designation`: string
	+ `task`: number
	+ `ratings`: number
* Response: Newly created user object

### Update a User

* **PATCH** `{{baseUrl}}/api/users`
* Request Body:
	+ `name`: string (optional)
	+ `email`: string (optional)
	+ `password`: string (optional)
	+ `designation`: string (optional)
	+ `task`: number (optional)
	+ `ratings`: number (optional)
* Response: Updated user object

## Auth Endpoints
-----------------

### Authenticate User (Login)

* **POST** `{{baseUrl}}/api/auth`
* Request Body:
	+ `email`: string
	+ `password`: string
* Response: Authentication token

### Get a New JWT Token using Refresh Token

* **POST** `{{baseUrl}}/api/auth/refresh-token`
* Response: New JWT token

### Logout User

* **POST** `{{baseUrl}}/api/auth/logout`
* Response: Success message

## Message Endpoints
-------------------

### Send Message

* **POST** `{{baseUrl}}/api/messages`
* Request Body:
	+ `receiver`: string (user ID)
	+ `content`: string
* Response: Newly created message object

### Get All Messages by User

* **GET** `{{baseUrl}}/api/messages`
* Response: Array of message objects

### Get All Messages by User and Single Receiver

* **GET** `{{baseUrl}}/api/messages/:receiverId`
* Response: Array of message objects

### Get Messages with Limits

* **GET** `{{baseUrl}}/api/messages/<receiverId>?limit=2&start=0`
* Response: Array of message objects

## Follower Endpoints
---------------------

### Get All Users that a User is Following

* **GET** `{{baseUrl}}/api/followers`
* Response: Array of user objects

### Get All Users with Full Details

* **GET** `{{baseUrl}}/api/followers?full_details=false`
* Response: Array of user objects with full details

### Get Details of User You are Following by Follower ID

* **GET** `{{baseUrl}}/api/followers/details/6845924daee2a515b38a3b91`
* Response: User object

### Get Count of Followers and Following for a User

* **GET** `{{baseUrl}}/api/followers/count`
* Response: Object with follower and following counts

### Add a New Follower

* **POST** `{{baseUrl}}/api/followers`
* Request Body:
	+ `following`: string (user ID)
* Response: Newly created follower object

### Delete a Follower (UnFollow)

* **DELETE** `{{baseUrl}}/api/followers`
* Request Body:
	+ `following`: string (user ID)
* Response: Success message