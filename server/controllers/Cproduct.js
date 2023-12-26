const { db } = require("../models/index");
const { decodeToken } = require("../middleware/jwt");

// 특정 상품 상세 페이지
exports.productPage = async (req, res) => {
  try {
    const productDetail = await db.products.findOne({
      where: { productId: req.params.productId },
    });
    res.json(productDetail);
  } catch (error) {
    console.error(err);
    res.status(500).send("상품 상세 페이지 오류");
  }
};

// exports.wish = async (req, res) => {
//   try {

//   }
// }

// '장바구니 담기' 클릭
exports.cartIn = async (req, res) => {
  try {
    const { guestId, cartQuantity } = req.body;
    const productId = req.params.productId;
    const accessToken = req.headers["authorization"];
    const tokenCheck = decodeToken(accessToken);
    const userNumber = tokenCheck.userNumber;

    let userIdForCart;

    // 비회원인 상태로 장바구니 담을 경우
    if (guestId) {
      userIdForCart = guestId;
    } else if (userNumber) {
      // 로그인한 회원일 경우
      userIdForCart = userNumber;
    } else {
      res.send({ result: "notMember" });
      return;
    }

    const cartIn = await db.carts.create({
      productId: productId,
      userNumber: userIdForCart,
      cartQuantity: cartQuantity,
    });
    if (cartIn) res.send({ result: true });
    else res.send({ result: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("장바구니 담기 오류");
  }
};

// 장바구니 > 비회원
// exports.noMemberCartIn = async (req, res) => {
//   try {
//     // 타임스탬프로 비회원 번호 생성
//     function randomGuestId() {
//       const timestamp = Date.now();
//       const guestId = "guest_" + timestamp;
//       return guestId;
//     }

//     localStorage.setItem("guest", randomGuestId()); // 비회원 번호를 로컬 스토리지에 저장..?

//     const guest = localStorage.getItem("guest");
//     console.log("비회원 번호", guest);

//     const productId = req.params.productId;
//     const cartQuantity = req.body.cartQuantity;

//     const cartIn = await db.carts.create({
//       productId: productId,
//       userNumber: guest,
//       cartQuantity: cartQuantity,
//     });

//     if (cartIn) res.send({ result: true });
//     else res.send({ result: false });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("비회원 장바구니 담기 오류");
//   }
// };
