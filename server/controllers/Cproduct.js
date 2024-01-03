const { db } = require("../models/index");
const { verifyToken } = require("../middleware/jwt");

// 특정 상품 상세 페이지
exports.productPage = async (req, res) => {
  try {
    const productDetail = await db.products.findOne({
      where: { productId: req.params.productId },
    });

    const categoryName = await db.categories.findOne({
      where: { categoryId: productDetail.categoryId },
      attributes: ["categoryName"],
    });

    res.json({ productDetail, categoryName });
    console.log(categoryName);
  } catch (error) {
    console.error(error);
    res.status(500).send("상품 상세 페이지 오류");
  }
};

// 찜하기
exports.wish = async (req, res) => {
  const accessToken = req.headers["authorization"]; // 헤더에서 access 토큰값 받아오기
  const tokenCheck = await verifyToken(accessToken);

  try {
    const checkWishList = await db.wishlist.findOne({
      where: { productId: req.params.productId },
    });

    console.log("checkWishList 결과", checkWishList);

    if (!checkWishList) {
      const wishListIn = await db.wishlist.create({
        productId: req.params.productId,
        userNumber: tokenCheck.userData.userNumber,
      });

      if (wishListIn) res.send({ result: true });
      else res.send({ result: false });
    } else res.send({ result: "동일 상품 존재" });
  } catch (error) {
    console.error(error);
    res.status(500).send("찜하기 오류");
  }
};

// '장바구니 담기' 클릭
exports.cartIn = async (req, res) => {
  const { cartQuantity } = req.body;
  const productId = req.params.productId;
  const accessToken = req.headers["authorization"];

  try {
    if (accessToken === "Bearer null") {
      return res.send({ result: "guest" }); // 토큰값 없음(==비회원)
    } else {
      const tokenCheck = await verifyToken(accessToken);
      const userNumber = tokenCheck.userData.userNumber;

      // 이미 장바구니에 담긴 상품 있는지 확인
      const sameProduct = await db.carts.findOne({
        where: { userNumber: userNumber, productId: productId },
        attributes: ["cartQuantity"],
      });

      if (sameProduct) {
        const cartIn = await db.carts.update(
          {
            cartQuantity: (sameProduct.cartQuantity += Number(cartQuantity)),
          },
          {
            where: { userNumber: userNumber, productId: productId },
          }
        );
        res.json({ result: true, cart: cartIn });
      } else {
        const cartIn = await db.carts.create({
          productId: productId,
          userNumber: userNumber,
          cartQuantity: cartQuantity,
          isChecked: "0",
        });
        res.json({ result: true, cart: cartIn });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("장바구니 담기 오류");
  }
};
