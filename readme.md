# Task Management API

> Backend API for a Task Management application built with **Express** and **TypeScript** using **MongoDB** and **Mongoose**.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Validation](#validation)
- [Logging](#logging)
- [Testing](#testing)
- [Contributing](#contributing)

---

## Overview

This is the backend service for a Task Management app where users can be created, authenticated, and managed. The API handles user registration with validation, secure password hashing, and supports user retrieval.

---

## Features

- User creation with validation and password hashing
- Retrieve all users (without passwords)
- MongoDB integration with Mongoose for data modeling
- Environment variable management using dotenv
- Request validation using express-validator
- Logging requests with winston
- Centralized error handling
- Built with TypeScript for type safety and scalability

---

## Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** (via Mongoose)
- **bcrypt** for password hashing
- **express-validator** for input validation
- **winston** and **winston-daily-rotate-file** for logging

---

## Getting Started

### Prerequisites

- Node.js (v16 or newer recommended)
- MongoDB instance (local or cloud like MongoDB Atlas)

## Validation

- Validation is handled via express-validator using schemas defined per route.

## Logging

- Request logs and errors are recorded using winston and winston-daily-rotate-file.

- Logs are rotated daily to manage file sizes.

## Testing

- The server exports the Express app instance for easy testing with tools like Jest or Supertest.

- Testing setup is planned for future development.

## Contributing

- Contributions are welcome! Feel free to submit issues or pull requests.

## hosted on 

- https://timenest-backend-qwna.onrender.com