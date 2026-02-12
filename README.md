# Clarity 💰

Clarity is a modern, AI-powered financial management application designed to help users track expenses and income effortlessly. It provides a clean and intuitive interface for managing personal finances, with secure authentication, real-time transaction tracking, and intelligent expense categorization.

## 🚀 Tech Stack

### Frontend

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS 4
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Deployment**: Nginx (Docker)

### Backend

- **Framework**: Django REST Framework (DRF)
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Database**: PostgreSQL 15
- **WSGI Server**: Gunicorn
- **CORS**: django-cors-headers
- **Filtering**: django-filter

### Infrastructure

- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL 15 Alpine
- **Web Server**: Nginx
- **Environment Management**: python-dotenv

## ✨ Features

- 🔐 **Secure Authentication**: User registration and login using JWT tokens
- 📊 **Dashboard**: Real-time overview of total balance, income, and expenses
- 💸 **Transaction Management**: Add, view, and manage income/expense transactions
- 🏷️ **Smart Categorization**: Organize transactions by customizable categories
- 🤖 **AI-Powered Suggestions**: Intelligent expense categorization (optional)
- 📱 **Responsive Design**: Beautiful UI built with TailwindCSS for all devices
- 🐳 **Docker Ready**: Fully containerized for easy deployment
- 🔄 **Real-time Updates**: Instant balance and transaction updates

## 🛠️ Setup Instructions

### Option 1: Docker Setup (Recommended)

The easiest way to run Clarity is using Docker Compose, which sets up the entire stack (PostgreSQL, Django backend, React frontend) with a single command.

#### Prerequisites

- Docker
- Docker Compose

#### Steps

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd Clarity
   ```

2. **Configure environment variables (optional):**

   Edit `docker-compose.yml` to customize:
   - Database credentials
   - Django secret key
   - CORS allowed origins

3. **Build and run the containers:**

   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - Frontend: `http://localhost`
   - Backend API: `http://localhost/api/`

5. **Create a superuser (optional):**

   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

6. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Option 2: Local Development Setup

#### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL (or use SQLite for development)

#### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**

   Create a `.env` file in the `backend` directory:

   ```env
   DEBUG=1
   SECRET_KEY=your-secret-key-here
   DATABASE=postgres
   DB_ENGINE=django.db.backends.postgresql
   DB_NAME=clarity_db
   DB_USER=postgres
   DB_PASSWORD=password
   DB_HOST=localhost
   DB_PORT=5432
   CORS_ALLOWED_ORIGINS=http://localhost:5173
   ```

5. **Run database migrations:**

   ```bash
   python manage.py migrate
   ```

6. **Create a superuser:**

   ```bash
   python manage.py createsuperuser
   ```

7. **Start the development server:**
   ```bash
   python manage.py runserver
   ```
   The backend will run at `http://127.0.0.1:8000/`

#### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure API endpoint (if needed):**

   Update the API base URL in `src/api/api.ts` if your backend runs on a different port.

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173/`

## 📡 API Documentation

An API collection is available for testing. Import `backend/clarity_api_collection.json` into Postman or Insomnia to explore all available endpoints.

### Key Endpoints

#### Authentication

- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login and obtain JWT tokens
- `POST /api/auth/token/refresh/` - Refresh access token

#### Transactions

- `GET /api/transactions/` - List all user transactions
- `POST /api/transactions/` - Create a new transaction
- `GET /api/transactions/{id}/` - Retrieve a specific transaction
- `PUT /api/transactions/{id}/` - Update a transaction
- `DELETE /api/transactions/{id}/` - Delete a transaction

#### Categories

- `GET /api/categories/` - List all categories
- `POST /api/categories/` - Create a new category

#### Dashboard

- `GET /api/dashboard/summary/` - Get financial summary (balance, income, expenses)

## 🗂️ Project Structure

```
Clarity/
├── backend/                 # Django backend
│   ├── core/               # Project settings
│   ├── transactions/       # Transaction app
│   ├── users/              # User authentication app
│   ├── Dockerfile          # Backend Docker configuration
│   ├── entrypoint.sh       # Docker entrypoint script
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── api/           # API client configuration
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main app component
│   ├── nginx/             # Nginx configuration
│   ├── Dockerfile         # Frontend Docker configuration
│   └── package.json       # Node dependencies
├── docker-compose.yml     # Docker Compose configuration
└── README.md             # This file
```

## 🚢 Deployment

### Using Docker Compose (Production)

1. **Update environment variables** in `docker-compose.yml`:
   - Set `DEBUG=0`
   - Use a strong `SECRET_KEY`
   - Update database credentials
   - Configure `CORS_ALLOWED_ORIGINS` with your domain

2. **Build and deploy:**

   ```bash
   docker-compose up -d --build
   ```

3. **Collect static files:**

   ```bash
   docker-compose exec backend python manage.py collectstatic --noinput
   ```

4. **Run migrations:**
   ```bash
   docker-compose exec backend python manage.py migrate
   ```

### Environment Variables

| Variable               | Description          | Default            |
| ---------------------- | -------------------- | ------------------ |
| `DEBUG`                | Django debug mode    | `0`                |
| `SECRET_KEY`           | Django secret key    | `changeme_in_prod` |
| `DATABASE`             | Database type        | `postgres`         |
| `DB_NAME`              | Database name        | `clarity_db`       |
| `DB_USER`              | Database user        | `postgres`         |
| `DB_PASSWORD`          | Database password    | `password`         |
| `DB_HOST`              | Database host        | `db`               |
| `DB_PORT`              | Database port        | `5432`             |
| `CORS_ALLOWED_ORIGINS` | Allowed CORS origins | `http://localhost` |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Django REST Framework and React
- Styled with TailwindCSS
- Containerized with Docker
