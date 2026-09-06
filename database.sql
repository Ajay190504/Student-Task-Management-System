-- Student Task Management System Database DDL & Seed Data
-- Compatible with MySQL 8.0 / Aiven Cloud MySQL

CREATE DATABASE IF NOT EXISTS student_task_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE student_task_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_STUDENT',
    auth_provider VARCHAR(20) NOT NULL DEFAULT 'LOCAL',
    avatar_url VARCHAR(255),
    department VARCHAR(100),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Refresh Tokens Table
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiry_date DATETIME NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. User Sessions Table (Active Devices & Revocation)
CREATE TABLE IF NOT EXISTS user_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    session_id VARCHAR(100) NOT NULL UNIQUE,
    device_info VARCHAR(255),
    ip_address VARCHAR(50),
    last_active DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    title VARCHAR(150) NOT NULL,
    instructor_name VARCHAR(100),
    color_code VARCHAR(10) DEFAULT '#3B82F6',
    user_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(180) NOT NULL,
    description TEXT,
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    status VARCHAR(20) NOT NULL DEFAULT 'TODO',
    category VARCHAR(30) NOT NULL DEFAULT 'ASSIGNMENT',
    due_date DATE,
    estimated_hours DOUBLE DEFAULT 1.0,
    completed_at DATETIME,
    course_id BIGINT,
    user_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Subtasks Table
CREATE TABLE IF NOT EXISTS subtasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    task_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Database Indexes for optimized querying
CREATE INDEX idx_tasks_user_status ON tasks(user_id, status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_courses_user ON courses(user_id);
CREATE INDEX idx_user_sessions_sid ON user_sessions(session_id);

-- Sample Seed Data
-- Demo Password: "Password123" (BCrypt Hashed)
INSERT INTO users (name, email, password, role, auth_provider, department, avatar_url) VALUES
('Ajay Waghmare', 'ajay@example.com', '$2a$10$e8wF0xN1vO4D8o/X4.9.4u7yZg4yZ4yZ4yZ4yZ4yZ4yZ4yZ4yZ', 'ROLE_STUDENT', 'LOCAL', 'Computer Science', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ajay')
ON DUPLICATE KEY UPDATE id=id;
