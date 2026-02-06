
# React CRUD Users App

## Project Overview

This is a scalable, recruiter-friendly CRUD application for managing users, built with React, TypeScript, Material UI, and Vite. It demonstrates best practices in architecture, schema-driven forms, API service abstraction, and clean UI/UX patterns. The project is designed for easy extensibility and rapid prototyping.

## Tech Stack

- **React** (with hooks)
- **TypeScript**
- **Material UI** (MUI v5)
- **Vite** (fast build tool)
- **Axios** (API requests)
- **react-hook-form** + **Yup** (form management & validation)
- **json-server** (mock REST API)

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:5173` (default Vite port).

## Running the Mock API

1. **Start the mock API server**
   ```bash
   npm run mock-api
   ```
   This launches json-server at `http://localhost:3000` using `db.json`.

2. **API Endpoints**
   - `GET    /users`   — List users
   - `POST   /users`   — Create user
   - `PUT    /users/:id` — Update user
   - `DELETE /users/:id` — Delete user

> Edit `db.json` to change initial data.

## How to Add New Form Fields (Step-by-Step)

1. **Open the config file:**
   - Edit `src/forms/userSchema.ts`.

2. **Add a new field object to `userFormFields`:**
   ```ts
   {
     name: 'address',
     label: 'Address',
     type: 'text',
     required: false,
     validation: { min: 5, max: 100 },
   }
   ```

3. **(Optional) Update validation rules:**
   - Use Yup-compatible rules in the `validation` property.

4. **Save and restart the app:**
   - The new field will automatically appear in the user form.

## Design Decisions

- **Scalable Folder Structure:**
  - Separation of concerns: `api/`, `components/`, `features/`, `forms/`, `types/`, `utils/`, `theme/`.
  - Feature-based organization for maintainability.

- **Schema-Driven Forms:**
  - Form fields and validation are defined in config (`userSchema.ts`), enabling rapid field addition and consistent validation.

- **API Service Layer:**
  - All API logic is abstracted in `src/api/userApi.ts` using Axios, with error handling and a configurable base URL.

- **Reusable Components:**
  - Common UI elements (FormField, Loader, etc.) and user-specific components are modular and reusable.

- **Material UI:**
  - Consistent, modern UI with theming and accessibility.

- **Mock API:**
  - Uses json-server for fast prototyping and testing without a backend.

- **Clean UX:**
  - Loading indicators, error/success feedback, and confirmation dialogs for robust user experience.

---

For questions or improvements, feel free to fork or contact the author. This project is ideal for demonstrating modern React architecture and rapid CRUD prototyping.
