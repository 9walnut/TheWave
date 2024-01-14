	drop database thewave;
    
  create database thewave default character set utf8mb4 default collate utf8mb4_general_ci;
	use thewave;
	create USER 'admin'@'%' IDENTIFIED with mysql_native_password by'1q2w3e4r';
	GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
	FLUSH PRIVILEGES;    
    
	CREATE TABLE `users` (
		`userNumber`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`userId`	VARCHAR(200)	NOT NULL,
		`password`	VARCHAR(255) NOT NULL,
		`passwordSalt`	VARCHAR(255) NOT NULL,
		`userName`	VARCHAR(20)	 NOT NULL,
		`phoneNumber`	VARCHAR(11)	 NOT NULL,
		`birthday`	DATE NOT NULL,
		`isAdmin`	CHAR(1)	NOT NULL DEFAULT "N",
		`gender`	CHAR(1)	 NOT NULL
	);

	CREATE TABLE `address` (
		`addressId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`userNumber`	INT	NOT NULL,
		`address1`	VARCHAR(200) NOT NULL,
		`address2`	VARCHAR(200) NOT NULL,
		`address3`	VARCHAR(200) NOT NULL,
		foreign key (userNumber) references users (userNumber) ON DELETE CASCADE
	);

	CREATE TABLE `categories` (
		`categoryId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`categoryName`	VARCHAR(20)	 NOT NULL
	);

	CREATE TABLE `products` (
		`productId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`categoryId`	INT	NOT NULL,
		`productName`	VARCHAR(20) NOT	NULL,
		`productPrice`	INT	NOT NULL,
		`productInfo`	VARCHAR(255) NOT NULL,
		`productStatus`	VARCHAR(10)	NOT NULL,
		`thumbnailUrl`	VARCHAR(255) NOT NULL,
		`detailUrls`	JSON	NOT NULL,
		`isDeleted` BOOLEAN DEFAULT FALSE NOT NULL,
		foreign key (categoryId) references categories (categoryId)
	);

	CREATE TABLE `productoption` (
		`productId`	INT	NOT NULL,
		`color`	JSON NOT NULL,
		`size`	JSON NOT NULL,
		PRIMARY KEY (`productId`),
		FOREIGN KEY (`productId`) REFERENCES `products` (`productId`)
	);

	CREATE TABLE `carts` (
		`cartId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`userNumber`	INT	NOT NULL,
		`productId`	INT	NOT NULL,
		`cartQuantity`	INT NOT NULL,
	  `cartColor`	VARCHAR(50) NOT NULL,
	  `cartSize`	VARCHAR(50)	NOT NULL, 
		`isChecked`	INT	NOT NULL,
		`isDeleted` BOOLEAN DEFAULT FALSE NOT NULL,
		foreign key (userNumber) references users (userNumber) ON DELETE CASCADE,
		foreign key (productId) references products (productId) ON DELETE CASCADE
	);


