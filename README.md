# AR

AR is a modern e-commerce frontend and backend application for fashion and lifestyle products. It includes product listing, filtering, product details, cart management, checkout, login/register flows, and admin functionality for adding products.

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB with Mongoose
- Authentication: JWT + Cookies
- Payment: Razorpay
- File upload: Multer

## Project Structure

- backend/ - Express API, MongoDB models, middleware, routes
- frontend/ - React app and UI components

## Features

- User registration and login
- Product listing with search and filters
- Product detail page with similar items
- Add to cart and cart quantity management
- Empty cart handling and checkout summary
- Razorpay payment integration
- Product upload for admin users
- Responsive layout for desktop and mobile

## Prerequisites

- Node.js v18+
- npm
- MongoDB Atlas or local MongoDB instance

## Setup

1. Clone the repository
2. Install backend dependencies
3. Install frontend dependencies
4. Create environment files based on the example files
5. Start the backend and frontend servers

## Environment Variables

### Backend

Create a `.env` file inside the `backend` folder:

```env
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
PORT=3000
CLIENT_URL=http://localhost:5173
```

You can copy from `backend/.env.example`.

### Frontend

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:3000
RAZOREPAY_KEY=rzp_test_your_key_here
```

You can copy from `frontend/.env.example`.

## Run Locally

### Backend

```bash
cd backend
npm install
npm start
```

The backend runs on:

- http://localhost:3000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

- http://localhost:5173

## Production Build

```bash
cd frontend
npm run build
```

## Notes

- Do not push real `.env` files to GitHub.
- The repo includes `.gitignore` entries to ignore environment files.
- The Razorpay key should be kept in the frontend `.env` file and not committed to source control.

## GitHub Ready

This project is prepared for pushing to GitHub with secrets stored in local environment files instead of hardcoded values in the source code.
