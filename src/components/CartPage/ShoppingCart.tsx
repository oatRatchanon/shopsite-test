import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useCartStore } from "../../hooks/useCartStore";
import CartItem from "./CartItem";

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
  min-height: calc(100vh - 80px - 150px);
`;

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ShoppingCart: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const totalItem = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity!, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return formattedPrice(
      cartItems.reduce((total, item) => total + item.price * item.quantity!, 0)
    );
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", padding: "1rem" }}>
          Your cart is empty
        </p>
      ) : (
        <CartItemsContainer>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </CartItemsContainer>
      )}
      <h3 style={{ padding: "2rem", textAlign: "end" }}>
        Total ({totalItem} item) : {totalPrice}
      </h3>
    </Container>
  );
};

export default ShoppingCart;
