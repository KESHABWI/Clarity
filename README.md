# Clarity

Clarity is a modern financial management application designed to help users track expenses and income effortlessly. It provides a clean and intuitive interface for managing personal finances, with secure authentication and real-time transaction tracking.

## 🚀 Data Flow & Tech Stack

**Frontend**

- **Framework**: React (powered by Vite)
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **State/API**: Axios, React Hooks

**Backend**

- **Framework**: Django REST Framework (DRF)
- **Authentication**: JWT (SimpleJWT)
- **Database**: SQLite (Default) / PostgreSQL (Configurable)
- **API**: RESTful endpoints

## ✨ Features

- **Secure Authentication**: User registration and login using JWT.
- **Dashboard**: Real-time overview of total balance, income, and expenses.
- **Transaction Management**: Add and view income/expense transactions.
- **Smart Categorization**: Organize transactions by categories.
- **Responsive Design**: Built with TailwindCSS for mobile and desktop.

## 🛠️ Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Run database migrations:**

    ```bash
    python manage.py migrate
    ```

5.  **Start the development server:**
    ```bash
    python manage.py runserver
    ```
    The backend will run at `http://127.0.0.1:8000/`.

### Frontend Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend will run at `http://localhost:5173/`.

## 📡 API Documentation

An API collection is available for testing. Import `backend/clarity_api_collection.json` into Postman or Insomnia to explore the available endpoints.

### Key Endpoints

- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login and obtain JWT tokens
- `GET /api/transactions/` - List all transactions
- `POST /api/transactions/` - Create a new transaction
