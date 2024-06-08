import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { products } from "../../utils/products";
import { useCartStore } from "../../hooks/useCartStore";
import { toast } from "react-toastify";

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
  padding-bottom: 1rem;
  min-height: calc(100vh - 80px - 150px);
`;

const InnerContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;

  h3 {
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #666;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductImage = styled.img`
  max-width: 300px;
  width: 100%;
  min-height: 300px;
  border-radius: 5px;
  object-fit: cover;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const RightContainer = styled.div`
  flex: 1;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const HeaderRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  justify-content: space-between;
`;

const FooterRightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Price = styled.div`
  color: #3572ef;
  font-size: 1.4rem;
  font-weight: bold;
`;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useMemo(() => products[parseInt(id as string) - 1], [id]);
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = useCartStore((state) => state.addToCart);

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <h2>Product Detail</h2>
      <InnerContainer>
        <LeftContainer>
          <ProductImage src={`/${product.image}`} alt={product.name} />
        </LeftContainer>
        <RightContainer>
          <HeaderRightContainer>
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
            <Price>{formattedPrice(product.price)}</Price>
          </HeaderRightContainer>
          <FooterRightContainer>
            <div
              className="mp"
              onClick={() =>
                setQuantity((prev) => {
                  return prev > 1 ? (prev -= 1) : prev;
                })
              }
            >
              -
            </div>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <div
              className="mp"
              onClick={() => setQuantity((prev) => (prev += 1))}
            >
              +
            </div>
            <button
              onClick={() => {
                addToCart(product, quantity);
                toast.success("Product added to cart successfully");
              }}
            >
              Add to Cart
            </button>
          </FooterRightContainer>
        </RightContainer>
      </InnerContainer>
    </Container>
  );
};

export default ProductDetail;
