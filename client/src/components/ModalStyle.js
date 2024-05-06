import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  overflow: auto;
`;

export const CloseButton = styled.button`
  position: relative;
  top: -275px;
  right: -40px; // 우측에서 10px 떨어진 위치
  width: 40px; // 버튼 너비 설정
  height: 40px; // 버튼 높이 설정
  border: none;
  background: white;
  border-radius: 50%; // 원형 버튼
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #e0e0e0;
  }
`;
