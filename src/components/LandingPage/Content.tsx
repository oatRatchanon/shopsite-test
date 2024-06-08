import React from "react";
import styled from "styled-components";

interface ContentProps {
  listRef: React.RefObject<HTMLDivElement>;
}

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  margin: 0 auto;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }

  animation: fadein 1s;
  -webkit-animation: fadein 1s;

  animation: slideFromLeft 1s;
  -webkit-animation: slideFromLeft 1s;
  position: relative;
`;

const LeftContainer = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1rem;
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const ImgStyled = styled.img`
  width: 100%;
  object-fit: contain;

  @media (max-width: 768px) {
    height: 80%;
  }
`;

const Content: React.FC<ContentProps> = ({ listRef }) => {
  const scrollTo = () => {
    const topOffset =
      listRef.current!.getBoundingClientRect().top + window.scrollY - 160 - 16;
    window.scrollTo({ top: topOffset, behavior: "smooth" });
  };

  return (
    <Container>
      <LeftContainer>
        <h1>Online Shopping</h1>
        <div>
          Discover the latest trends in fashion, electronics, and home goods
          with unbeatable prices and fast shipping. Shop conveniently online
          today!
        </div>
        <button type="button" onClick={scrollTo}>
          See Products
        </button>
      </LeftContainer>
      <RightContainer>
        <ImgStyled src="/shop.png" alt="Shop image" />
      </RightContainer>
    </Container>
  );
};

export default Content;
