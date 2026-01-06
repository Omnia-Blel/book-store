-- BookStore Database Schema

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS bookstore;
USE bookstore;

-- Articles Table
CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  content LONGTEXT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_author (author),
  INDEX idx_date (date),
  FULLTEXT INDEX ft_search (title, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data (optional)
INSERT INTO articles (title, author, content) VALUES 
('Introduction to Node.js', 'John Doe', 'Node.js is a JavaScript runtime built on Chrome''s V8 JavaScript engine...'),
('Advanced MySQL Techniques', 'Jane Smith', 'In this article, we will explore advanced MySQL optimization techniques...'),
('React Best Practices', 'Bob Johnson', 'React is a popular JavaScript library for building user interfaces...');
