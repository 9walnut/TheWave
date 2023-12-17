import styled from "styled-components";
const Productbox = styled.div`
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid black;
  input {
    margin-right: 20px;
  }
`;

const ImgBox = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;

  img {
    width: 100%;
    height: 100%;
  }
`;

function CartProduct() {
  return (
    <>
      <li>
        <Productbox>
          <input type="checkbox" />
          <ImgBox>
            <img src="/csp1.jpg" />
          </ImgBox>
        </Productbox>
      </li>
    </>
  );
}

export default CartProduct;
