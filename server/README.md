# School Attendance System API

A production-ready REST API for managing school attendance built with Laravel 11 and Laravel Sanctum.

## Features

-   **Authentication**: Token-based authentication using Laravel Sanctum
-   **Role-based Access Control**: Admin and Teacher roles with different permissions
-   **Attendance Management**: Mark attendance for students with duplicate prevention
-   **Reporting**: Student attendance history and class monthly reports
-   **CORS Support**: Configured for frontend integration
-   **Data Validation**: Comprehensive input validation and error handling

## Requirements

-   PHP 8.1+
-   Composer
-   SQLite (default) or MySQL
-   Laravel 11

## Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd school-attendance-api
    ```

2. **Install dependencies**

    ```bash
    composer install
    ```

3. **Environment setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. **Database setup**

    ```bash
    php artisan migrate
    php artisan db:seed
    ```

5. **Start the development server**
    ```bash
    php artisan serve
    ```

The API will be available at `http://localhost:8000`

## Database Schema

### Users Table

-   `id`: Primary key
-   `name`: User's full name
-   `email`: Unique email address
-   `password`: Hashed password
-   `role`: Enum ('admin', 'teacher')
-   `timestamps`: Created/updated timestamps

### Classes Table

-   `id`: Primary key
-   `name`: Unique class name
-   `timestamps`: Created/updated timestamps

### Students Table

-   `id`: Primary key
-   `name`: Student's full name
-   `class_id`: Foreign key to classes table
-   `timestamps`: Created/updated timestamps

### Attendances Table

-   `id`: Primary key
-   `student_id`: Foreign key to students table
-   `class_id`: Foreign key to classes table
-   `date`: Attendance date
-   `status`: Enum ('present', 'absent')
-   `teacher_id`: Foreign key to users table
-   `timestamps`: Created/updated timestamps
-   **Unique constraint**: `(teacher_id, class_id, date, student_id)`

## API Endpoints

### Authentication

| Method | Endpoint           | Description | Auth Required |
| ------ | ------------------ | ----------- | ------------- |
| POST   | `/api/auth/login`  | Login user  | No            |
| POST   | `/api/auth/logout` | Logout user | Yes           |

### Admin Endpoints

| Method | Endpoint        | Description    | Role Required |
| ------ | --------------- | -------------- | ------------- |
| POST   | `/api/teachers` | Create teacher | Admin         |
| GET    | `/api/teachers` | List teachers  | Admin         |
| POST   | `/api/classes`  | Create class   | Admin         |
| GET    | `/api/classes`  | List classes   | Admin         |
| POST   | `/api/students` | Create student | Admin         |
| GET    | `/api/students` | List students  | Admin         |

### Teacher Endpoints

| Method | Endpoint                | Description     | Role Required |
| ------ | ----------------------- | --------------- | ------------- |
| GET    | `/api/teacher/classes`  | Get classes     | Teacher       |
| GET    | `/api/teacher/students` | Get students    | Teacher       |
| POST   | `/api/attendance/mark`  | Mark attendance | Teacher       |

### Report Endpoints

| Method | Endpoint                    | Description          | Auth Required |
| ------ | --------------------------- | -------------------- | ------------- |
| GET    | `/api/reports/student/{id}` | Student report       | Yes           |
| GET    | `/api/reports/class`        | Class monthly report | Yes           |

## Sample Credentials

### Admin User

-   **Email**: `admin@school.com`
-   **Password**: `password`
-   **Role**: `admin`

### Teacher User

-   **Email**: `teacher@school.com`
-   **Password**: `password`
-   **Role**: `teacher`

## Sample Data

The seeder creates:

-   2 classes: "Grade 5" and "Class 10-B"
-   6 students: 3 in Grade 5, 3 in Class 10-B

## API Usage Examples

### 1. Login

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@school.com","password":"password"}'
```

### 2. Create a Class (Admin)

```bash
curl -X POST http://localhost:8000/api/classes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Grade 6"}'
```

### 3. Mark Attendance (Teacher)

```bash
curl -X POST http://localhost:8000/api/attendance/mark \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "class_id": 1,
    "date": "2025-09-06",
    "attendances": [
      {"student_id": 1, "status": "present"},
      {"student_id": 2, "status": "absent"}
    ]
  }'
```

### 4. Get Student Report

```bash
curl -X GET http://localhost:8000/api/reports/student/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Business Rules

1. **Role Constraints**:

    - Only admins can create teachers, classes, and students
    - Only teachers can mark attendance
    - Both admins and teachers can view reports

2. **Attendance Constraints**:

    - Students must belong to the specified class
    - Duplicate attendance marking is prevented
    - Unique constraint on `(teacher_id, class_id, date, student_id)`

3. **Data Validation**:
    - Email addresses must be unique
    - Class names must be unique
    - Attendance status must be 'present' or 'absent'
    - All required fields are validated

## Error Handling

The API returns appropriate HTTP status codes:

-   `200`: Success
-   `201`: Created
-   `400`: Bad Request (validation errors)
-   `401`: Unauthorized (invalid credentials)
-   `403`: Forbidden (insufficient permissions)
-   `409`: Conflict (duplicate attendance)
-   `422`: Unprocessable Entity (validation errors)
-   `500`: Internal Server Error

## CORS Configuration

The API is configured to allow requests from `http://localhost:5173` for frontend integration.

## Security Features

-   **Password Hashing**: All passwords are hashed using Laravel's built-in hashing
-   **Token-based Authentication**: Secure API tokens using Laravel Sanctum
-   **Role-based Middleware**: Ensures proper access control
-   **Input Validation**: Comprehensive validation on all endpoints
-   **SQL Injection Protection**: Using Eloquent ORM with parameterized queries

## Testing

Use the provided `docs/examples.http` file to test all endpoints. You can use tools like:

-   REST Client (VS Code extension)
-   Postman
-   Insomnia
-   curl commands

## Development

### Running Tests

```bash
php artisan test
```

### Code Style

```bash
./vendor/bin/pint
```

### Database Reset

```bash
php artisan migrate:refresh --seed
```

## Production Deployment

1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false` in `.env`
3. Configure proper database credentials
4. Set up proper web server (Apache/Nginx)
5. Configure SSL certificates
6. Set up proper logging and monitoring

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
