create database thewave default character set utf8mb4 default collate utf8mb4_general_ci;
use thewave;
CREATE USER 'admin'@'%' IDENTIFIED BY '1q2w3e4r';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

drop database thewave;

CREATE TABLE USERS 
( userNumber   INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
  userId    VARCHAR(12) NOT NULL,
  password  VARCHAR(255) NOT NULL,
  passwordSalt VARCHAR(255) NOT NULL,
  userName  VARCHAR(20) NOT NULL, 
  phoneNumber VARCHAR(11) NOT NULL, 
  birthday DATE NOT NULL,
  isAdmin CHAR(1) NOT NULL,
  gender CHAR(1) NOT NULL
);

CREATE TABLE ADDRESS
( addressId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userNumber INT NOT NULL,
  address VARCHAR(200) NOT NULL,
  foreign key (userNumber) references USERS (userNumber)
);

CREATE TABLE CATEGORIES 
(
categoryId INT NOT NULL auto_increment PRIMARY KEY,
categoryName VARCHAR(20) NOT NULL
);

CREATE TABLE PRODUCTS
(
productId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
categoryId INT NOT NULL,
productName VARCHAR(20) NOT NULL,
productPrice INT NOT NULL,
productInfo VARCHAR(255),
productStatus VARCHAR(10),
foreign key (categoryId) references CATEGORIES (categoryId)
);

CREATE TABLE CARTS
(
  cartId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userNumber INT NOT NULL,
  productId INT NOT NULL,
  cartQuantity INT NOT NULL,
  foreign key (userNumber) references USERS (userNumber),
  foreign key (productId) references PRODUCTS (productId)
);

-- userNumber >>> userName
CREATE TABLE ORDERS
(
orderId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
userNumber INT NOT NULL,
totalPrice INT,
address VARCHAR(200) NOT NULL,
foreign key (userNumber) references USERS (userNumber),
foreign key (addressId) references ADDRESS (address)
);

CREATE TABLE ORDERDETAILS
(
orderDetailNumber INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
orderId INT NOT NULL,
productId INT NOT NULL,
productCount INT NOT NULL,
deliveryStatus VARCHAR(20),
foreign key (orderId) references ORDERS (orderId),
foreign key (productId) references PRODUCTS (productId)
);

insert into USERS(userNumber, userId, password, passwordSalt, userName, phoneNumber, birthday, isAdmin, gender) values 
(1, "kguho9202", "qwer1234", "1234", "권구호", 01063219202, "1992-02-04",  "Y", "M"),
(2, "kguho9202", "qwer1234", "2134", "권구호", 01063219202, "1992-02-04", "Y", "M"),
(3, "kguho9202", "qwer1234", "1234", "권구호", 01063219202,"1992-02-04", "Y", "M"),
(4, "kguho9202", "qwer1234", "1234", "권구호", 01063219202,"1992-02-04", "Y", "M"),
(5, "kguho9202", "qwer1234", "1234", "권구호", 01063219202,"1992-02-04", "Y", "M");

insert into ADDRESS(addressId, userNumber, address) values
(1, 1, "전북익산~~"),
(2, 2, "경기도 고양★특례시★"),
(3, 3, "서울특별시"),
(4, 4, "경기도 고양★특례시★"),
(5, 5, "전라남도 장성군");

insert into CATEGORIES(categoryId, categoryName) values
(1, "레터링풍선"),
(2, "브라이덜샤워"),
(3, "생일파티"),
(4, "용돈풍선");

insert into PRODUCTS (productId, categoryId, productName, productPrice, productInfo, productStatus) values
(1, 1, "샤랄랄라풍선", 40000, "이거쩝니다", "판매중"),
(2, 1, "샤랄랄라풍선", 35000, "이거 개쩝니다", "판매중"),
(3, 3, "HBD 촛불", 4000, "이거 개쩝니다", "판매중"),
(4, 1, "샤랄랄라풍선", 5000, "이거 개쩝니다", "판매중");

insert into CARTS(cartId, userNumber, productId, cartQuantity) values
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 3, 3),
(4, 4, 4, 4);

insert into ORDERS (orderId, userNumber, totalPrice, address) values
(1, 1, 35000, "전북 익산시");

insert into ORDERDETAILS (orderDetailNumber, orderId, productId, productCount, deliverystatus) values
(1, 1, 1, 1, "배송완료")