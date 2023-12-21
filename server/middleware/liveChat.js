const path = require("path");

const liveChat = (io) => {
  io.on("connection", (socket) => {
    console.log("socket id", socket.id);

    // 새 문의하기
    socket.on("entry", (res) => {
      io.emit("notice", { msg: "안녕하세요 더웨이브입니다." });
      socket.emit("entrySuccess", {});
    });

    // 메세지 보내기
    socket.on("sendMsg", (res) => {
      io.emit("chat", {});
    });

    // 닫기 버튼
    socket.on("disconnect", () => {
      io.emit("notice", { msg: `님이 퇴장하셨습니다.` });
    });
  });
};

module.exports = { liveChat };
