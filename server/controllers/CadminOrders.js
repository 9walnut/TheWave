const {
  db,
  db: { Op },
} = require("../models/index");

// 전체 주문 현황 조회
exports.getAdminAllOrders = async (req, res) => {
  try {
    const orderdDetail = await db.orders.findAll({
      include: [
        {
          model: db.users,
          as: "userNumber_user",
          attributes: ["userName", "phoneNumber"],
          include: [
            {
              model: db.address,
              as: "addresses",
              attributes: ["address"],
            },
          ],
        },
        {
          model: db.products,
          as: "product",
          attributes: ["productName"],
        },
      ],
    });
    return res.send(orderdDetail);
  } catch (error) {
    console.error(error);
    res.status(500).send("전체 주문 현황 오류");
  }
};

// 주문 상세 조회
exports.getAdminOrder = async (req, res) => {
  console.log(req.params);
  try {
    const { orderId } = req.params;
    const order = await db.orders.findOne({
      where: { orderId },
      include: [
        {
          model: db.users,
          as: "userNumber_user",
          attributes: ["userName", "phoneNumber"],
          include: [
            {
              model: db.address,
              as: "addresses",
              attributes: ["address"],
            },
          ],
        },
        {
          model: db.products,
          as: "product",
          attributes: ["productName"],
        },
      ],
    });
    return res.send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("등록 상품 상세 조회 오류");
  }
};

// 출고 상태 변경
// 상품 출고 상태 변경
exports.updateOutStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    let { outStatus } = req.body;

    const productOut = await db.productout.findByPk(orderId);
    if (!productOut) {
      return res.status(404).send("상품 출고 오류");
    }

    let updateData = { outStatus };

    if (outStatus === "출고") {
      updateData.outDate = new Date();
    }

    const updatedProductOut = await productOut.update(outStatus);

    res.send(updatedProductOut);
  } catch (error) {
    console.error(error);
    res.status(500).send("상품 출고 상태 변경 오류");
  }
};
