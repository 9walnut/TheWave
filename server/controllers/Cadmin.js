const { db } = require("../models/index");

// 대시보드 내 현황 가져오기
// -------- 1번 대시보드------------ //
// 총 주문수
const getTotalOrders = async () => {
  try {
    const totalOrders = await db.orders.count();
    return totalOrders;
  } catch (error) {
    console.error("총 주문 수 오류", error);
    throw error;
  }
};

// 총 판매 금액
const getTotalOrderPrices = async () => {
  try {
    const totalOrderPrices = await db.orders.sum("totalPrice");
    return totalOrderPrices;
  } catch (error) {
    console.error("총 판매 금액", error);
    throw error;
  }
};

// 배송완료
const getDeliveryCompleteOrders = async () => {
  try {
    const totalDeliveryCompleteOrders = await db.orders.count({
      where: { deliveryStatus: "배송완료" },
    });
    return totalDeliveryCompleteOrders;
  } catch (error) {
    console.error("배송완료 주문 수 오류", error);
    throw error;
  }
};

// 배송 준비 중
const getDeliveryReadyOrders = async () => {
  try {
    const totalDeliveryReadyOrders = await db.orders.count({
      where: { deliveryStatus: "배송준비중" },
    });
    return totalDeliveryReadyOrders;
  } catch (error) {
    console.error("배송완료 주문 수 오류", error);
    throw error;
  }
};

// -------- 2번 대시보드------------ //
// 전체 등록 상품 수
const getTotalProducts = async () => {
  try {
    const totalProducts = await db.products.count();
    return totalProducts;
  } catch (error) {
    console.error("총 주문 수 오류", error);
    throw error;
  }
};

// -------- 3번 대시보드------------ //
// 거래 카테고리 통계
const getCategoryCount = async () => {
  try {
    const categoryCustom = await db.categories.count({
      where: { categoryName: "커스텀풍선" },
    });
    const categoryMoney = await db.categories.count({
      where: { categoryName: "용돈풍선" },
    });
    const categoryBridal = await db.categories.count({
      where: { categoryName: "브라이덜샤워" },
    });
    const categoryBirth = await db.categories.count({
      where: { categoryName: "생일용품" },
    });
    return categoryCustom, categoryMoney, categoryBridal, categoryBirth;
  } catch (error) {
    console.error("배송완료 주문 수 오류", error);
    throw error;
  }
};

// 관리 페이지 렌더링
exports.getAdminMain = async (req, res) => {
  try {
    const totalOrders = await getTotalOrders();
    const totalOrderPrices = await getTotalOrderPrices();
    const deliveryCompleteOrders = await getDeliveryCompleteOrders();
    const deliveryReadyOrders = await getDeliveryReadyOrders();
    const totalProducts = await getTotalProducts();
    const categoryCount = await getCategoryCount();
    res.send(
      totalOrders,
      totalOrderPrices,
      deliveryCompleteOrders,
      deliveryReadyOrders,
      totalProducts,
      categoryCount
    );
  } catch (error) {
    res.status(500).send("관리페이지 오류");
  }
};

// 회원 조회
exports.getAdminUsers = async (req, res) => {
  try {
    const users = await db.users.findAll();
    return res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("관리자 회원 조회 오류");
  }
};

// 회원 삭제
exports.deleteAdminUsers = async (req, res) => {
  try {
    const { userNumber } = req.params;
    const isDeleted = await db.users.destroy({
      where: userNumber,
    });
    if (isDeleted) return res.send(true);
    else return res.send(false);
  } catch (error) {
    console.error(error);
    res.status(500).send("회원 삭제 오류");
  }
};

// 상품 등록
exports.createAdminProduct = async (req, res) => {
  try {
    const { productName, productPrice, productInfo, productStatus } = req.body;
    const productImages = req.files.map((file) => file.location); // 이미지 URL 배열

    const newProduct = await db.products.create({
      productName,
      productPrice,
      productInfo,
      productStatus,
      productImages,
    });

    res.send(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("상품 등록 오류");
  }
};
// 전체 등록상품 조회
exports.getAdminAllProducts = async (req, res) => {
  try {
    console.log(req.params);
    const products = await db.products.findAll({
      include: [
        {
          model: db.categories,
          attributes: ["categoryName"],
        },
      ],
    });
    return res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("전체 등록 상품 조회 오류");
  }
};

// 등록상품 상세 조회
exports.getAdminProduct = async (req, res) => {
  console.log(req.params);
  try {
    const { productId } = req.params;
    const product = await db.products.findOne({
      where: { productId },
      include: [{ model: db.categories, attributes: ["categoryName"] }],
    });
    return res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("등록 상품 상세 조회 오류");
  }
};

// 상품 수정
exports.editAdminProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { productId } = req.params;
    const { productName, productPrice, productInfo, productStatus } = req.body;
    const editProduct = await db.products.update(
      {
        productName,
        productPrice,
        productInfo,
        productStatus,
      },
      { where: { productId } }
    );
    return res.send(editProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("상품 수정 오류");
  }
};

// 등록 상품 삭제
exports.deleteAdminProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { productId } = req.params;
    const isDeleted = await db.products.destroy({ where: { productId } });
    console.log(isDeleted);
    if (isDeleted) return res.send(true);
    else return res.send(false);
  } catch (error) {
    console.error(error);
    res.status(500).send("등록 상품 삭제 오류");
  }
};

// 전체 주문 현황 조회
exports.getAdminAllOrders = async (req, res) => {
  try {
    console.log(req.params);
    const orders = await db.orders.findAll({
      include: [
        {
          model: db.orderdetails,
          attributes: ["productCount", "deliveryStatus"],
        },
      ],
    });
    return res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("등록 상품 삭제 오류");
  }
};

// 주문 상세 조회
exports.getAdminOrder = async (req, res) => {
  console.log(req.params);
  try {
    const { orderID } = req.params;
    const order = await db.products.findOne({
      where: { orderID },
      include: [
        {
          model: db.orderdetails,
          attributes: ["productCount", "deliveryStatus"],
        },
        {
          model: db.address,
          attributes: ["address"],
        },
      ],
    });
    return res.send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("등록 상품 상세 조회 오류");
  }
};

// 배송 상태 변경
exports.editDeliveryStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { deliveryStatus } = req.body;
    const updatedOrder = await db.orderdetails.update(
      { deliveryStatus },
      { where: { orderId } }
    );
    return res.send(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send("등록 상품 상세 조회 오류");
  }
};

// 거래 취소 - 삭제
exports.deleteAdminOrder = async (req, res) => {
  try {
    console.log(req.body);
    const { orderId } = req.params;
    const isDeleted = await db.products.destroy({ where: { orderId } });
    console.log(isDeleted);
    if (isDeleted) return res.send(true);
    else return res.send(false);
  } catch (error) {
    console.error(error);
    res.status(500).send("거래 취소 오류");
  }
};
