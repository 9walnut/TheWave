import { useState } from "react";
import "./ProductCard.css";

function ProductCard() {
  const prList = [
    {
      productId: 1,
      productImg: "csp1.jpg",
      productName: "풍선 1",
      productPrice: 10000,
      productInfo: "풍선입니다",
    },
    {
      productId: 2,
      productImg: "csp2.jpg",
      productName: "풍선 2",
      productPrice: 10000,
      productInfo: "풍선입니다",
    },
    {
      productId: 3,
      productImg: "csp3.jpg",
      productName: "풍선 3",
      productPrice: 10000,
      productInfo: "풍선입니다",
    },
    {
      productId: 4,
      productImg: "csp4.jpg",
      productName: "풍선 4",
      productPrice: 10000,
      productInfo: "풍선입니다",
    },
    {
      productId: 5,
      productImg: "csp5.jpg",
      productName: "풍선 5",
      productPrice: 10000,
      productInfo: "풍선입니다",
    },
    {
      productId: 6,
      productImg: "csp6.jpg",
      productName: "풍선 6",
      productPrice: 10000,
      productInfo: "풍선입니다",
    },
  ];

  const [productList, setProductList] = useState(prList);

  return (
    <>
      <div className="productCardBox">
        {productList.map((value) => {
          return (
            <div key={value.productId} className="cardItemBox">
              <div>
                <img src={value.productImg} />
              </div>
              <div>
                <ul>
                  <li>{value.productName}</li>
                  <li>{value.productInfo}</li>
                  <li>{value.productPrice}원</li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProductCard;
