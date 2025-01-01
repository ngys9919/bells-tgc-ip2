-- SQL Schema for AI-eShop
CREATE DATABASE aieshop;

USE aieshop;

-- Authors table
CREATE TABLE authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NULL
);

-- AIbooks table
CREATE TABLE aibooks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  isbn_10 VARCHAR(13) NULL,
  isbn_13 VARCHAR(14) NOT NULL,
  title VARCHAR(255) NOT NULL,
  pageCount INT NULL,
  priceTag DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255) NOT NULL,
  format TEXT NOT NULL,
  promotion TEXT NULL,
  badge TEXT NULL,
  discount DECIMAL(3, 2) NULL,
  review INT UNSIGNED NULL,
  author_id INT,
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

-- Publishers table
CREATE TABLE publishers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  publisher VARCHAR(255) NOT NULL
);

-- Book_Publisher table
CREATE TABLE book_publisher (
  id INT AUTO_INCREMENT PRIMARY KEY,
  publicationDate DATE NOT NULL,
  website VARCHAR(255) NOT NULL,
  book_id INT,
  publisher_id INT,
  FOREIGN KEY (book_id) REFERENCES aibooks(id),
  FOREIGN KEY (publisher_id) REFERENCES publishers(id)
);

-- AIimage table
CREATE TABLE aiimage (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  fileName VARCHAR(255) NOT NULL,
  fileFormat VARCHAR(4) NOT NULL,
  fileSize VARCHAR(10) NOT NULL,
  priceTag DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255) NOT NULL,
  creator VARCHAR(100) NULL,
  dateCreated DATETIME,
  downloadlink VARCHAR(255) NULL,
  promotion TEXT NULL,
  badge TEXT NULL,
  discount DECIMAL(3, 2) NULL,
  review INT UNSIGNED NULL
);

-- AImusic table
CREATE TABLE aimusic (
  id INT AUTO_INCREMENT PRIMARY KEY,
  songGenre VARCHAR(100) NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  fileName VARCHAR(255) NOT NULL,
  fileFormat VARCHAR(4) NOT NULL,
  fileSize VARCHAR(10) NOT NULL,
  priceTag DECIMAL(10, 2) NOT NULL,
  music VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  duration VARCHAR(8) NOT NULL,
  creator VARCHAR(100) NULL,
  dateCreated DATETIME,
  downloadlink VARCHAR(255) NULL,
  promotion TEXT NULL,
  badge TEXT NULL,
  discount DECIMAL(3, 2) NULL,
  review INT UNSIGNED NULL
);

-- AIvideo table
CREATE TABLE aivideo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  fileName VARCHAR(255) NOT NULL,
  fileFormat VARCHAR(4) NOT NULL,
  fileSize VARCHAR(10) NOT NULL,
  priceTag DECIMAL(10, 2) NOT NULL,
  video VARCHAR(255) NOT NULL,
  duration VARCHAR(8) NOT NULL,
  creator VARCHAR(100) NULL,
  dateCreated DATETIME,
  downloadlink VARCHAR(255) NULL,
  promotion TEXT NULL,
  badge TEXT NULL,
  discount DECIMAL(3, 2) NULL,
  review INT UNSIGNED NULL
);

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  salutation VARCHAR(10),
  country VARCHAR(50),
  created_at DATETIME DEFAULT NOW()
);

CREATE TABLE marketing_preferences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  preference VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE user_marketing_preferences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  preference_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (preference_id) REFERENCES marketing_preferences(id) ON DELETE CASCADE
);

-- Cart Items table
CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES aibooks(id)
);

-- Orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'completed', 'cancelled', 'shipping', 'processing') DEFAULT 'pending',
  checkout_session_id VARCHAR(255),
  created_at DATETIME DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES aibooks(id)
);
