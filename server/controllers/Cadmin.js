const {
  db,
  db: { Op },
} = require("../models/index");

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
    const totalOrderPrices = await db.payment.sum("payPrice");
    return totalOrderPrices;
  } catch (error) {
    console.error("총 판매 금액", error);
    throw error;
  }
};

// 배송완료
const getDeliveryCompleteOrders = async () => {
  try {
    const totalDeliveryCompleteOrders = await db.productout.count({
      where: { outStatus: 3 },
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
    const totalDeliveryReadyOrders = await db.productout.count({
      where: { outStatus: 2 },
    });
    return totalDeliveryReadyOrders;
  } catch (error) {
    console.error("배송준비 수 오류", error);
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

// 품절 상품 수
const getSoldoutProducts = async () => {
  try {
    const soldoutProducts = await db.products.count({
      where: { productStatus: "판매준비중" },
    });
    return soldoutProducts;
  } catch (error) {
    console.error("품절상품 수 오류", error);
    throw error;
  }
};

// -------- 3번 대시보드------------ //
// 거래 카테고리 통계
const getCategoryCount = async () => {
  try {
    const categoryCharaterSale = await db.productout.count({
      include: [
        {
          model: db.products,
          as: "product",
          where: {
            categoryId: (
              await db.categories.findOne({
                where: { categoryName: "캐릭터" },
              })
            ).categoryId,
          },
        },
      ],
    });
    const categoryDaisySale = await db.productout.count({
      include: [
        {
          model: db.products,
          as: "product",
          where: {
            categoryId: (
              await db.categories.findOne({
                where: { categoryName: "데이지" },
              })
            ).categoryId,
          },
        },
      ],
    });
    const categoryLetteringSale = await db.productout.count({
      include: [
        {
          model: db.products,
          as: "product",
          where: {
            categoryId: (
              await db.categories.findOne({
                where: { categoryName: "레터링" },
              })
            ).categoryId,
          },
        },
      ],
    });
    const categoryMoneySale = await db.productout.count({
      include: [
        {
          model: db.products,
          as: "product",
          where: {
            categoryId: (
              await db.categories.findOne({
                where: { categoryName: "용돈" },
              })
            ).categoryId,
          },
        },
      ],
    });
    const categoryOmbreSale = await db.productout.count({
      include: [
        {
          model: db.products,
          as: "product",
          where: {
            categoryId: (
              await db.categories.findOne({
                where: { categoryName: "옴브레" },
              })
            ).categoryId,
          },
        },
      ],
    });
    const categoryRoseSale = await db.productout.count({
      include: [
        {
          model: db.products,
          as: "product",
          where: {
            categoryId: (
              await db.categories.findOne({
                where: { categoryName: "장미" },
              })
            ).categoryId,
          },
        },
      ],
    });
    const categoryTulipSale = await db.productout.count({
      include: [
        {
          model: db.products,
          as: "product",
          where: {
            categoryId: (
              await db.categories.findOne({
                where: { categoryName: "튤립" },
              })
            ).categoryId,
          },
        },
      ],
    });

    return {
      categoryCharaterSale,
      categoryDaisySale,
      categoryLetteringSale,
      categoryMoneySale,
      categoryOmbreSale,
      categoryRoseSale,
      categoryTulipSale,
    };
  } catch (error) {
    console.error("카테고리별 상품 판매 수량 오류", error);
    throw error;
  }
};

// 4번 대시보드
// 일자별 판매량
const getDailyOutStatus = async () => {
  try {
    // outStatus가 3인 데이터를 outDate 별로 그룹화
    const result = await db.productout.findAll({
      where: { outStatus: 3 },
      attributes: [
        "outDate",
        [db.Sequelize.fn("count", db.Sequelize.col("outDate")), "count"],
      ],
      group: ["outDate"],
      order: [["outDate", "DESC"]],
    });

    return result;
  } catch (error) {
    console.error(error);
    res.status(500).send("데이터 조회 오류");
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
    const soldoutProducts = await getSoldoutProducts();
    const categoryCount = await getCategoryCount();
    const dailyOutStatus = await getDailyOutStatus();
    res.send({
      totalOrders,
      totalOrderPrices,
      deliveryCompleteOrders,
      deliveryReadyOrders,
      totalProducts,
      soldoutProducts,
      categoryCount,
      dailyOutStatus,
    });
  } catch (error) {
    res.status(500).send("관리페이지 오류");
  }
};
