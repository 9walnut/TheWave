function SelectBox() {
  return (
    <>
      <h3>얘 어케넣을까</h3>
      <select name="aaaa">
        <option value="ddd" disabled selected>
          출고 상태 변경
        </option>
        <option value="payWait">결제 대기</option>
        <option value="go">출고</option>
        <option value="cal">취소</option>
      </select>
    </>
  );
}

export default SelectBox;
