import React, { useMemo } from "react";
import { TbShoppingCart, TbShoppingCartFilled } from "react-icons/tb";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCartStore } from "../../hooks/useCartStore";

const Container = styled.div`
  width: 100%;
  background-color: white;
  position: sticky;
  top: 0;
  margin: 0 auto;
  z-index: 100;

  animation: fadein 1s;
  -webkit-animation: fadein 1s;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 80px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftContainer = styled.div`
  cursor: pointer;
`;

const RightContainer = styled.div``;

const TotalItem = styled.span`
  display: block;
  position: absolute;
  top: -30px;
  right: -20px;
  background-color: #3572ef;
  color: white;
  text-align: center;
  border-radius: 100%;
  font-size: 13px;
  font-weight: 400;
  line-height: 14px;
  min-width: 14px;
  border: 3px solid #3572ef;
  box-sizing: content-box;
`;

const Header: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  const totalItem = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity!, 0);
  }, [cartItems]);

  return (
    <Container>
      <InnerContainer>
        <LeftContainer>
          <Link
            style={{ fontSize: "2.5rem", fontWeight: "bold" }}
            to="/"
            className="banner"
          >
            ShopSite
          </Link>
        </LeftContainer>
        <RightContainer>
          <Link to="/cart" className="cart-icon">
            <TbShoppingCart className="icon-default" size="2em" />
            <TbShoppingCartFilled className="icon-hover" size="2em" />{" "}
            {totalItem > 0 && <TotalItem>{totalItem}</TotalItem>}
          </Link>
        </RightContainer>
      </InnerContainer>
    </Container>
  );
};

export default Header;
