# QnA Forum API

Backend API untuk aplikasi forum tanya jawab sederhana. Project ini dibuat menggunakan NestJS, PostgreSQL, Prisma ORM, JWT Authentication, dan bcrypt untuk password hashing.

## Tech Stack

- NestJS
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Passport JWT
- bcrypt
- class-validator
- class-transformer

## Features

- Register user
- Login user
- JWT authentication
- Protected profile endpoint
- Create question
- Get all questions
- Get question detail
- Update own question
- Delete own question
- Create answer for a question
- Get answers by question
- Update own answer
- Delete own answer
- Request body validation

## Project Structure

```txt
src/
  auth/
    dto/
    guards/
    strategies/
    auth.controller.ts
    auth.module.ts
    auth.service.ts

  prisma/
    prisma.module.ts
    prisma.service.ts

  questions/
    dto/
    questions.controller.ts
    questions.module.ts
    questions.service.ts

  answers/
    dto/
    answers.controller.ts
    answers.module.ts
    answers.service.ts

  app.module.ts
  main.ts

prisma/
  migrations/
  schema.prisma

prisma.config.ts
```

## Prerequisites

Pastikan sudah install:

- Node.js
- npm
- PostgreSQL
- pgAdmin atau database client lain

## Installation

Clone repository:

```bash
git clone https://github.com/USERNAME/NAMA_REPO.git
cd NAMA_REPO
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Buat file `.env` di root project.

Contoh:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
JWT_SECRET="your_jwt_secret"
PORT=3000
```

Catatan: jangan upload file `.env` ke GitHub.

## Database Setup

Pastikan database PostgreSQL sudah dibuat.

Contoh nama database:

```txt
revou_code_challenge
```

Jalankan migration:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

## Running the App

Development mode:

```bash
npm run start:dev
```

Aplikasi akan berjalan di:

```txt
http://localhost:3000
```

## API Documentation

### Auth

#### Register

```http
POST /auth/register
```

Request body:

```json
{
  "name": "Test User",
  "email": "test@mail.com",
  "password": "password123"
}
```

Success response:

```json
{
  "message": "Register success",
  "data": {
    "id": "user-id",
    "name": "Test User",
    "email": "test@mail.com",
    "createdAt": "2026-04-28T00:00:00.000Z",
    "updatedAt": "2026-04-28T00:00:00.000Z"
  }
}
```

#### Login

```http
POST /auth/login
```

Request body:

```json
{
  "email": "test@mail.com",
  "password": "password123"
}
```

Success response:

```json
{
  "message": "Login success",
  "accessToken": "jwt-token"
}
```

#### Get Profile

```http
GET /auth/profile
```

Authorization:

```txt
Bearer Token
```

Success response:

```json
{
  "message": "Profile fetched successfully",
  "data": {
    "id": "user-id",
    "email": "test@mail.com"
  }
}
```

---

### Questions

#### Create Question

```http
POST /questions
```

Authorization:

```txt
Bearer Token
```

Request body:

```json
{
  "title": "Apa itu NestJS?",
  "content": "Saya ingin memahami kenapa NestJS sering dipakai untuk backend."
}
```

Success response:

```json
{
  "message": "Question created successfully",
  "data": {
    "id": "question-id",
    "title": "Apa itu NestJS?",
    "content": "Saya ingin memahami kenapa NestJS sering dipakai untuk backend.",
    "authorId": "user-id",
    "createdAt": "2026-04-28T00:00:00.000Z",
    "updatedAt": "2026-04-28T00:00:00.000Z",
    "author": {
      "id": "user-id",
      "name": "Test User",
      "email": "test@mail.com"
    }
  }
}
```

#### Get All Questions

```http
GET /questions
```

Success response:

```json
{
  "message": "Questions fetched successfully",
  "data": [
    {
      "id": "question-id",
      "title": "Apa itu NestJS?",
      "content": "Saya ingin memahami kenapa NestJS sering dipakai untuk backend.",
      "authorId": "user-id",
      "createdAt": "2026-04-28T00:00:00.000Z",
      "updatedAt": "2026-04-28T00:00:00.000Z",
      "author": {
        "id": "user-id",
        "name": "Test User",
        "email": "test@mail.com"
      }
    }
  ]
}
```

#### Get Question Detail

```http
GET /questions/:id
```

Example:

```http
GET /questions/question-id
```

Success response:

```json
{
  "message": "Question fetched successfully",
  "data": {
    "id": "question-id",
    "title": "Apa itu NestJS?",
    "content": "Saya ingin memahami kenapa NestJS sering dipakai untuk backend.",
    "authorId": "user-id",
    "createdAt": "2026-04-28T00:00:00.000Z",
    "updatedAt": "2026-04-28T00:00:00.000Z",
    "author": {
      "id": "user-id",
      "name": "Test User",
      "email": "test@mail.com"
    }
  }
}
```

