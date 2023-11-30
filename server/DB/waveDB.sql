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
( addressID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userNumber INT NOT NULL,
  address VARCHAR(200) NOT NULL,
  foreign key (userNumber) references USERS (userNumber)
);

CREATE TABLE CARTS
(
cartID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userNumber INT NOT NULL,
  productID INT NOT NULL,
  cartQuantity INT NOT NULL,
  foreign key (userNumber) references USERS (userNumber),
  foreign key (productID) references PRODUCTS (productID)
);

CREATE TABLE PRODUCTS
(
productID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
categoryID INT NOT NULL,
productName VARCHAR(20) NOT NULL,
productPrice INT NOT NULL,
productInfo VARCHAR(255),
productStatus VARCHAR(10),
foreign key (categoryID) references CATEGORIES (categoryID)
);

CREATE TABLE CATEGORIES 
(
categoryID INT NOT NULL auto_increment PRIMARY KEY,
categoryName VARCHAR(20)
);

CREATE TABLE ORDERS
(
orderID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
userNumber INT NOT NULL,
totalPrice INT,
addressID INT NOT NULL,
foreign key (userNumber) references USERS (userNumber),
foreign key (addressID) references ADDRESS (addressID)
);

CREATE TABLE ORDERDETAILS
(
orderDetail INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
orderID INT NOT NULL,
productID INT NOT NULL,
productCount INT NOT NULL,
deliveryStatus VARCHAR(20),
foreign key (orderID) references ORDERS (orderID),
foreign key (productID) references PRODUCTS (productID)

);


alter table carts add cartQuantity INT NOT NULL;
-- sequelize-auto 활용한 모델 자동 생성(mysql >>> sequelize)
sequelize-auto -o "./models" -d thewave -h localhost -u root -p 3306 -x 1q2w3e4r -e mysql