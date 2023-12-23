import { useState } from "react";
import Postcode from "@actbase/react-daum-postcode";
import Modal from "./Modal";

function AddressSearch() {
  const [isModal, setModal] = useState(false);
  const [selectAddress, setAddress] = useState("");
  const [postNumber, setPostNumber] = useState("");
  const [detailAddress, setdetailAd] = useState("");

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

      <button onClick={() => setModal(true)}>주소 찾기</button>

      {/* 서버 요청 시 전달해야 하는 데이터 */}
      <div>
        주소 <input type="text" value={selectAddress} readOnly />
      </div>
      <div>
        우편번호 <input type="text" value={postNumber} readOnly />
      </div>
      <div>
        상세 주소
        <input
          type="text"
          value={detailAddress}
          onChange={(e) => setdetailAd(e.target.value)}
          required
        />
      </div>
    </>
  );
}

export default AddressSearch;
