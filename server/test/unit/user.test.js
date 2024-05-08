const { loginUser } = require("../../controllers/Cauth");
const db = require("../../models/index");
const { comparePw, generateAccessToken } = require("../../middleware/jwt");

jest.mock("../../models/index.js");
jest.mock("../../middleware/pw.js");
jest.mock("../../middleware/jwt.js");

describe("UserController", () => {
  describe("loginUser", () => {
    it("should authenticate and return user data with access token if credentials are correct", async () => {
      // 모의 데이터 설정
      const req = {
        body: {
          userId: "testUser",
          password: "password123",
          cart: [],
        },
      };
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      // Mock 함수들의 동작 정의
      comparePw.mockResolvedValue(true);
      db.users.findOne.mockResolvedValue({
        userId: "testUser",
        isAdmin: "N",
        userNumber: 1,
      });
      generateAccessToken.mockResolvedValue({ accessToken: "fakeToken" });

      // 함수 실행
      await loginUser(req, res);

      // 예상되는 결과 확인
      expect(res.send).toHaveBeenCalledWith({
        result: true,
        isAdmin: false,
        accessToken: "fakeToken",
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = { body: { userId: "testUser", password: "password123" } };
      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      // 에러를 발생시키기 위해 Mock 함수 설정
      comparePw.mockRejectedValue(new Error("Fake error"));

      // 함수 실행
      await loginUser(req, res);

      // 상태 코드와 메시지 검증
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("로그인 오류");
    });
  });
});