#### Update Question

```http
PATCH /questions/:id
```

Authorization:

```txt
Bearer Token
```

Request body:

```json
{
  "title": "Apa itu NestJS dan Prisma?",
  "content": "Saya ingin memahami hubungan NestJS, Prisma, dan PostgreSQL."
}
```

Success response:

```json
{
  "message": "Question updated successfully",
  "data": {
    "id": "question-id",
    "title": "Apa itu NestJS dan Prisma?",
    "content": "Saya ingin memahami hubungan NestJS, Prisma, dan PostgreSQL.",
    "authorId": "user-id",
    "createdAt": "2026-04-28T00:00:00.000Z",
    "updatedAt": "2026-04-28T00:00:00.000Z"
  }
}
```

#### Delete Question

```http
DELETE /questions/:id
```

Authorization:

```txt
Bearer Token
```

Success response:

```json
{
  "message": "Question deleted successfully"
}
```

---

### Answers

#### Create Answer

```http
POST /questions/:questionId/answers
```

Authorization:

```txt
Bearer Token
```

Request body:

```json
{
  "content": "NestJS sering dipakai karena struktur project-nya rapi dan cocok untuk backend skala besar."
}
```

Success response:

```json
{
  "message": "Answer created successfully",
  "data": {
    "id": "answer-id",
    "content": "NestJS sering dipakai karena struktur project-nya rapi dan cocok untuk backend skala besar.",
    "questionId": "question-id",
    "authorId": "user-id",
    "createdAt": "2026-04-28T00:00:00.000Z",
    "updatedAt": "2026-04-28T00:00:00.000Z",
    "author": {
      "id": "user-id",
      "name": "Test User",
      "email": "test@mail.com"
    },
    "question": {
      "id": "question-id",
      "title": "Apa itu NestJS?",
      "content": "Saya ingin memahami kenapa NestJS sering dipakai untuk backend."
    }
  }
}
```

#### Get Answers by Question

```http
GET /questions/:questionId/answers
```

Success response:

```json
{
  "message": "Answers fetched successfully",
  "data": [
    {
      "id": "answer-id",
      "content": "NestJS sering dipakai karena struktur project-nya rapi dan cocok untuk backend skala besar.",
      "questionId": "question-id",
      "authorId": "user-id",
      "createdAt": "2026-04-28T00:00:00.000Z",
      "updatedAt": "2026-04-28T00:00:00.000Z",
      "author": {
        "id": "user-id",
        "name": "Test User",
        "email": "test@mail.com"
      }
    }
  ]
}
```

#### Update Answer

```http
PATCH /answers/:id
```

Authorization:

```txt
Bearer Token
```

Request body:

```json
{
  "content": "NestJS cocok untuk backend karena modular, scalable, dan mudah digabungkan dengan Prisma."
}
```

Success response:

```json
{
  "message": "Answer updated successfully",
  "data": {
    "id": "answer-id",
    "content": "NestJS cocok untuk backend karena modular, scalable, dan mudah digabungkan dengan Prisma.",
    "questionId": "question-id",
    "authorId": "user-id",
    "createdAt": "2026-04-28T00:00:00.000Z",
    "updatedAt": "2026-04-28T00:00:00.000Z"
  }
}
```

#### Delete Answer

```http
DELETE /answers/:id
```

Authorization:

```txt
Bearer Token
```

Success response:

```json
{
  "message": "Answer deleted successfully"
}
```

## Validation Rules

### Register

| Field | Rule |
|---|---|
| name | required, string |
| email | required, valid email |
| password | required, string, minimum 6 characters |

### Login

| Field | Rule |
|---|---|
| email | required, valid email |
| password | required, string |

### Question

| Field | Rule |
|---|---|
| title | required, string |
| content | required, string |

### Answer

| Field | Rule |
|---|---|
| content | required, string |

## Error Responses

### Unauthorized

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

### Forbidden

```json
{
  "message": "You are not allowed to update this question",
  "error": "Forbidden",
  "statusCode": 403
}
```

### Not Found

```json
{
  "message": "Question not found",
  "error": "Not Found",
  "statusCode": 404
}
```

### Validation Error

```json
{
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

## Commit Convention

Project ini menggunakan format commit:

```txt
type(scope): description
```

Contoh:

```txt
chore: initialize project configuration
feat(database): setup Prisma with PostgreSQL schema
feat(auth): add register and login endpoints
feat(auth): add JWT authentication guard
feat(questions): add question CRUD endpoints
feat(answers): add answer endpoints
feat(validation): add request body validation
docs: add API documentation
```

## Author

Created for RevoU Backend Code Challenge.
