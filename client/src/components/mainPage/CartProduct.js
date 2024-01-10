import styled from "styled-components";
const Productbox = styled.div`
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  input {
    margin-right: 20px;
  }
`;

const ImgBox = styled.div`
  width: 100px;
  height: 100px;

  border: 1px solid #ddd;

  img {
    width: 100%;
    height: 100%;
  }
`;

function CartProduct({ product }) {
  console.log("장바구니다", product);
  return (
    <>
      <li key={product.cartId}>
        <Productbox>
          <input type="checkbox" />
          <ImgBox>
            <img src={product.product.thumbnailUrl} />
          </ImgBox>
        </Productbox>
      </li>
    </>
  );
}

export default CartProduct;
