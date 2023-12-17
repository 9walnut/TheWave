import { Link } from "react-router-dom";
import { useState } from "react";
import prList from "../../assets/product";
import "./ProductCard.css";

function ProductCard() {
  const [productList, setProductList] = useState(prList);

  return (
    <>
      <div className="productCardBox">
        {productList.map((value) => {
          return (
            <div key={value.productId} className="cardItemBox">
              <Link to={"/products"}>
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
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProductCard;
