# Laravel Blog API

A RESTful backend for a blog platform built with Laravel.

---

## Features

-   User registration and login (JWT authentication via HTTP-only cookies)
-   CRUD operations for blog posts
-   Comments and likes on posts
-   Secure API endpoints

---

## Requirements

-   PHP >= 8.1
-   Composer
-   Node.js & npm
-   MySQL or SQLite
-   Git (optional)

---

## Installation

1. **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd blog-api
    ```

2. **Install PHP dependencies:**

    ```bash
    composer install
    ```

3. **Install JavaScript dependencies:**

    ```bash
    npm install
    ```

---

## Database Setup

### MySQL

1. **Create a database:**

    ```bash
    mysql -u root -p
    CREATE DATABASE blog_api;
    ```

2. **Configure `.env`:**

    ```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=blog_api
    DB_USERNAME=your_mysql_user
    DB_PASSWORD=your_mysql_password
    ```

### SQLite

1. **Create SQLite file:**

    ```bash
    touch database/database.sqlite
    ```

2. **Configure `.env`:**

    ```
    DB_CONNECTION=sqlite
    DB_DATABASE=/absolute/path/to/your/project/database/database.sqlite
    ```

    > Replace `/absolute/path/to/your/project/` with your actual project path.

---

## Environment Configuration

1. **Copy `.env.example` to `.env`:**

    ```bash
    cp .env.example .env
    ```

2. **Generate application key:**

    ```bash
    php artisan key:generate
    ```

---

## Running Migrations

**Migrations** create the necessary tables in your database.

1. **Make sure your `.env` database settings are correct.**
2. **Run the migration command:**

    ```bash
    php artisan migrate
    ```

    - This will create all tables needed for users, posts, comments, likes, etc.
    - If you see errors, check your database credentials and connection in `.env`.

3. **(Optional) Seed the database with test data:**

    ```bash
    php artisan db:seed
    ```

---

## Running the Application

1. **Build frontend assets:**

    ```bash
    npm run dev
    ```

2. **Start the Laravel server:**

    ```bash
    php artisan serve
    ```

    The API will be available at `http://localhost:8000`.

---

## API Usage

-   **Register:** `POST /api/register`
-   **Login:** `POST /api/login`
-   **Get Posts:** `GET /api/posts`
-   **Create Post:** `POST /api/posts` (authenticated)
-   **Like/Comment:** (authenticated)

> **Authentication:**  
> JWT tokens are stored in HTTP-only cookies.  
> Frontend requests must use `withCredentials: true` (Axios) or `credentials: 'include'` (fetch).

---

## JWT Security & Authentication

This project uses **JWT (JSON Web Tokens)** for user authentication.  
For improved security, JWT tokens are stored in **HTTP-only cookies**.

### How JWT Authentication Works

1. **Login/Register:**

    - When a user logs in or registers, the backend generates a JWT token.
    - The token is sent to the browser in an HTTP-only cookie (not accessible by JavaScript).

2. **Authenticated Requests:**

    - On every API request, the browser automatically sends the JWT cookie.
    - The backend reads the token from the cookie and authenticates the user.

3. **Logout:**
    - Logging out removes the JWT cookie, ending the session.

### Security Best Practices

-   **HTTP-only cookies:**  
    Tokens are stored in cookies with the `HttpOnly` flag, protecting them from XSS attacks.
-   **Secure flag:**  
    In production, cookies should also use the `Secure` flag (only sent over HTTPS).
-   **SameSite flag:**  
    Cookies use `SameSite=Strict` or `Lax` to help prevent CSRF attacks.
-   **Never store JWT in localStorage or sessionStorage.**

### Frontend Instructions

-   Always send requests with credentials:
    -   **Axios:**
        ```js
        axios.get("http://localhost:8000/api/posts", { withCredentials: true });
        ```
    -   **fetch:**
        ```js
        fetch("http://localhost:8000/api/posts", { credentials: "include" });
        ```

### Backend Instructions

-   Ensure your login and register endpoints set the JWT token in an HTTP-only cookie.
-   Make sure your CORS config allows credentials (`supports_credentials: true`).

---

## Testing

Run all tests:

```bash
php artisan test
```

---

## Troubleshooting

-   **Database errors:**

    -   Check your `.env` settings.
    -   Make sure the database exists and credentials are correct.
    -   For SQLite, ensure the file exists and the path is correct.

-   **CORS/auth issues:**

    -   See `config/cors.php` and ensure `supports_credentials` is `true`.
    -   Make sure your frontend origin matches `allowed_origins`.

-   **JWT cookie not set:**
    -   Ensure your login endpoint sets the token in an HTTP-only cookie.

---

## Project Structure

-   `app/Http/Controllers` — API logic
-   `app/Models` — Data models
-   `routes/api.php` — API routes
-   `database/migrations` — Database structure
-   `resources/` — Frontend assets (CSS/JS)
-   `tests/` — Automated tests

---

## License

MIT
