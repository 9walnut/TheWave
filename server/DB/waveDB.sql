	create database thewave default character set utf8mb4 default collate utf8mb4_general_ci;
	use thewave;
	create USER 'admin'@'%' IDENTIFIED with mysql_native_password by'1q2w3e4r';
	GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
	FLUSH PRIVILEGES;

	drop database thewave;
    
    
	CREATE TABLE `users` (
		`userNumber`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`userId`	VARCHAR(12)	NOT NULL,
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
		`address`	VARCHAR(200) NOT NULL,
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
		`detailUrls`	TEXT	NOT NULL,
		`isDeleted` BOOLEAN DEFAULT FALSE NOT NULL,
		foreign key (categoryId) references categories (categoryId)
	);

	CREATE TABLE `productoption` (
		`productId`	INT	NOT NULL,
		`color`	VARCHAR(50)	NOT NULL,
		`size`	VARCHAR(50)	 NOT NULL,
		`deliveryHope`	VARCHAR(50)	 NOT NULL,
		PRIMARY KEY (`productId`),
		FOREIGN KEY (`productId`) REFERENCES `products` (`productId`)
	);

	CREATE TABLE `carts` (
		`cartId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
		`userNumber`	INT	NOT NULL,
		`productId`	INT	NOT NULL,
		`cartQuantity`	INT NOT NULL,
		`isChecked`	INT	NOT NULL,
		`isDeleted` BOOLEAN DEFAULT FALSE NOT NULL,
		foreign key (userNumber) references users (userNumber) ON DELETE CASCADE,
		foreign key (productId) references products (productId) ON DELETE CASCADE
	);


CREATE TABLE `orders` (
	`orderId`	INT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`userNumber`	INT	NOT NULL,
	`cartId`	INT	NULL,
	`productId`	INT	NOT NULL,
	`orderQuantity`	INT NOT 	NULL,
	`color`	VARCHAR(50) NOT 	NULL,
	`size`	VARCHAR(50)	NOT NULL, 
	`receiveName`	VARCHAR(10)	NOT NULL,
	`address`	VARCHAR(200)	NOT NULL,
	`deliveryRequest`	VARCHAR(255)	NOT NULL,
	`orderDate`	DATE	NOT NULL,
	`orderStatus`	INT	NOT NULL DEFAULT 1,
	`changeDate`	DATE NOT NULL,
	FOREIGN KEY (userNumber) REFERENCES users (userNumber) ON DELETE CASCADE,
	FOREIGN KEY (cartId) REFERENCES carts (cartId),
	FOREIGN KEY (productId) REFERENCES products (productId)
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
		`cartId`	INT	NOT NULL,
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



INSERT INTO address (userNumber, address)
VALUES 
  (1, '서울특별시 강남구 테스트로 123'),
  (2, '부산광역시 해운대구 샘플로 456'),
  (3, '인천광역시 남동구 새로운로 789'),
  (4, '대구광역시 수성구 더미로 101'),
  (5, '광주광역시 서구 주소로 202'),
  (6, '대전광역시 유성구 다른로 303'),
  (7, '울산광역시 중구 샘플길 404'),
  (8, '세종특별자치시 테스트동 505'),
  (9, '경기도 수원시 삼성로 606'),
  (10, '강원도 춘천시 테스트길 707'),
  (11, '충청북도 청주시 다른로 808'),
  (12, '충청남도 아산시 주소길 909'),
  (13, '전라북도 전주시 도로로 1010'),
  (14, '전라남도 목포시 산책로 1111'),
  (15, '경상북도 포항시 테스트길 1212'),
  (16, '경상남도 창원시 산책로 1313'),
  (17, '제주특별자치도 제주시 주소길 1414'),
  (18, '서울특별시 종로구 테스트길 1515'),
  (19, '경기도 고양시 더미로 1616'),
  (20, '인천광역시 중구 다른로 1717'),
  (21, '부산광역시 사하구 테스트로 1818'),
  (22, '대구광역시 달서구 주소로 1919'),
  (23, '광주광역시 북구 더미로 2020'),
  (24, '대전광역시 서구 테스트길 2121'),
  (25, '울산광역시 남구 주소로 2222'),
  (26, '세종특별자치시 다른로 2323'),
  (27, '경기도 수원시 테스트로 2424'),
  (28, '강원도 춘천시 주소길 2525'),
  (29, '충청북도 청주시 더미로 2626'),
  (30, '충청남도 아산시 테스트길 2727');

INSERT INTO categories (categoryName)
VALUES 
  ('캐릭터'),
  ('데이지'),
  ('레터링'),
  ('용돈'),
  ('용돈'),
  ('옴브레'),
  ('장미'),
  ('튤립');

INSERT INTO products (categoryId, productName, productPrice, productInfo, productStatus, thumbnailUrl, detailUrls, isDeleted)
VALUES 
  (1, '상품1', 20000, '이 상품은 테스트 상품입니다.', '판매중', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654548424_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE),
  (2, '상품2', 25000, '이 상품은 데이지 향기가 나는 상품입니다.', '상품준비중', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654548424_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE),
  (3, '상품3', 15000, '이 상품은 레터링이 돋보이는 상품입니다.', '판매중', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654548424_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE),
  (4, '상품4', 18000, '용돈 아껴 쓰는 상품입니다.', '판매중', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654548424_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE),
  (5, '상품5', 30000, '용돈 아낄 필요 없는 고급 상품입니다.', '판매중', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654548424_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE),
  (6, '상품6', 22000, '옴브레가 아름다운 상품입니다.', '판매중k', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654548424_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE),
  (7, '상품7', 17000, '장미 향기 가득한 특별한 상품입니다.', '판매중', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654548424_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE),
  (8, '상품8', 28000, '튤립의 아름다움이 돋보이는 상품입니다.', '판매중', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654548424_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE),
  (1, '상품9', 25000, '이 상품은 테스트 상품입니다.', '판매중', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654548424_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE),
  (2, '상품10', 18000, '이 상품은 데이지 향기가 나는 상품입니다.', '판매중', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654548424_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE),
  (3, '상품11', 30000, '이 상품은 레터링이 돋보이는 상품입니다.', '판매중', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654549109_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE),
  (4, '상품12', 20000, '용돈 아껴 쓰는 상품입니다.', '판매중', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654549109_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE),
  (5, '상품13', 22000, '용돈 아낄 필요 없는 고급 상품입니다.', '판매중', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654549109_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE),
  (6, '상품14', 17000, '옴브레가 아름다운 상품입니다.', '판매중', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654549109_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE),
  (7, '상품15', 15000, '장미 향기 가득한 특별한 상품입니다.', '판매중', 'https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/1703654549109_roseBallon01.jpg', '["https://thewave-market.s3.ap-southeast-2.amazonaws.com/details/roseBallon03.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail01.jpg","https://thewave-market.s3.ap-southeast-2.amazonaws.com/thumbnails/rose_detail/roseDetail02.jpg"]', FALSE);


INSERT INTO productoption (productId, color, size, deliveryHope)
VALUES
	(1, '빨강', 'M', '문 앞에 놔주세요'),
	(2, '파랑', 'M', '문 앞에 놔주세요'),
	(3, '노랑', 'L', '직접 수령'),
	(4, '검정', 'S', '택배함에 넣어주세요'),
	(5, '초록', 'XL', '집으로 배송'),
	(6, '주황', 'S', '문 앞에 놔주세요'),
	(7, '분홍', 'M', '직접 수령'),
	(8, '흰색', 'L', '택배함에 넣어주세요'),
	(9, '파랑', 'XL', '집으로 배송'),
	(10, '빨강', 'S', '문 앞에 놔주세요'),
	(11, '검정', 'M', '직접 수령'),
	(12, '초록', 'L', '택배함에 넣어주세요'),
	(13, '주황', 'XL', '집으로 배송'),
	(14, '분홍', 'S', '문 앞에 놔주세요'),
	(15, '흰색', 'M', '직접 수령');

    
INSERT INTO carts (userNumber, productId, cartQuantity, isChecked, isDeleted)
VALUES 
  (2, 2, 3, 1, FALSE),
  (3, 3, 1, 0, FALSE),
  (4, 4, 2, 1, FALSE),
  (5, 5, 1, 0, FALSE),
  (6, 6, 2, 1, FALSE),
  (7, 7, 1, 0, FALSE),
  (8, 8, 3, 1, FALSE),
  (9, 9, 2, 0, FALSE),
  (10, 10, 1, 1, FALSE),
  (11, 11, 2, 0, FALSE),
  (12, 12, 3, 1, FALSE),
  (13, 13, 1, 0, FALSE),
  (14, 14, 2, 1, FALSE),
  (15, 15, 1, 0, FALSE),
  (16, 1, 2, 1, FALSE);


INSERT INTO orders (userNumber, cartId, productId, orderQuantity, color, size, receiveName, address, deliveryRequest, orderDate, orderStatus, changeDate)
VALUES 
  (1, 1, 1, 2, 'Red', 'M', '권구호', '서울특별시 강남구 테스트로 123', 'Fast Delivery', CURDATE(), 1, CURDATE()),
  (2, 2, 2, 3, 'Blue', 'L', '이지은', '서울특별시 강북구 테스트로 456', 'Standard Delivery', CURDATE(), 2, CURDATE()),
  (3, null, 3, 1, 'Yellow', 'XL', '김민수', '서울특별시 서초구 테스트로 789', 'Express Delivery', CURDATE(), 1, CURDATE()),
  (4, null, 4, 2, 'Black', 'S', '박지영', '서울특별시 송파구 테스트로 101', 'Fast Delivery', CURDATE(), 3, CURDATE()),
  (5, null, 5, 1, 'Green', 'M', '정민우', '서울특별시 동작구 테스트로 111', 'Standard Delivery', CURDATE(), 2, CURDATE()),
  (6, null, 6, 2, 'Orange', 'S', '김수현', '서울특별시 강동구 테스트로 222', 'Express Delivery', CURDATE(), 1, CURDATE()),
  (7, null, 7, 1, 'Pink', 'L', '이재현', '서울특별시 마포구 테스트로 333', 'Fast Delivery', CURDATE(), 2, CURDATE()),
  (8, null, 8, 3, 'White', 'XL', '박영희', '서울특별시 강서구 테스트로 444', 'Standard Delivery', CURDATE(), 1, CURDATE()),
  (9, null, 9, 2, 'Blue', 'S', '김현우', '서울특별시 영등포구 테스트로 555', 'Express Delivery', CURDATE(), 3, CURDATE()),
  (10, null, 10, 1, 'Red', 'M', '이미란', '서울특별시 구로구 테스트로 666', 'Fast Delivery', CURDATE(), 2, CURDATE()),
  (11, null, 11, 2, 'Black', 'L', '박승현', '서울특별시 동대문구 테스트로 777', 'Standard Delivery', CURDATE(), 1, CURDATE()),
  (12, null, 12, 3, 'Green', 'XL', '윤지수', '서울특별시 중랑구 테스트로 888', 'Express Delivery', CURDATE(), 2, CURDATE()),
  (13, null, 13, 1, 'Orange', 'S', '임정희', '서울특별시 강북구 테스트로 999', 'Fast Delivery', CURDATE(), 3, CURDATE()),
  (14, null, 14, 2, 'Pink', 'M', '이동욱', '서울특별시 서초구 테스트로 1010', 'Standard Delivery', CURDATE(), 1, CURDATE()),
  (15, null, 15, 1, 'White', 'L', '김수진', '서울특별시 강남구 테스트로 1111', 'Express Delivery', CURDATE(), 2, CURDATE()),
  (16, null, 1, 2, 'Red', 'M', '정재호', '서울특별시 송파구 테스트로 1212', 'Fast Delivery', CURDATE(), 1, CURDATE()),
  (17, null, 2, 3, 'Blue', 'L', '이정민', '서울특별시 마포구 테스트로 1313', 'Standard Delivery', CURDATE(), 2, CURDATE()),
  (18, null, 3, 1, 'Yellow', 'XL', '김재현', '서울특별시 강서구 테스트로 1414', 'Express Delivery', CURDATE(), 1, CURDATE()),
  (19, null, 4, 2, 'Black', 'S', '박소연', '서울특별시 동작구 테스트로 1515', 'Fast Delivery', CURDATE(), 3, CURDATE()),
  (20, null, 5, 1, 'Green', 'M', '이수진', '서울특별시 강동구 테스트로 1616', 'Standard Delivery', CURDATE(), 2, CURDATE()),
  (21, null, 6, 2, 'Orange', 'S', '김민재', '서울특별시 중랑구 테스트로 1717', 'Express Delivery', CURDATE(), 1, CURDATE()),
  (22, null, 7, 1, 'Pink', 'L', '정민지', '서울특별시 영등포구 테스트로 1818', 'Fast Delivery', CURDATE(), 2, CURDATE()),
  (23, null, 8, 3, 'White', 'XL', '김재원', '서울특별시 구로구 테스트로 1919', 'Standard Delivery', CURDATE(), 1, CURDATE()),
  (24, null, 9, 2, 'Blue', 'S', '김수민', '서울특별시 동대문구 테스트로 2020', 'Express Delivery', CURDATE(), 3, CURDATE()),
  (25, null, 10, 1, 'Red', 'M', '이지은', '서울특별시 중랑구 테스트로 2121', 'Fast Delivery', CURDATE(), 2, CURDATE()),
  (26, null, 11, 2, 'Black', 'L', '박민성', '서울특별시 서초구 테스트로 2222', 'Standard Delivery', CURDATE(), 1, CURDATE()),
  (27, null, 12, 3, 'Green', 'XL', '임다영', '서울특별시 강남구 테스트로 2323', 'Express Delivery', CURDATE(), 2, CURDATE()),
  (28, null, 13, 1, 'Orange', 'S', '정유진', '서울특별시 강북구 테스트로 2424', 'Fast Delivery', CURDATE(), 3, CURDATE()),
  (29, null, 14, 2, 'Pink', 'M', '이동훈', '서울특별시 서초구 테스트로 2525', 'Standard Delivery', CURDATE(), 1, CURDATE()),
  (30, null, 15, 1, 'White', 'L', '박민지', '서울특별시 강동구 테스트로 2626', 'Express Delivery', CURDATE(), 2, CURDATE());
  



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
  (15, 25000, 1, 1, 0),
  (16, 22000, 2, 1, 0),
  (17, 18000, 1, 1, 0),
  (18, 30000, 2, 1, 0),
  (19, 15000, 1, 1, 0),
  (20, 21000, 2, 1, 0),
  (21, 19000, 1, 1, 0),
  (22, 27000, 2, 1, 0),
  (23, 12000, 1, 1, 0),
  (24, 28000, 2, 1, 0),
  (25, 32000, 1, 1, 0),
  (26, 15000, 2, 1, 0),
  (27, 20000, 1, 1, 0),
  (28, 25000, 2, 1, 0),
  (29, 22000, 1, 1, 0),
  (30, 18000, 2, 1, 0);


INSERT INTO productout (orderId, cartId, productId, outStatus, outDate)
VALUES 
  (2, 2, 2, 1, CURDATE()),
  (3, 3, 3, 1, CURDATE()),
  (4, 4, 4, 1, CURDATE()),
  (5, 5, 5, 1, CURDATE()),
  (6, 6, 6, 1, CURDATE()),
  (7, 7, 7, 1, CURDATE()),
  (8, 8, 8, 1, CURDATE()),
  (9, 9, 9, 1, CURDATE()),
  (10, 10, 10, 1, CURDATE()),
  (11, 11, 11, 1, CURDATE()),
  (12, 12, 12, 1, CURDATE()),
  (13, 13, 13, 1, CURDATE()),
  (14, 14, 14, 1, CURDATE()),
  (15, 15, 15, 1, CURDATE());