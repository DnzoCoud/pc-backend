# Backend Technical Challenge
## Prerequisites

Before starting the application, make sure you have installed:

* Docker
* Docker Compose
* Node.js (recommended version 22+)
* npm

## Environment Variables
You have already the `.env` file

### Example:

```ts
NODE_ENV=development 
PORT=3000 
DB_HOST=postgres 
DB_PORT=5432 
DB_NAME=interviewdb 
DB_USER=admin 
DB_PASSWORD=admin 
JWT_SECRET=your-secret-key 
JWT_EXPIRES=1h
```

## Running the application
Start all required services using Docker Compose

```bash
docker compose up -d
```

This command will start:
* PostgreSQL
* Nestjs API

## Running Database Migrations
Once the container are running, execute the migrations:

```bash
npm run migration:run
```

This will create all required database objects and initialize the application schema

## Accessing the API
After the migrations have completed successfully, the API will be available at:

```
http://localhost:3000
```
Swagger documentation:
```
http://localhost:3000/api/v1/docs
```

## Running Tests

Execute all unit tests:
```
npm run test
```
Generate test coverage:
```
npm run test:cov
```

## Tech Stack
* NestJS
* TypeScript
* PostgreSQL
* TypeORM
* JWT Authentication
* Docker
* Swagger
* Jest