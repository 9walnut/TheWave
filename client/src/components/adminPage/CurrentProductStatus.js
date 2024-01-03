import ListItem from "../../shared/adminPage/components/ListItem";

function CurrentProductStatus({ totalProducts, soldoutProducts }) {
  // console.log(totalProducts);
  return (
    <>
      <h3>현재 상품 현황</h3>
      <ListItem
        icon="/adminPage/dashBoard/itemAll.svg"
        arrow="/adminPage/sidebar/none.svg"
      >
        총 상품 수 (전체 등록 상품 수) {totalProducts}
      </ListItem>
      <ListItem
        icon="/adminPage/dashBoard/itemNo.svg"
        arrow="/adminPage/sidebar/none.svg"
      >
        품절 상품 수 {soldoutProducts}
      </ListItem>
    </>
  );
}

export default CurrentProductStatus;
