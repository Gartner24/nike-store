CREATE DATABASE nike_store;

USE nike_store;

CREATE TABLE users (
    userID INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fullName VARCHAR(50) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    phone VARCHAR(20),
    role ENUM('client', 'admin') NOT NULL DEFAULT 'client',
    address TEXT,
    registrationDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `PK_userID` PRIMARY KEY (userID)
);

-- CREATE TABLE categories (
--     categoryID INT AUTO_INCREMENT,
--     categoryName VARCHAR(50) NOT NULL,
--     CONSTRAINT `PK_categoryID` PRIMARY KEY (categoryID)
-- );

CREATE TABLE products (
    productID INT AUTO_INCREMENT,
    productName varchar(50) NOT NULL,
    description varchar(255) NOT NULL,
    price FLOAT NOT NULL,
    -- categoryID INT NOT NULL,
    CONSTRAINT `PK_productID` PRIMARY KEY (productID)
    -- CONSTRAINT `FK_categoryID_products` FOREIGN KEY (categoryID) REFERENCES categories(categoryID)
);

CREATE TABLE productsImages (
    imageID INT AUTO_INCREMENT,
    productID INT NOT NULL,
    isFront BIT DEFAULT 0 NOT NULL,
    imageURL varchar(500) NOT NULL,
    CONSTRAINT `PK_imageID` PRIMARY KEY (imageID),
    CONSTRAINT `FK_productID_productsImages` FOREIGN KEY (productID) REFERENCES products(productID)
);

CREATE TABLE inventory (
    inventoryID INT AUTO_INCREMENT,
    productID INT NOT NULL,
    quantity INT NOT NULL,
    stockMin INT NOT NULL,
    stockMax INT NOT NULL,
    CONSTRAINT `PK_inventoryID` PRIMARY KEY (inventoryID),
    CONSTRAINT `FK_productID_inventory` FOREIGN KEY (productID) REFERENCES products(productID)
);

CREATE TABLE shoppingCart (
    cartID INT AUTO_INCREMENT,
    userID INT NOT NULL,
    productID INT NOT NULL,
    quantity INT NOT NULL,
    cartStatus ENUM('Active', 'Ordered', 'Cancelled') NOT NULL DEFAULT 'Active',
    CONSTRAINT `PK_cartID` PRIMARY KEY (cartID),
    CONSTRAINT `FK_userID_shoppingCart` FOREIGN KEY (userID) REFERENCES users(userID),
    CONSTRAINT `FK_productID_shoppingCart` FOREIGN KEY (productID) REFERENCES products(productID)
);

CREATE TABLE orders (
    orderID INT AUTO_INCREMENT,
    userID INT NOT NULL,
    orderDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    orderStatus ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending',
    totalPrice FLOAT NOT NULL,
    shippingAddress VARCHAR(150) NOT NULL,
    CONSTRAINT `PK_orderID` PRIMARY KEY (orderID),
    CONSTRAINT `FK_userID_orders` FOREIGN KEY (userID) REFERENCES users(userID)
);
