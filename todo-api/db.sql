-- Create database
CREATE DATABASE IF NOT EXISTS todo_db;

-- Use the created database
USE todo_db;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE,
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample tasks
INSERT INTO tasks (title, description, due_date, priority, completed) VALUES
('Complete project', 'Finish the REST API project', '2023-12-31', 'high', false),
('Buy groceries', 'Milk, eggs, bread', '2023-12-25', 'medium', false),
('Call doctor', 'Schedule annual checkup', '2023-12-30', 'low', false); 