# Card Collect API

## Description

This is a project that provides a RESTful API for managing a collection of cards, decks, sets, series, and users. It uses Prisma as the ORM and Express as the web framework.

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

Create a .env file in the root directory and add the following environment variables:

PORT=<your-port-number>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=<your-jwt-expiration-time>

Run the application:
`npm start`

## Usage

**The API has the following endpoints:**

GET /users: Get all users.

GET /users/:id: Get a user by ID.

POST /users: Create a new user.

PUT /users/:id: Update a user by ID.

DELETE /users/:id: Delete a user by ID.

GET /decks: Get all decks.

GET /decks/:id: Get a deck by ID.

POST /users/me/decks: Create a new deck for the authenticated user.

PUT /decks/:id: Update a deck by ID.

DELETE /decks/:id: Delete a deck by ID.

GET /sets: Get all sets.

GET /sets/:id: Get a set by ID.

POST /sets: Create a new set.

PUT /sets/:id: Update a set by ID.

DELETE /sets/:id: Delete a set by ID.

GET /series: Get all series.

GET /series/:id: Get a series by ID.

POST /series: Create a new series.

PUT /series/:id: Update a series by ID.

DELETE /series/:id: Delete a series by ID.
