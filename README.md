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

---

## Database Setup
<!-- XAMPP installation instructions for MySQL database -->

### Installing MySQL with XAMPP

If you do not have MySQL installed, you can use XAMPP to set up MySQL easily:

1. Download XAMPP from [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html)
2. Install XAMPP and launch the XAMPP Control Panel.
3. Start the **MySQL** service from the Control Panel.
4. Access phpMyAdmin at [http://localhost/phpmyadmin](http://localhost/phpmyadmin) to manage your databases.
5. Create a new database (e.g., `blog_api`) for your Laravel project.(or you can use **php artisan migrate** )

After setting up MySQL with XAMPP, continue with the steps below to configure your `.env` file and run migrations.

---

### MySQL

1. **Create a database:**

    ```bash
    php artisan migrate 
        there will prompt asking you the The database 'blog_api' does not exist on my sql conncetion 
        would you like to create it ?
        just enter yes and it will generate the databse in the mysql
    ```

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

3. **Generate JWT Security Key**

    ```bash
    php artisan jwt:secret
    ```

---

## Running Migrations

**Migrations** create the necessary tables in your database.

1. **Make sure your `.env` database settings are correct.**
2. **Run the migration command:**

    ```bash
    php artisan migrate
    or to reset and start again 
    php artisan migrate:reset 
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

1. **Start the Laravel server:**

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

---

## License

MIT
