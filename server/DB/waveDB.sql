create database thewave default character set utf8mb4 default collate utf8mb4_general_ci;
use thewave;
CREATE USER 'admin'@'%' IDENTIFIED BY '1q2w3e4r';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE TABLE USERS 
( userNumber   INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
  userId    VARCHAR(12) NOT NULL,
  password  VARCHAR(12) NOT NULL,
  passwordSalt VARCHAR(255) NOT NULL,
  userName  VARCHAR(20) NOT NULL, 
  phoneNumber CHAR(11), 
  birthday DATE,
  isAdmin CHAR(1),
  gender CHAR(1)
);

CREATE TABLE ADDRESS
( addressId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userNumber INT NOT NULL,
  address VARCHAR(200) NOT NULL,
  foreign key (userNumber) references USERS (userNumber)
);

CREATE TABLE CARTS
(
cartId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userNumber INT NOT NULL,
  productId INT NOT NULL,
  cartQuantity INT NOT NULL,
  foreign key (userNumber) references USERS (userNumber),
  foreign key (productID) references PRODUCTS (productID)
);

CREATE TABLE CATEGORIES 
(
categoryId INT NOT NULL auto_increment PRIMARY KEY,
categoryName VARCHAR(20)
);

CREATE TABLE PRODUCTS
(
productId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
categoryId INT NOT NULL,
productName VARCHAR(20) NOT NULL,
productPrice INT NOT NULL,
productInfo VARCHAR(255),
productStatus VARCHAR(10),
foreign key (categoryID) references CATEGORIES (categoryID)
);

CREATE TABLE ORDERS
(
orderId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
userNumber INT NOT NULL,
totalPrice INT,
addressId INT NOT NULL,
foreign key (userNumber) references USERS (userNumber),
foreign key (addressID) references ADDRESS (addressID)
);

CREATE TABLE ORDERDETAILS
(
orderDetail INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
orderId INT NOT NULL,
productId INT NOT NULL,
productCount INT NOT NULL,
deliveryStatus VARCHAR(20),
foreign key (orderID) references ORDERS (orderID),
foreign key (productID) references PRODUCTS (productID)
);