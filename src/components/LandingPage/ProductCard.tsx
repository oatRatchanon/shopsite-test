import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const Container = styled.div`
  background-color: #fff;

  &:hover {
    transition: box-shadow 0.2s ease;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    outline: 1px solid #050c9c;
  }

  h3 {
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #666;
  }
`;

const TopContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 188px;
`;

const BottomContainer = styled.div`
  flex: 1;
  padding: 0.5rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  width: 100%;
`;

const ImgStyled = styled(LazyLoadImage)`
  width: 100% !important;
  height: 188px !important;
  object-fit: cover !important;
`;

const Price = styled.div`
  color: #3572ef;
  font-size: 1rem;
`;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <Container>
      <Link to={`/product/${product.id}`}>
        <TopContainer>
          <ImgStyled
            src={`/${product.image}`}
            alt={`${product.name} image`}
            threshold={50}
            effect="blur"
          />
        </TopContainer>
        <BottomContainer>
          <h3>{product.name}</h3>
          <Price>{formattedPrice(product.price)}</Price>
        </BottomContainer>
      </Link>
    </Container>
  );
};

export default ProductCard;
