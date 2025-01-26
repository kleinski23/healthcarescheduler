# Database Schema Documentation

## Overview
The database schema is designed to support the core functionalities of the Healthcare Appointment Scheduling App. It includes tables for users, appointments, providers, notifications, and more. The schema is built using **PostgreSQL** and hosted on **Supabase**.

---

## Tables

### 1. `users`
- **Purpose**: Store patient and provider information.
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for the user.
  - `email` (String, Unique): User's email address.
  - `password_hash` (String): Hashed password for authentication.
  - `role` (String): User role (`patient`, `provider`, `admin`).
  - `first_name` (String): User's first name.
  - `last_name` (String): User's last name.
  - `phone_number` (String): User's phone number.
  - `created_at` (Timestamp): Timestamp when the user was created.
  - `updated_at` (Timestamp): Timestamp when the user was last updated.

### 2. `providers`
- **Purpose**: Store additional information about healthcare providers.
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for the provider.
  - `user_id` (UUID, Foreign Key): References `users.id`.
  - `specialty` (String): Provider's medical specialty.
  - `location` (String): Provider's practice location.
  - `availability` (JSON): Provider's availability schedule (e.g., `{ "Monday": ["09:00", "17:00"], ... }`).
  - `created_at` (Timestamp): Timestamp when the provider was created.
  - `updated_at` (Timestamp): Timestamp when the provider was last updated.

### 3. `appointments`
- **Purpose**: Store appointment details.
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for the appointment.
  - `patient_id` (UUID, Foreign Key): References `users.id` (patient).
  - `provider_id` (UUID, Foreign Key): References `providers.id`.
  - `date` (Date): Appointment date.
  - `time` (Time): Appointment time.
  - `status` (String): Appointment status (`scheduled`, `completed`, `canceled`).
  - `notes` (Text): Additional notes for the appointment.
  - `created_at` (Timestamp): Timestamp when the appointment was created.
  - `updated_at` (Timestamp): Timestamp when the appointment was last updated.

### 4. `notifications`
- **Purpose**: Store notifications for users.
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for the notification.
  - `user_id` (UUID, Foreign Key): References `users.id`.
  - `type` (String): Notification type (`email`, `sms`, `in-app`).
  - `content` (Text): Notification content.
  - `status` (String): Notification status (`sent`, `pending`, `failed`).
  - `created_at` (Timestamp): Timestamp when the notification was created.
  - `updated_at` (Timestamp): Timestamp when the notification was last updated.

### 5. `payments`
- **Purpose**: Store payment details for appointments.
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for the payment.
  - `appointment_id` (UUID, Foreign Key): References `appointments.id`.
  - `amount` (Decimal): Payment amount.
  - `status` (String): Payment status (`pending`, `completed`, `refunded`).
  - `payment_method` (String): Payment method (`stripe`, `paypal`).
  - `transaction_id` (String): Transaction ID from the payment gateway.
  - `created_at` (Timestamp): Timestamp when the payment was created.
  - `updated_at` (Timestamp): Timestamp when the payment was last updated.

### 6. `reviews`
- **Purpose**: Store patient reviews and ratings for providers.
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for the review.
  - `patient_id` (UUID, Foreign Key): References `users.id` (patient).
  - `provider_id` (UUID, Foreign Key): References `providers.id`.
  - `rating` (Integer): Rating (1-5).
  - `comment` (Text): Review comment.
  - `created_at` (Timestamp): Timestamp when the review was created.
  - `updated_at` (Timestamp): Timestamp when the review was last updated.

---

## Relationships
- **One-to-Many**:
  - A `user` (patient) can have many `appointments`.
  - A `provider` can have many `appointments`.
  - A `user` can have many `notifications`.
  - A `user` (patient) can have many `reviews`.
  - A `provider` can have many `reviews`.
  - An `appointment` can have one `payment`.

- **Many-to-One**:
  - An `appointment` belongs to one `user` (patient) and one `provider`.
  - A `notification` belongs to one `user`.
  - A `payment` belongs to one `appointment`.
  - A `review` belongs to one `user` (patient) and one `provider`.

---

## Indexing
- **Indexes**:
  - `users.email`: For fast lookup during login.
  - `appointments.patient_id`: For fetching a patient's appointments.
  - `appointments.provider_id`: For fetching a provider's appointments.
  - `notifications.user_id`: For fetching a user's notifications.
  - `payments.appointment_id`: For fetching payment details for an appointment.
  - `reviews.provider_id`: For fetching reviews for a provider.

---

## Example Queries
### 1. Fetch all appointments for a patient:
```sql
SELECT * FROM appointments WHERE patient_id = 'patient-uuid';