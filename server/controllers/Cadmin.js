const { db } = require("../models/index");

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
    const { productID } = req.params;
    const product = await db.products.findOne({
      where: { productID },
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
    const { productID } = req.params;
    const { productName, productPrice, productInfo, productStatus } = req.body;
    const editProduct = await db.products.update(
      {
        productName,
        productPrice,
        productInfo,
        productStatus,
      },
      { where: { productID } }
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
    const { productID } = req.params;
    const isDeleted = await db.products.destroy({ where: { productID } });
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
    const { orderID } = req.params;
    const { deliveryStatus } = req.body;
    const updatedOrder = await db.orderdetails.update(
      { deliveryStatus },
      { where: { orderID } }
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
    const { orderID } = req.params;
    const isDeleted = await db.products.destroy({ where: { orderID } });
    console.log(isDeleted);
    if (isDeleted) return res.send(true);
    else return res.send(false);
  } catch (error) {
    console.error(error);
    res.status(500).send("거래 취소 오류");
  }
};
