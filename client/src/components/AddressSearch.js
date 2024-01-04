import { useState } from "react";
import Postcode from "@actbase/react-daum-postcode";
import Modal from "./Modal";
import * as S from "./AddressSearchStyle.js";

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

      <S.Button onClick={() => setModal(true)}>주소 찾기</S.Button>

      {/* 서버 요청 시 전달해야 하는 데이터 */}
      <div>
        {/* 주소 */}
        <S.Input
          placeholder="주소"
          type="text"
          value={selectAddress}
          readOnly
        />
      </div>
      <div>
        {/* 우편번호  */}
        <S.Input
          placeholder="우편번호"
          type="text"
          value={postNumber}
          readOnly
        />
      </div>
      <div>
        {/* 상세 주소 */}
        <S.Input
          placeholder="상세 주소"
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
