import ListItem from "../../shared/adminPage/components/ListItem";

function CurrentProductStatus() {
  return (
    <>
      <h3>현재 상품 현황</h3>
      <ListItem
        icon="/adminPage/dashBoard/itemAll.svg"
        arrow="/adminPage/sidebar/none.svg"
      >
        총 상품 수
      </ListItem>
      <ListItem
        icon="/adminPage/dashBoard/itemNo.svg"
        arrow="/adminPage/sidebar/none.svg"
      >
        품절 상품 수
      </ListItem>
    </>
  );
}

export default CurrentProductStatus;
