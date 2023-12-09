create database thewave default character set utf8mb4 default collate utf8mb4_general_ci;
use thewave;
CREATE USER 'admin'@'%' IDENTIFIED BY '1q2w3e4r';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

drop database thewave;

CREATE TABLE `USERS` (
	`userNumber`	INT	NOT NULL,
	`userID`	VARCHAR(12)	NOT NULL,
	`password`	VARCHAR(12)	NULL,
	`passwordSalt`	VARCHAR(255)	NULL,
	`userName`	VARCHAR(20)	NULL,
	`phoneNumber`	VARCHAR(11)	NULL,
	`birthday`	DATE	NULL,
	`isAdmin`	CHAR(1)	NULL,
	`gender`	CHAR(1)	NULL
);

CREATE TABLE `ADDRESS` (
	`addreddID`	INT	NOT NULL,
	`userNumber`	INT	NOT NULL,
	`adress`	VARCHAR(200)	NULL
);

CREATE TABLE `PRODUCTS` (
	`productID`	INT	NOT NULL,
	`categotyID`	INT	NOT NULL,
	`productName`	VARCHAR(20)	NULL,
	`productPrice`	INT	NULL,
	`productInfo`	VARCHAR(255)	NULL,
	`productStatus`	VARCHAR(10)	NULL,
	`thumbnailUrl`	VARCHAR(255)	NULL,
	`detailUrls`	TEXT	NULL
);

CREATE TABLE `CARTS` (
	`cartID`	INT	NOT NULL,
	`userNumber`	INT	NOT NULL,
	`productID`	INT	NOT NULL,
	`cartQuantity`	INT	NULL,
	`isChecked`	INT	NULL,
	`isPaid`	INT	NULL
);

CREATE TABLE `CATEGORIES` (
	`categotyID`	INT	NOT NULL,
	`categoryName`	VARCHAR(20)	NULL
);

CREATE TABLE `ORDERS` (
	`orderID`	INT	NOT NULL,
	`userNumber`	INT	NOT NULL,
	`cartID`	INT	NOT NULL,
	`productID`	INT	NOT NULL,
	`orderQuantity`	INT	NULL,
	`receiveName`	VARCHAR(10)	NULL,
	`address`	VARCHAR(200)	NULL,
	`deliveryRequest`	VARCHAR(255)	NULL,
	`orderDate`	DATE	NULL,
	`Field`	INT	NULL,
	`status`	INT	NULL,
	`changeDate`	DATE	NULL
);

CREATE TABLE `PAYMENT` (
	`paymentId`	INT	NOT NULL,
	`orderID`	INT	NOT NULL,
	`payPrice`	INT	NULL,
	`payMethod`	INT	NULL,
	`isPaid`	INT	NULL,
	`isRefund`	INT	NULL
);

CREATE TABLE `productOption` (
	`productID`	INT	NOT NULL,
	`color`	VARCHAR(50)	NULL,
	`size`	VARCHAR(50)	NULL,
	`deliveryHope`	VARCHAR(50)	NULL
);

CREATE TABLE `productOut` (
	`productOutId`	VARCHAR(255)	NOT NULL,
	`orderID`	INT	NOT NULL,
	`cartID`	INT	NOT NULL,
	`productID`	INT	NOT NULL,
	`status`	VARCHAR(255)	NULL,
	`outDate`	DATE	NULL
);

ALTER TABLE `USERS` ADD CONSTRAINT `PK_USERS` PRIMARY KEY (
	`userNumber`
);

ALTER TABLE `ADDRESS` ADD CONSTRAINT `PK_ADDRESS` PRIMARY KEY (
	`addreddID`,
	`userNumber`
);

ALTER TABLE `PRODUCTS` ADD CONSTRAINT `PK_PRODUCTS` PRIMARY KEY (
	`productID`
);

ALTER TABLE `CARTS` ADD CONSTRAINT `PK_CARTS` PRIMARY KEY (
	`cartID`
);

