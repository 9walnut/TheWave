	create database thewave default character set utf8mb4 default collate utf8mb4_general_ci;
	use thewave;
	CREATE USER 'admin'@'%' IDENTIFIED BY '1q2w3e4r';
	GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
	FLUSH PRIVILEGES;

	drop database thewave;

	CREATE TABLE `USERS` (
		`userNumber`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`userID`	VARCHAR(12)	NOT NULL,
		`password`	VARCHAR(12)	NULL,
		`passwordSalt`	VARCHAR(255)	NULL,
		`userName`	VARCHAR(20)	NULL,
		`phoneNumber`	VARCHAR(11)	NULL,
		`birthday`	DATE	NULL,
		`isAdmin`	CHAR(1)	NULL DEFAULT "N",
		`gender`	CHAR(1)	NULL
	);

	CREATE TABLE `ADDRESS` (
		`addreddId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
		foreign key (userNumber) references USERS (userNumber) ON DELETE CASCADE,
		foreign key (productId) references PRODUCTS (productId) ON DELETE CASCADE
	);


	CREATE TABLE `ORDERS` (
		`orderId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`userNumber`	INT	NOT NULL,
		`cartId`	INT	NOT NULL,
		`productId`	INT	NOT NULL,
		`orderQuantity`	INT	NULL,
		`receiveName`	VARCHAR(10)	NULL,
		`address`	VARCHAR(200)	NULL,
		`deliveryRequest`	VARCHAR(255)	NULL,
		`orderDate`	DATE	NULL,
		`orderStatus`	INT	NULL,
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


	INSERT INTO `USERS` (`userID`, `password`, `passwordSalt`, `userName`, `phoneNumber`, `birthday`, `isAdmin`, `gender`)
	VALUES ('testUser', 'testPassword', 'testSalt', '홍길동', '01012345678', '1990-01-01', 'Y', 'M');

	INSERT INTO `ADDRESS` (`userNumber`, `address`)
	VALUES (1, '서울시 강남구');

INSERT INTO `CATEGORIES` (`categoryName`)
VALUES ('레터링풍선');

	INSERT INTO `PRODUCTS` (`categoryId`, `productName`, `productPrice`, `productInfo`, `productStatus`, `thumbnailUrl`, `detailUrls`)
	VALUES (1, 'iPhone', 1000000, 'Latest model', 'In Stock', 'thumbnail_url', 'detail_url');

	INSERT INTO `productOption` (`productId`, `color`, `size`, `deliveryHope`)
	VALUES (1, 'Black', 'Large', 'Fast Delivery');

	INSERT INTO `CARTS` (`userNumber`, `productId`, `cartQuantity`, `isChecked`)
	VALUES (1, 1, 1, 1);

	INSERT INTO `ORDERS` (`userNumber`, `cartId`, `productId`, `orderQuantity`, `receiveName`, `address`, `deliveryRequest`, `orderDate`, `orderStatus`, `changeDate`)
	VALUES (1, 1, 1, 1, '홍길동', '서울시 강남구', '문 앞에 놔주세요', '2023-12-10', 0, '2023-12-10');

	INSERT INTO `PAYMENT` (`orderId`, `payPrice`, `payMethod`, `isPaid`, `isRefund`)
	VALUES (1, 1000000, 1, 0, 0);

	INSERT INTO `productOut` (`orderId`, `cartId`, `productId`, `outStatus`, `outDate`)
	VALUES (1, 1, 1, '결제대기', '2023-12-10');