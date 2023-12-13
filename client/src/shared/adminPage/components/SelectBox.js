function SelectBox() {
  return (
    <>
      <select name="aaaa">
        <option value="releaseStatus" disabled defaultValue>
          출고 상태 변경
        </option>
        <option value="payWait">결제 대기</option>
        <option value="deliveryStart">출고</option>
        <option value="cancel">취소</option>
      </select>
    </>
  );
}

export default SelectBox;
