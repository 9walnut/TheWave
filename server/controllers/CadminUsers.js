const {
  db,
  db: { Op },
} = require("../models/index");

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
    const userNumbers = req.body.userNumber;
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