ALTER TABLE `CATEGORIES` ADD CONSTRAINT `PK_CATEGORIES` PRIMARY KEY (
	`categotyID`
);

ALTER TABLE `ORDERS` ADD CONSTRAINT `PK_ORDERS` PRIMARY KEY (
	`orderID`
);

ALTER TABLE `PAYMENT` ADD CONSTRAINT `PK_PAYMENT` PRIMARY KEY (
	`paymentId`,
	`orderID`
);

ALTER TABLE `productOption` ADD CONSTRAINT `PK_PRODUCTOPTION` PRIMARY KEY (
	`productID`
);

ALTER TABLE `productOut` ADD CONSTRAINT `PK_PRODUCTOUT` PRIMARY KEY (
	`productOutId`,
	`orderID`
);

ALTER TABLE `ADDRESS` ADD CONSTRAINT `FK_USERS_TO_ADDRESS_1` FOREIGN KEY (
	`userNumber`
)
REFERENCES `USERS` (
	`userNumber`
);

ALTER TABLE `PRODUCTS` ADD CONSTRAINT `FK_CATEGORIES_TO_PRODUCTS_1` FOREIGN KEY (
	`categotyID`
)
REFERENCES `CATEGORIES` (
	`categotyID`
);

ALTER TABLE `CARTS` ADD CONSTRAINT `FK_USERS_TO_CARTS_1` FOREIGN KEY (
	`userNumber`
)
REFERENCES `USERS` (
	`userNumber`
);

ALTER TABLE `CARTS` ADD CONSTRAINT `FK_PRODUCTS_TO_CARTS_1` FOREIGN KEY (
	`productID`
)
REFERENCES `PRODUCTS` (
	`productID`
);

ALTER TABLE `ORDERS` ADD CONSTRAINT `FK_USERS_TO_ORDERS_1` FOREIGN KEY (
	`userNumber`
)
REFERENCES `USERS` (
	`userNumber`
);

ALTER TABLE `ORDERS` ADD CONSTRAINT `FK_CARTS_TO_ORDERS_1` FOREIGN KEY (
	`cartID`
)
REFERENCES `CARTS` (
	`cartID`
);

ALTER TABLE `ORDERS` ADD CONSTRAINT `FK_PRODUCTS_TO_ORDERS_1` FOREIGN KEY (
	`productID`
)
REFERENCES `PRODUCTS` (
	`productID`
);

ALTER TABLE `PAYMENT` ADD CONSTRAINT `FK_ORDERS_TO_PAYMENT_1` FOREIGN KEY (
	`orderID`
)
REFERENCES `ORDERS` (
	`orderID`
);

ALTER TABLE `productOption` ADD CONSTRAINT `FK_PRODUCTS_TO_productOption_1` FOREIGN KEY (
	`productID`
)
REFERENCES `PRODUCTS` (
	`productID`
);

ALTER TABLE `productOut` ADD CONSTRAINT `FK_ORDERS_TO_productOut_1` FOREIGN KEY (
	`orderID`
)
REFERENCES `ORDERS` (
	`orderID`
);

ALTER TABLE `productOut` ADD CONSTRAINT `FK_CARTS_TO_productOut_1` FOREIGN KEY (
	`cartID`
)
REFERENCES `CARTS` (
	`cartID`
);

ALTER TABLE `productOut` ADD CONSTRAINT `FK_PRODUCTS_TO_productOut_1` FOREIGN KEY (
	`productID`
)
REFERENCES `PRODUCTS` (
	`productID`
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

insert into ORDERS (orderId, userNumber, productId, orderQuantity) values
(1, 1, 1, 1);

insert into ORDERDETAILS (orderDetailNumber, cartId, orderId, addressId, totalPrice, deliverystatus) values
(1, 1, 1, 1, 90000, "배송완료");

select * from ORDERDETAILS;