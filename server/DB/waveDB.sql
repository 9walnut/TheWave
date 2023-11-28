create database thewave default character set utf8mb4 default collate utf8mb4_general_ci;
use thewave;
CREATE USER 'admin'@'%' IDENTIFIED BY '1q2w3e4r';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE TABLE USERS 
( userNumber   INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
  userID    VARCHAR(12) NOT NULL,
  password  VARCHAR(12) NOT NULL,
  passwordSalt VARCHAR(255) NOT NULL,
  userName  VARCHAR(20) NOT NULL, 
  phoneNumber CHAR(11), 
  birthday DATE,
  isAdmin CHAR(1),
  gender CHAR(1)
);

CREATE TABLE ADDRESS
( addressID INT NOT NULL AUTO_INCREMENT,
  userID VARCHAR(12) NOT NULL,
  adress VARCHAR(200) NOT NULL,
  foreign key (`userID`) references USERS (`userID`)
);

CREATE TABLE CARTS
(
cartID INT NOT NULL AUTO_INCREMENT,
  userID VARCHAR(12) NOT NULL,
  productID INT NOT NULL,
  foreign key (`userID`) references USERS (`userID`),
  foreign key (`productID`) references PRODUTCS (`productID`)
);

CREATE TABLE PRODUCTS
(
productID INT NOT NULL AUTO_INCREMENT,
categoryID INT NOT NULL,
productName VARCHAR(20) NOT NULL,
productPrice INT NOT NULL,
productInfo VARCHAR(255),
productStatus VARCHAR(10),
foreign key (`categoryID`) references CATEGORIES (`categoryID`)
);

CREATE TABLE CATEGORIES 
(
categoryID INT NOT NULL auto_increment,
categoryName VARCHAR(20)
);

CREATE TABLE ORDERS
(
orderID INT NOT NULL AUTO_INCREMENT,
userID VARCHAR(12) NOT NULL,
totalPrice INT,
adress VARCHAR(200) NOT NULL,
foreign key (`userID`) references USERS (`userID`),
foreign key (`address`) references ADDRESS (`address`)
);

CREATE TABLE ORDERDETAILS
(
orderDetail INT NOT NULL AUTO_INCREMENT,
orderID INT NOT NULL,
productID INT NOT NULL,
productCount INT NOT NULL,
deliveryStatus VARCHAR(20),
foreign key (`orderID`) references ORDERS (`orderID`),
foreign key (`productID`) references PRODUTCS (`productID`)

);