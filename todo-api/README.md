# Todo List REST API

A simple REST API for managing a todo list built with Express.js and MySQL.

## Features

- CRUD operations for todo tasks
- MySQL database integration
- RESTful API design

## Requirements

- Node.js 
- MySQL server
- npm

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=todo_db
   ```
4. Set up the database:
   - Run MySQL server
   - Execute the SQL script in `db.sql` to create the database and tables:
     ```
     mysql -u root -p < db.sql
     ```

## Running the Application

- Development mode with auto-reload:
  ```
  npm run dev
  ```

- Production mode:
  ```
  npm start
  ```

## API Endpoints

| Method | Endpoint        | Description        |
|--------|-----------------|---------------------|
| GET    | /api/tasks      | Get all tasks       |
| GET    | /api/tasks/:id  | Get a specific task |
| POST   | /api/tasks      | Create a new task   |
| PUT    | /api/tasks/:id  | Update a task       |
| DELETE | /api/tasks/:id  | Delete a task       |

## Request Body Examples

### Create a Task
```json
{
  "title": "Complete project",
  "description": "Finish the REST API project",
  "due_date": "2023-12-31",
  "priority": "high",
  "completed": false
}
```

### Update a Task
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "due_date": "2023-12-31",
  "priority": "medium",
  "completed": true
}
``` 