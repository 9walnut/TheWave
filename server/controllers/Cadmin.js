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
      where: { outStatus: "배송완료" },
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
      where: { outStatus: "배송준비중" },
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
    const users = await db.users.findAll({
      include: [
        {
          model: db.address,
          as: "addresses",
          required: false,
        },
      ],
    });
    return res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("관리자 회원 조회 오류");
  }
};

// 회원 삭제 - 체크박스
// 체크박스로 구현해서 body로 요청
exports.deleteAdminUsers = async (req, res) => {
  try {
    const userNumbers = req.body.userNumber; // 클라이언트로부터 받은 userNumber 리스트
    const isDeleted = await db.users.destroy({
      where: { userNumber: { [Op.in]: userNumbers } },
    });
    if (isDeleted) return res.status(200).json({ message: "회원 삭제 성공" });
    else return res.status(404).json({ message: "회원을 찾을 수 없음" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "회원 삭제 오류" });
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
          as: "category",
          attributes: ["categoryname"],
        },
      ],
    });
    return res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("전체 등록 상품 조회 오류");
  }
};

// 등록상품 삭제 - 체크 박스
exports.deleteAdminProductsChecked = async (req, res) => {
  try {
    const productIds = req.body.productId;
    const isDeleted = await db.products.update(
      { isDeleted: true },
      {
        where: { productId: { [Op.in]: productIds } },
      }
    );

    if (isDeleted[0] > 0) return res.send(true);
    else return res.send(false);
  } catch (error) {
    console.error(error);
    res.status(500).send("등록 상품 삭제 오류");
  }
};

// 상품 등록
exports.createAdminProduct = async (req, res) => {
  console.log(req.body);
  try {
    const {
      categoryName,
      productName,
      productPrice,
      productInfo,
      productStatus,
      thumbnailUrl,
      detailUrls,
    } = req.body;
    // 카테고리 이름으로 categoryId 찾기
    const category = await db.categories.findOne({ where: { categoryName } });
    if (!category) {
      return res.status(400).send("Invalid categoryName");
    }

    const categoryId = category.categoryId;

    const newProduct = await db.products.create({
      categoryId,
      productName,
      productPrice,
      productInfo,
      productStatus,
      thumbnailUrl,
      detailUrls,
    });

    res.send(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("상품 등록 오류");
  }
};

// 사진 등록 - 썸네일
exports.uploadThumbnail = async (req, res) => {
  try {
    const thumbnailUrl = req.file.location;
    res.send({ thumbnailUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("썸네일 등록 오류");
  }
};

// 사진 등록 - 상세 사진
exports.uploadDetails = async (req, res) => {
  try {
    const detailUrls = req.files.map((file) => file.location);
    res.send({ detailUrls });
  } catch (error) {
    console.error(error);
    res.status(500).send("상세 사진 등록 오류");
  }
};

// 등록상품 상세 조회
exports.getAdminProduct = async (req, res) => {
  console.log(req.params);
  try {
    const { productId } = req.params;
    const product = await db.products.findOne({
      where: { productId },
      include: [
        { model: db.categories, as: "category", attributes: ["categoryName"] },
      ],
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
    const { productId } = req.params;
    console.log(req.body);
    const {
      categoryName,
      productName,
      productPrice,
      productInfo,
      productStatus,
      thumbnailUrl,
      detailUrls,
    } = req.body;

    const category = await db.categories.findOne({ where: { categoryName } });
    if (!category) {
      return res.status(400).send("Invalid categoryName");
    }

    const categoryId = category.categoryId;

    const product = await db.products.findByPk(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const updatedProduct = await product.update({
      categoryId,
      productName,
      productPrice,
      productInfo,
      productStatus,
      thumbnailUrl,
      detailUrls,
    });

    res.send(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("상품 수정 오류");
  }
};

// 썸네일 사진 수정
exports.uploadThumbnail = async (req, res) => {
  try {
    const thumbnailUrl = req.file.location;
    res.send({ thumbnailUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("썸네일 수정 오류");
  }
};

// 상세 사진 수정
exports.uploadDetails = async (req, res) => {
  try {
    const detailUrls = req.files.map((file) => file.location);
    res.send({ detailUrls });
  } catch (error) {
    console.error(error);
    res.status(500).send("상세 사진 수정 오류");
  }
};

// 등록 상품 삭제
exports.deleteAdminProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const isDeleted = await db.products.update(
      { isDeleted: true },
      { where: { productId } }
    );

    if (isDeleted[0] > 0) return res.send(true);
    else return res.send(false);
  } catch (error) {
    console.error(error);
    res.status(500).send("등록 상품 삭제 오류");
  }
};

// 전체 주문 현황 조회
exports.getAdminAllOrders = async (req, res) => {
  try {
    const orderdDetail = await db.orders.findAll({
      include: [
        {
          model: db.users,
          as: "userNumber_user",
          attributes: ["userName"],
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
          attributes: ["userName"],
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
      return res.status(404).send("ProductOut not found");
    }

    if (outStatus === "출고") {
      outStatus = {
        outStatus,
        outDate: new Date(),
      };
    }

    const updatedProductOut = await productOut.update(outStatus);

    res.send(updatedProductOut);
  } catch (error) {
    console.error(error);
    res.status(500).send("상품 출고 상태 변경 오류");
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
