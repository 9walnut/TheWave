import React, { useState, useEffect } from "react";
import Postcode from "@actbase/react-daum-postcode";
import Modal from "./Modal";
import * as S from "./AddressSearchStyle.js";

function AddressSearch({ getAddress }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState({
    selectAddress: "",
    postNumber: "",
    detailAddress: "",
  });

  const handleSelect = (data) => {
    const { address: selectAddress, zonecode: postNumber } = data;
    setAddress((prev) => ({
      ...prev,
      selectAddress,
      postNumber,
    }));
    setIsModalOpen(false);
  };

  const handleDetailChange = (e) => {
    setAddress((prev) => ({ ...prev, detailAddress: e.target.value }));
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      console.log("Modal was opened at", new Date().toLocaleTimeString());
    }
  }, [isModalOpen]);

  return (
    <>
      <Modal isVisible={isModalOpen} onClose={handleClose}>
        <Postcode
          style={{ width: 400, height: 400 }}
          jsOptions={{ animation: true, hideMapBtn: true }}
          onSelected={handleSelect}
        />
      </Modal>

      <S.Button onClick={handleOpenModal}>우편번호 찾기</S.Button>

      <div>
        <S.Input
          placeholder="주소"
          type="text"
          value={address.selectAddress}
          readOnly
        />
      </div>
      <div>
        <S.Input
          placeholder="우편번호"
          type="text"
          value={address.postNumber}
          readOnly
        />
      </div>
      <div>
        <S.Input
          placeholder="상세 주소"
          type="text"
          value={address.detailAddress}
          onChange={handleDetailChange}
        />
      </div>
    </>
  );
}

export default AddressSearch;
