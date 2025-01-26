# API Documentation

## Overview
The API is built using **Node.js with Express.js** and follows RESTful principles. It provides endpoints for authentication, appointments, providers, payments, and AI integration. All responses are in JSON format.

---

## Base URL
`https://api.healthcarescheduler.com/v1`

---

## Authentication
All endpoints (except `/auth/register` and `/auth/login`) require a valid JWT token in the `Authorization` header.

### 1. Register a New User
- **Endpoint**: `POST /auth/register`
- **Purpose**: Register a new patient or provider.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "role": "patient", // or "provider"
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "+1234567890"
  }
  
  {
  "id": "user-uuid",
  "email": "user@example.com",
  "role": "patient",
  "created_at": "2023-10-01T12:00:00Z"
}

