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


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
