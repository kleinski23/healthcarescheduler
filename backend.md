# Backend Documentation

## Backend Framework
- **Node.js with Express.js**: A lightweight and flexible framework for building RESTful APIs.

## Database
- **PostgreSQL**: A robust relational database for structured data.
- **Hosting**: Supabase (provides PostgreSQL with built-in features like authentication and real-time subscriptions).

## Authentication
- **Email/Password**: Traditional login with secure password hashing (using bcrypt).
- **Social Login**: Integration with Google, Facebook, etc. (using OAuth 2.0).
- **JWT (JSON Web Tokens)**: For secure session management and authorization.

## API Design
- **RESTful APIs**: Simple and widely used for communication between frontend and backend.
- **Endpoints**:
  - **Auth**:
    - `POST /api/auth/register`: Register a new user.
    - `POST /api/auth/login`: Log in a user.
    - `POST /api/auth/social-login`: Log in with social accounts.
  - **Appointments**:
    - `GET /api/appointments`: Fetch all appointments for a user.
    - `POST /api/appointments`: Book a new appointment.
    - `PUT /api/appointments/:id`: Reschedule an appointment.
    - `DELETE /api/appointments/:id`: Cancel an appointment.
  - **Providers**:
    - `GET /api/providers`: Fetch all providers.
    - `GET /api/providers/:id`: Fetch details of a specific provider.
    - `PUT /api/providers/:id`: Update provider availability.
  - **AI Integration**:
    - `POST /api/chatbot`: Interact with the AI-powered chatbot.
    - `GET /api/analytics`: Fetch AI-driven insights for providers.

## Third-Party Integrations
- **Payment Gateways**: Stripe, PayPal.
- **Email/SMS Services**: Twilio, SendGrid.
- **Calendar Services**: Google Calendar, Outlook Calendar.
- **Deepseek API**: For AI-powered features.

## AI Integration (Backend)
- **Endpoints**:
  - `/api/chatbot`: Handles chatbot interactions.
  - `/api/analytics`: Provides AI-driven insights for providers.
- **Data Flow**:
  - Frontend sends requests to the backend.
  - Backend communicates with the Deepseek API.
  - Deepseek API processes the request and returns the response.
- **Error Handling**:
  - Retry failed API requests.
  - Log errors for debugging.
  - Return user-friendly error messages.

## Security
- **Input Validation**: Sanitize user inputs to prevent SQL injection and XSS attacks.
- **Rate Limiting**: Limit API requests to prevent abuse.
- **Data Encryption**: Encrypt sensitive data (e.g., passwords, payment info).

## DevOps
- **Hosting**: Supabase (for database and backend services).
- **CI/CD Pipelines**: Not required.