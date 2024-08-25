This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run npm install

then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
# Todo List App


## Overview

This project is a Todo List application built with **Next.js** and **TypeScript**. It allows users to manage their tasks with features including creating, updating, and deleting todos, along with assigning priorities. Todos are organized and displayed by date, making it easy to view tasks for specific days. Users can sign up and log in using email/password authentication or Google authentication. The project uses **Firebase** for authentication and data storage, **React Hook Form** and **Zod** for form validation, and **React Toastify** for toast notifications.

## Features

- **Signup and Login**:
  - Sign up using email and password.
  - Login using email and password or Google authentication.
  - Redirects to the main app upon successful sign-in.

- **Todo Management**:
  - Create new todos with text and priority.
  - Update existing todos and their priorities.
  - Delete todos.
  - Todos are grouped and displayed by date, showing the date and time at the top for each day.

- **Form Validation**:
  - Utilizes **React Hook Form** for handling form inputs and submissions.
  - **Zod** is used for schema-based validation.

- **User Notifications**:
  - **React Toastify** is used for displaying toast notifications for various actions (e.g., success, error).

## Technologies Used

- **Next.js**: Framework for building server-side rendered React applications.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Firebase**: Provides authentication and database services.
- **React Hook Form**: Library for managing form state and validation.
- **Zod**: Type-safe schema validation library.
- **React Toastify**: Provides toast notifications.