CREATE TABLE `orders` (
	`orderId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`userNumber`	INT	NOT NULL,
	`cartId`	INT	NULL,
	`totalPrice` INT NOT NULL,
	`receiveName`	VARCHAR(10)	NOT NULL,
	`address`	VARCHAR(200)	NOT NULL,
	`deliveryRequest`	VARCHAR(255)	NOT NULL,
	`orderDate`	DATE	NOT NULL,
	`orderStatus`	INT	NOT NULL DEFAULT 1,
	`changeDate`	DATE NOT NULL,
	FOREIGN KEY (userNumber) REFERENCES users (userNumber) ON DELETE CASCADE,
	FOREIGN KEY (cartId) REFERENCES carts (cartId)
);

CREATE TABLE `order_products` (
	`orderId` INT NOT NULL,
	`productId` INT NOT NULL,
	`orderQuantity` INT NOT NULL,
	`orderColor` VARCHAR(20) NOT NULL,
	`orderSize` VARCHAR(20) NOT NULL,
	PRIMARY KEY (`orderId`, `productId`),
	FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
	FOREIGN KEY (`productId`) REFERENCES `products` (`productId`)
);

	CREATE TABLE `payment` (
		`paymentId`	INT	NOT NULL  AUTO_INCREMENT PRIMARY KEY,
		`orderId`	INT	NOT NULL,
		`payPrice`	INT	NOT NULL,
		`payMethod`	INT	NOT NULL,
		`isPaid`	INT	NOT NULL,
		`isRefund`	INT	NOT NULL,
		foreign key (orderId) references orders (orderId) ON DELETE CASCADE
	);

	CREATE TABLE `productout` (
		`productOutId`	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`orderId`	INT	NOT NULL,
		`cartId`	INT,
		`productId`	INT	NOT NULL,
		`outStatus`	INT	NOT NULL,
		`outDate`	DATE	NOT NULL,
		FOREIGN KEY (orderId) REFERENCES orders (orderId) ON DELETE CASCADE,
		FOREIGN KEY (cartId) REFERENCES carts (cartId) ON DELETE CASCADE,
		FOREIGN KEY (productId) REFERENCES products (productId) ON DELETE CASCADE
	);

    CREATE TABLE `wishlist` (
		`productId`	INT	NOT NULL,
    `userNumber` INT NOT NULL, 
    PRIMARY KEY (productId, userNumber),
    FOREIGN KEY (productId) REFERENCES products (productId),
    FOREIGN KEY (userNumber) REFERENCES users (userNumber) ON DELETE CASCADE
    );


INSERT INTO users (userID, password, passwordSalt, userName, phoneNumber, birthday, isAdmin, gender)
VALUES 
  ('user1', 'password1', 'salt1', '홍길동', '01011112222', '1995-02-15', 'N', 'M'),
  ('user2', 'password2', 'salt2', '이순신', '01022223333', '1988-07-20', 'N', 'F'),
  ('user3', 'password3', 'salt3', '세종대왕', '01033334444', '2000-04-10', 'N', 'M'),
  ('user4', 'password4', 'salt4', '김유신', '01044445555', '1993-12-05', 'N', 'F'),
  ('user5', 'password5', 'salt5', '유관순', '01055556666', '1985-09-25', 'N', 'M'),
  ('user6', 'password6', 'salt6', '안중근', '01066667777', '1998-03-30', 'N', 'F'),
  ('user7', 'password7', 'salt7', '신사임당', '01077778888', '1992-11-15', 'N', 'M'),
  ('user8', 'password8', 'salt8', '이천수', '01088889999', '1987-06-10', 'N', 'F'),
  ('user9', 'password9', 'salt9', '정조', '01099990000', '1996-08-18', 'N', 'M'),
  ('user10', 'password10', 'salt10', '홍길자', '01010101010', '1980-05-03', 'N', 'F'),
  ('user11', 'password11', 'salt11', '김시민', '01011112222', '1995-02-15', 'N', 'M'),
  ('user12', 'password12', 'salt12', '강감찬', '01012223333', '1988-07-20', 'N', 'F'),
  ('user13', 'password13', 'salt13', '이성계', '01013334444', '2000-04-10', 'N', 'M'),
  ('user14', 'password14', 'salt14', '윤봉길', '01014445555', '1993-12-05', 'N', 'F'),
  ('user15', 'password15', 'salt15', '김구', '01015556666', '1985-09-25', 'N', 'M'),
  ('user16', 'password16', 'salt16', '김좌진', '01016667777', '1998-03-30', 'N', 'F'),
  ('user17', 'password17', 'salt17', '백범', '01017778888', '1992-11-15', 'N', 'M'),
  ('user18', 'password18', 'salt18', '윤동주', '01018889999', '1987-06-10', 'N', 'F'),
  ('user19', 'password19', 'salt19', '김대중', '01019990000', '1996-08-18', 'N', 'M'),
  ('user20', 'password20', 'salt20', '이황', '01020202020', '1980-05-03', 'N', 'F'),
  ('user21', 'password21', 'salt21', '이이', '01021212222', '1995-02-15', 'N', 'M'),
  ('user22', 'password22', 'salt22', '이백', '01022223333', '1988-07-20', 'N', 'F'),
  ('user23', 'password23', 'salt23', '이삼', '01023233444', '2000-04-10', 'N', 'M'),
  ('user24', 'password24', 'salt24', '이사', '01024244555', '1993-12-05', 'N', 'F'),
  ('user25', 'password25', 'salt25', '이오', '01025255666', '1985-09-25', 'N', 'M'),
  ('user26', 'password26', 'salt26', '이육', '01026266777', '1998-03-30', 'N', 'F'),
  ('user27', 'password27', 'salt27', '이칠', '01027277888', '1992-11-15', 'N', 'M'),
  ('user28', 'password28', 'salt28', '이팔', '01028288999', '1987-06-10', 'N', 'F'),
  ('user29', 'password29', 'salt29', '이구', '01029290000', '1996-08-18', 'N', 'M'),
  ('user30', 'password30', 'salt30', '이십', '01030303030', '1980-05-03', 'N', 'F');



INSERT INTO address (userNumber, address1, address2, address3)
VALUES 
  (1, '서울특별시 강남구 테스트로 123', '서울특별시 서초구 더미로 124', '서울특별시 용산구 샘플로 125'),
  (2, '부산광역시 해운대구 샘플로 456', '부산광역시 수영구 테스트로 457', '부산광역시 중구 새로운로 458'),
  (3, '인천광역시 남동구 새로운로 789', '인천광역시 부평구 주소로 790', '인천광역시 연수구 다른로 791'),
  (4, '대구광역시 수성구 더미로 101', '대구광역시 중구 테스트길 102', '대구광역시 달서구 샘플길 103'),
  (5, '광주광역시 서구 주소로 202', '광주광역시 북구 삼성로 203', '광주광역시 남구 테스트길 204'),
  (6, '대전광역시 유성구 다른로 303', '대전광역시 중구 주소길 304', '대전광역시 동구 도로로 305'),
  (7, '울산광역시 중구 샘플길 404', '울산광역시 남구 산책로 405', '울산광역시 동구 테스트길 406'),
  (8, '세종특별자치시 테스트동 505', '세종특별자치시 샘플동 506', '세종특별자치시 더미동 507'),
  (9, '경기도 수원시 삼성로 606', '경기도 성남시 산책로 607', '경기도 안양시 주소길 608'),
  (10, '강원도 춘천시 테스트길 707', '강원도 원주시 더미로 708', '강원도 강릉시 다른로 709'),
  (11, '충청북도 청주시 다른로 808', '충청북도 충주시 테스트로 809', '충청북도 제천시 주소로 810'),
  (12, '충청남도 아산시 주소길 909', '충청남도 천안시 더미로 910', '충청남도 공주시 테스트길 911'),
  (13, '전라북도 전주시 도로로 1010', '전라북도 군산시 샘플길 1011', '전라북도 익산시 주소길 1012'),
  (14, '전라남도 목포시 산책로 1111', '전라남도 여수시 테스트길 1112', '전라남도 순천시 더미로 1113'),
  (15, '경상북도 포항시 테스트길 1212', '경상북도 경주시 새로운로 1213', '경상북도 안동시 샘플로 1214'),
  (16, '경상남도 창원시 산책로 1313', '경상남도 진주시 테스트로 1314', '경상남도 거제시 주소로 1315'),
  (17, '제주특별자치도 제주시 주소길 1414', '제주특별자치도 서귀포시 더미로 1415', '제주특별자치도 제주시 다른로 1416'),
  (18, '서울특별시 종로구 테스트길 1515', '서울특별시 성동구 샘플길 1516', '서울특별시 강북구 주소길 1517'),
  (19, '경기도 고양시 더미로 1616', '경기도 파주시 테스트길 1617', '경기도 용인시 새로운로 1618'),
  (20, '인천광역시 중구 다른로 1717', '인천광역시 계양구 샘플로 1718', '인천광역시 남동구 테스트로 1719'),
  (21, '부산광역시 사하구 테스트로 1818', '부산광역시 동래구 주소로 1819', '부산광역시 서구 더미로 1820'),
  (22, '대구광역시 달서구 주소로 1919', '대구광역시 동구 테스트길 1920', '대구광역시 북구 샘플길 1921'),
  (23, '광주광역시 북구 더미로 2020', '광주광역시 동구 새로운로 2021', '광주광역시 광산구 주소로 2022'),
  (24, '대전광역시 서구 테스트길 2121', '대전광역시 중구 다른로 2122', '대전광역시 동구 샘플로 2123'),
  (25, '울산광역시 남구 주소로 2222', '울산광역시 동구 테스트로 2223', '울산광역시 북구 더미로 2224'),
  (26, '세종특별자치시 다른로 2323', '세종특별자치시 테스트로 2324', '세종특별자치시 샘플로 2325'),
  (27, '경기도 수원시 테스트로 2424', '경기도 안산시 주소로 2425', '경기도 오산시 더미로 2426'),
  (28, '강원도 춘천시 주소길 2525', '강원도 태백시 테스트길 2526', '강원도 동해시 샘플길 2527'),
  (29, '충청북도 청주시 더미로 2626', '충청북도 보은시 새로운로 2627', '충청북도 옥천시 테스트로 2628'),
  (30, '충청남도 아산시 테스트길 2727', '충청남도 논산시 주소로 2728', '충청남도 당진시 더미로 2729');


INSERT INTO categories (categoryName)
VALUES 
  ('캐릭터'),
  ('데이지'),
  ('레터링'),
  ('용돈'),
  ('옴브레'),
  ('장미'),
  ('튤립');


INSERT INTO products (categoryId, productName, productPrice, productInfo, productStatus, thumbnailUrl, detailUrls, isDeleted)
VALUES 
  (1, '상품1', 20000, '이 상품은 테스트 상품입니다.', '판매중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (2, '상품2', 25000, '이 상품은 데이지 향기가 나는 상품입니다.', '상품준비중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (3, '상품3', 15000, '이 상품은 레터링이 돋보이는 상품입니다.', '판매중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (4, '상품4', 18000, '용돈 아껴 쓰는 상품입니다.', '판매중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (5, '상품5', 30000, '용돈 아낄 필요 없는 고급 상품입니다.', '판매중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (6, '상품6', 22000, '옴브레가 아름다운 상품입니다.', '판매중k', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (7, '상품7', 17000, '장미 향기 가득한 특별한 상품입니다.', '판매중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (1, '상품8', 28000, '튤립의 아름다움이 돋보이는 상품입니다.', '판매중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (1, '상품9', 25000, '이 상품은 테스트 상품입니다.', '판매중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (2, '상품10', 18000, '이 상품은 데이지 향기가 나는 상품입니다.', '판매중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (3, '상품11', 30000, '이 상품은 레터링이 돋보이는 상품입니다.', '판매중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (4, '상품12', 20000, '용돈 아껴 쓰는 상품입니다.', '판매중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (5, '상품13', 22000, '용돈 아낄 필요 없는 고급 상품입니다.', '판매중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (6, '상품14', 17000, '옴브레가 아름다운 상품입니다.', '판매중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (7, '상품15', 15000, '장미 향기 가득한 특별한 상품입니다.', '판매중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (1, '상품16', 15000, '장미 향기 가득한 특별한 상품입니다.', '판매준비중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (2, '상품17', 15000, '장미 향기 가득한 특별한 상품입니다.', '판매준비중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (3, '상품18', 15000, '장미 향기 가득한 특별한 상품입니다.', '판매준비중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE),
  (7, '상품19', 15000, '장미 향기 가득한 특별한 상품입니다.', '판매준비중', 'https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/thumbnails/1703911197678_hodu.jpg', '["https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu2.jpg","https://thewave-bucket.s3.ap-northeast-2.amazonaws.com/details/hodu3.jpg"]', FALSE);

INSERT INTO productoption (productId, color, size)
VALUES
	(1, '["빨강", "하양", "초록"]', '["S", "M", "L"]'),
	(2, '["파랑", "빨강", "하양"]', '["S", "M", "L"]'),
	(3, '["노랑"]', '["S", "M", "L"]'),
	(4, '["검정"]', '["S", "M", "L"]'),
	(5, '["초록"]', '["S", "M", "L"]'),
	(6, '["주황"]', '["S", "M", "L"]'),
	(7, '["분홍"]', '["S", "M", "L"]'),
	(8, '["흰색"]', '["S", "M", "L"]'),
	(9, '["파랑"]', '["S", "M", "L"]'),
	(10, '["빨강"]', '["S"]'),
	(11, '["검정"]', '["M"]'),
	(12, '["초록"]', '["L"]'),
	(13, '["주황"]', '["XL"]'),
	(14, '["분홍"]', '["S"]'),
	(15, '["분홍"]', '["S"]'),
	(16, '["분홍"]', '["S"]'),
	(17, '["분홍"]', '["S", "M", "L"]'),
	(18, '["흰색"]', '["M"]'),
	(19, '["흰색"]', '["M"]');

    
INSERT INTO carts (userNumber, productId, cartQuantity, cartColor, cartSize, isChecked, isDeleted)
VALUES 
  (1, 1, 3, '파랑', 'M', 1, FALSE),
  (2, 2, 3, '파랑', 'M', 1, FALSE),
  (3, 3, 1, '노랑', 'S', 0, FALSE),
  (4, 4, 2, '검정', 'S', 1, FALSE),
  (5, 5, 1, '초록', 'S', 0, FALSE),
  (6, 6, 2, '주황', 'S', 1, FALSE),
  (7, 7, 1, '분홍', 'S', 0, FALSE),
  (8, 8, 3, '흰색', 'S', 1, FALSE),
  (9, 9, 2, '파랑', 'S', 0, FALSE),
  (10, 10, 1, '빨강', 'S', 1, FALSE),
  (11, 11, 2, '검정', 'M', 0, FALSE),
  (12, 12, 3, '초록', 'L', 1, FALSE),
  (13, 13, 1, '주황', 'XL', 0, FALSE),
  (14, 14, 2, '분홍', 'S', 1, FALSE),
  (15, 15, 1, '분홍', 'S', 0, FALSE);

  

INSERT INTO orders (userNumber, cartId, totalPrice, receiveName, address, deliveryRequest, orderDate, changeDate)
VALUES
    (2, 1, 75000, 'Jane', '456 Oak St', 'Fragile items', '2024-02-01', '2024-02-01'),
    (3, 2, 30000, 'Bob', '789 Pine St', 'No rush', '2024-02-02', '2024-02-02'),
    (4, 3, 60000, 'Alice', '987 Elm St', 'Urgent delivery', '2024-02-03', '2024-02-03'),
    (5, 4, 90000, 'Charlie', '654 Birch St', 'Standard shipping', '2024-02-04', '2024-02-04'),
    (6, 5, 40000, 'Eva', '321 Maple St', 'Fragile items', '2024-02-05', '2024-02-05'),
    (7, 6, 55000, 'David', '222 Cedar St', 'Handle with care', '2024-02-06', '2024-02-06'),
    (8, 7, 70000, 'Grace', '888 Pine St', 'No rush', '2024-02-07', '2024-02-07'),
    (9, 8, 65000, 'Henry', '777 Oak St', 'Standard shipping', '2024-02-08', '2024-02-08'),
    (10, 9, 120000, 'Olivia', '555 Elm St', 'Urgent delivery', '2024-02-09', '2024-02-09'),
    (11, 10, 48000, 'Frank', '333 Birch St', 'Handle with care', '2024-02-10', '2024-02-10'),
    (12, 11, 88000, 'Sophia', '444 Maple St', 'Fragile items', '2024-02-11', '2024-02-11'),
    (13, 12, 76000, 'Isaac', '666 Cedar St', 'No rush', '2024-02-12', '2024-02-12'),
    (14, 13, 92000, 'Ava', '999 Pine St', 'Standard shipping', '2024-02-13', '2024-02-13'),
    (15, 14, 51000, 'William', '777 Oak St', 'Handle with care', '2024-02-14', '2024-02-14'),
    (16, 15, 68000, 'Emma', '123 Rose St', 'Express delivery', '2024-02-15', '2024-02-15');

INSERT INTO order_products (orderId, productId, orderQuantity, orderColor, orderSize)
VALUES
    (1, 2, 3, '파랑', 'M'),
    (2, 3, 1, '파랑', 'S'),
    (2, 4, 2, '파랑', 'S'),
    (3, 5, 2, '파랑', 'M'),
    (4, 6, 1, '파랑', 'S'),
    (5, 7, 3, '파랑', 'L'),
    (6, 8, 2, '파랑', 'S'),
    (7, 9, 1, '파랑', 'S'),
    (8, 10, 3, '파랑', 'S'),
    (9, 11, 1, '파랑', 'M'),
    (10, 12, 2, '파랑', 'L'),
    (11, 13, 3, '파랑', 'XL'),
    (12, 14, 1, '파랑', 'S'),
    (13, 15, 2, '파랑', 'S'),
    (14, 16, 1, '파랑', 'S'),
    (15, 17, 2, '파랑', 'M');

INSERT INTO payment (orderId, payPrice, payMethod, isPaid, isRefund)
VALUES 
  (1, 20000, 1, 1, 0),
  (2, 25000, 2, 1, 0),
  (3, 18000, 1, 1, 0),
  (4, 30000, 2, 1, 0),
  (5, 15000, 1, 1, 0),
  (6, 22000, 2, 1, 0),
  (7, 19000, 1, 1, 0),
  (8, 27000, 2, 1, 0),
  (9, 21000, 1, 1, 0),
  (10, 12000, 2, 1, 0),
  (11, 28000, 1, 1, 0),
  (12, 32000, 2, 1, 0),
  (13, 15000, 1, 1, 0),
  (14, 20000, 2, 1, 0),
  (15, 25000, 1, 1, 0);

INSERT INTO productout (orderId, cartId, productId, outStatus, outDate)
VALUES 
  (1, 2, 2, 1, '2023-12-31'),
  (2, 2, 2, 1, '2023-12-31'),
  (3, 3, 3, 1, '2023-12-31'),
  (4, 4, 4, 1, '2023-12-31'),
  (5, 5, 5, 3, '2024-01-01'),
  (6, 6, 6, 3, '2024-01-01'),
  (7, 7, 7, 3, '2024-01-01'),
  (8, 8, 8, 1, '2024-01-01'),
  (9, 9, 9, 1, '2024-01-01'),
  (10, 10, 10, 1, '2024-01-01'),
  (11, 11, 11, 1, '2024-01-01'),
  (12, 12, 12, 3, '2024-01-01'),
  (13, 13, 13, 1, '2024-01-01'),
  (14, 14, 14, 1, '2024-01-02'),
  (15, 15, 15, 3, '2024-01-02');