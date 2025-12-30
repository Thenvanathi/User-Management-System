## Project Overview

This frontend application provides the user interface for a User Management System with authentication and role-based access control.

- It allows users to:
  Sign up and log in securely
  View and update their profile
  Change their password

- Admins can:
  View all registered users
  Activate or deactivate user accounts
  Access admin-only dashboards

The application communicates with a backend API using HTTP-only cookies for secure JWT authentication.

## Tech Stack

- React.js(Vite), React Router DOM, Axios, Tailwind CSS, React Hot Toast

## Setup Instructions(Local)

1. git clone <frontend-repo-url>
2. cd frontend
3. npm install
4. npm run dev

## Environment Variables

VITE_API_BASE_URL

## Deployment Instructions

The frontend application was deployed using vercel.

1. Push frontend code to GitHub, Create a New project on vercel, set Environment variable, deploy
