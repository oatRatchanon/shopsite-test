import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import { products } from "../../utils/products";
import Content from "./Content";

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ListContainer = styled.div`
  margin-top: 1rem;
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 430px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Landing: React.FC = () => {
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Content listRef={ref} />
      <h2>Products</h2>
      <ListContainer ref={ref}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ListContainer>
    </Container>
  );
};

export default Landing;
