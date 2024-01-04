import React from "react";
import PropTypes from "prop-types";
import * as S from "./ModalStyle.js";

// 그 어떤 디자인도 없는 그저 모달입니다. 얼마든지 수정 삭제 부탁드립니다!

const Modal = ({ isVisible, children }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <S.ModalWrapper>
      <S.ModalContent>{children}</S.ModalContent>
    </S.ModalWrapper>
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
