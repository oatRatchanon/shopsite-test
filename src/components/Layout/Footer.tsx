import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: white;
`;

const InnerContainer = styled.div`
  max-width: 1240px;
  height: 150px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer: React.FC = () => {
  return (
    <Container>
      <InnerContainer>© 2024 ShopSite. All Rights Reserved</InnerContainer>
    </Container>
  );
};

export default Footer;
