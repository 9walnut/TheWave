const { db } = require("./index");

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
    console.log(req.body);
    const { productName, productPrice, productInfo, productStatus } = req.body;
    const newProduct = await db.products.create({
      productName,
      productPrice,
      productInfo,
      productStatus,
    });
    return res.send(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("회원 삭제 오류");
  }
};

// 전체 등록상품 조회
exports.getAdminAllProducts = async (req, res) => {
  const products = await db.products.findAll();
  return res.send(products);
};

// 등록상품 상세 조회
exports.getAdminProduct = async (req, res) => {
  const product = await db.products.findOne({
    where: { productID: req.params.productID },
  });
  return res.send(true);
};

// 상품 수정
exports.editAdminProduct = async (req, res) => {
  const updatedProduct = await db.products.update(req.body, {
    result: true,
    where: { productID: req.params.productID },
  });
  return res.send(updatedProduct);
};

// 등록 상품 삭제
exports.deleteAdminProduct = async (req, res) => {
  const result = await db.products.destroy({
    where: { productID: req.params.productID },
  });
  return res.send(true);
};

// 전체 주문 현황 조회
exports.getAdminAllOrders = async (req, res) => {
  const orders = await db.orders.findAll();
  return res.send(orders);
};

// 주문 상세 조회
exports.getAdminOrder = async (req, res) => {};
// 배송 상태 변경
exports.editDeliveryStatus = async (req, res) => {
  const updatedOrder = await db.orderdetails.update(
    { deliveryStatus: req.body.deliveryStatus },
    { result: true, where: { orderID: req.params.orderID } }
  );
  return res.send(updatedOrder);
};

// 거래 취소
