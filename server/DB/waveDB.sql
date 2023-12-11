	create database thewave default character set utf8mb4 default collate utf8mb4_general_ci;
	use thewave;
	CREATE USER 'admin'@'%' IDENTIFIED BY '1q2w3e4r';
	GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
	FLUSH PRIVILEGES;

	drop database thewave;

	CREATE TABLE `USERS` (
		`userNumber`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`userId`	VARCHAR(12)	NOT NULL,
		`password`	VARCHAR(255)	NULL,
		`passwordSalt`	VARCHAR(255)	NULL,
		`userName`	VARCHAR(20)	NULL,
		`phoneNumber`	VARCHAR(11)	NULL,
		`birthday`	DATE	NULL,
		`isAdmin`	CHAR(1)	NULL DEFAULT "N",
		`gender`	CHAR(1)	NULL
	);

	CREATE TABLE `ADDRESS` (
		`addressId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`userNumber`	INT	NOT NULL,
		`address`	VARCHAR(200)	NULL,
		foreign key (userNumber) references USERS (userNumber) ON DELETE CASCADE
	);

	CREATE TABLE `CATEGORIES` (
		`categoryId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`categoryName`	VARCHAR(20)	NULL
	);

	CREATE TABLE `PRODUCTS` (
		`productId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`categoryId`	INT	NOT NULL,
		`productName`	VARCHAR(20)	NULL,
		`productPrice`	INT	NULL,
		`productInfo`	VARCHAR(255)	NULL,
		`productStatus`	VARCHAR(10)	NULL,
		`thumbnailUrl`	VARCHAR(255)	NULL,
		`detailUrls`	TEXT	NULL,
		`isDeleted` BOOLEAN DEFAULT FALSE,
		foreign key (categoryId) references CATEGORIES (categoryId)
	);

	CREATE TABLE `productOption` (
		`productId`	INT	NOT NULL,
		`color`	VARCHAR(50)	NULL,
		`size`	VARCHAR(50)	NULL,
		`deliveryHope`	VARCHAR(50)	NULL,
		PRIMARY KEY (`productId`),
		FOREIGN KEY (`productId`) REFERENCES `PRODUCTS` (`productId`)
	);

	CREATE TABLE `CARTS` (
		`cartId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`userNumber`	INT	NOT NULL,
		`productId`	INT	NOT NULL,
		`cartQuantity`	INT	NULL,
		`isChecked`	INT	NULL,
		`isDeleted` BOOLEAN DEFAULT FALSE,
		foreign key (userNumber) references USERS (userNumber) ON DELETE CASCADE,
		foreign key (productId) references PRODUCTS (productId) ON DELETE CASCADE
	);


CREATE TABLE `ORDERS` (
	`orderId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`userNumber`	INT	NOT NULL,
	`cartId`	INT	 NULL,
	`productId`	INT	NOT NULL,
	`orderQuantity`	INT	NULL,
	`color`	VARCHAR(50)	NULL,
	`size`	VARCHAR(50)	NULL, 
	`receiveName`	VARCHAR(10)	NULL,
	`address`	VARCHAR(200)	NULL,
	`deliveryRequest`	VARCHAR(255)	NULL,
	`orderDate`	DATE	NULL,
	`orderStatus`	INT	NULL DEFAULT 1,
	`changeDate`	DATE	NULL,
	FOREIGN KEY (userNumber) REFERENCES USERS (userNumber) ON DELETE CASCADE,
	FOREIGN KEY (cartId) REFERENCES CARTS (cartId),
	FOREIGN KEY (productId) REFERENCES PRODUCTS (productId)
);
	CREATE TABLE `PAYMENT` (
		`paymentId`	INT	NOT NULL  AUTO_INCREMENT PRIMARY KEY,
		`orderId`	INT	NOT NULL,
		`payPrice`	INT	NULL,
		`payMethod`	INT	NULL,
		`isPaid`	INT	NULL,
		`isRefund`	INT	NULL,
		foreign key (orderId) references ORDERS (orderId) ON DELETE CASCADE
	);

	CREATE TABLE `productOut` (
		`productOutId`	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`orderId`	INT	NOT NULL,
		`cartId`	INT	NOT NULL,
		`productId`	INT	NOT NULL,
		`outStatus`	VARCHAR(255)	NULL,
		`outDate`	DATE	NULL,
		FOREIGN KEY (orderId) REFERENCES ORDERS (orderId) ON DELETE CASCADE,
		FOREIGN KEY (cartId) REFERENCES CARTS (cartId) ON DELETE CASCADE,
		FOREIGN KEY (productId) REFERENCES PRODUCTS (productId) ON DELETE CASCADE
	);


INSERT INTO USERS (userID, password, passwordSalt, userName, phoneNumber, birthday, isAdmin, gender)
VALUES ('testUser', 'testPassword', 'testSalt', 'Test Name', '01012345678', '1990-01-01', 'N', 'M');

INSERT INTO ADDRESS (userNumber, address)
VALUES (1, '서울특별시 강남구 테스트로 123');

INSERT INTO CATEGORIES (categoryName)
VALUES ('레터링풍선');

INSERT INTO PRODUCTS (categoryId, productName, productPrice, productInfo, productStatus, thumbnailUrl, detailUrls, isDeleted)
VALUES (1, 'Test Product', 10000, 'This is a test product', 'In Stock', 'http://test.com/image.jpg', 'http://test.com/detail.jpg', FALSE);

INSERT INTO productOption (productId, color, size, deliveryHope)
VALUES (1, 'Red', 'M', 'Fast Delivery');

INSERT INTO CARTS (userNumber, productId, cartQuantity, isChecked, isDeleted)
VALUES (1, 1, 2, 1, FALSE);

INSERT INTO ORDERS (userNumber, cartId, productId, orderQuantity, color, size, receiveName, address, deliveryRequest, orderDate, orderStatus, changeDate)
VALUES (1, 1, 1, 2, 'Red', 'M', '권구호', '서울특별시 강남구 테스트로 123', 'Fast Delivery', CURDATE(), 1, CURDATE());

INSERT INTO PAYMENT (orderId, payPrice, payMethod, isPaid, isRefund)
VALUES (1, 20000, 1, 1, 0);

INSERT INTO productOut (orderId, cartId, productId, outStatus, outDate)
VALUES (1, 1, 1, 'Out for Delivery', CURDATE());