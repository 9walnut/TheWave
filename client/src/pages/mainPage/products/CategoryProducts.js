import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as S from "../../../styles/mainPage/CategoryProducts.style";
import axios from "axios";

function CategoryProducts() {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const { categoryId } = useParams();

  console.log("카테고리 아이디", categoryId);

  const getCategoryProduct = async () => {
    try {
      const res = await axios.get(`/api/category/${categoryId}`);
      console.log("카테고리", res.data[0].categoryName);
      console.log("상품들", res.data[0].products);
      setCategoryName(res.data[0].categoryName);
      setProducts(res.data[0].products);
    } catch (error) {
      console.log("카테고리 불러오기 에러", error);
    }
  };

  useEffect(() => {
    getCategoryProduct();
  }, [categoryId]);

  return (
    <>
      <S.CategoryTitle>{categoryName} 풍선</S.CategoryTitle>
      <S.ProductContentBox>
        {products.map((product) => {
          return (
            <S.CardItemBox>
              <Link to={`/products/${product.productId}`}>
                <div>
                  <img src={product.thumbnailUrl} />
                </div>
                <div>
                  <ul>
                    <li>{product.productName}</li>
                    <li>{product.productInfo}</li>
                    <li>{product.productPrice}원</li>
                  </ul>
                </div>
              </Link>
            </S.CardItemBox>
          );
        })}
      </S.ProductContentBox>
    </>
  );
}

export default CategoryProducts;
