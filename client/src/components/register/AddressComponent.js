import { useState, useEffect } from "react";
import Postcode from "@actbase/react-daum-postcode";
import Modal from "../Modal";
import styled from "styled-components";

function AddressComponent({ getAddress, userAddress }) {
  const [isModal, setModal] = useState(false);
  const [selectAddress, setAddress] = useState("");
  const [postNumber, setPostNumber] = useState("");
  const [detailAddress, setdetailAd] = useState("");

  useEffect(() => {
    if (userAddress) {
      setAddress(userAddress[0]);
      setPostNumber(userAddress[1]);
      setdetailAd(userAddress[2]);
    }
  }, [userAddress]);

  const handleAddressChange = (addressData) => {
    getAddress(addressData);
  };

  useEffect(() => {
    const addressData = { selectAddress, postNumber, detailAddress };
    getAddress(addressData);
  }, [selectAddress, postNumber, detailAddress, getAddress]);

  return (
    <>
      <Modal isVisible={isModal}>
        <Postcode
          style={{ width: 400, height: 400 }}
          jsOptions={{ animation: true, hideMapBtn: true }}
          onSelected={(addressData) => {
            console.log(addressData);
            setAddress(addressData.address);
            setPostNumber(addressData.zonecode);
            setModal(false);
          }}
        />
      </Modal>
      <br />
      <Button onClick={() => setModal(true)}>우편번호 찾기</Button>

      {/* 서버 요청 시 전달해야 하는 데이터 */}

      <Input placeholder="주소" type="text" value={selectAddress} readOnly />

      {/* 우편번호  */}
      <Input placeholder="우편번호" type="text" value={postNumber} readOnly />

      {/* 상세 주소 */}
      <Input
        placeholder="상세 주소"
        type="text"
        value={detailAddress}
        onChange={(e) => setdetailAd(e.target.value)}
      />

      {handleAddressChange({ selectAddress, postNumber, detailAddress })}
    </>
  );
}

const Input = styled.input`
  margin-top: 8px;
  width: 100%;
  height: 45px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
`;

const Button = styled.button`
  width: 100%;
  height: 45px;
  border: none;
  font-weight: 900;
  cursor: pointer;
`;

export default AddressComponent;
