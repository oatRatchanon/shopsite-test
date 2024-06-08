import React from "react";
import styled from "styled-components";
import { Product, useCartStore } from "../../hooks/useCartStore";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface CartItemProps {
  item: Product;
}

const CartItemContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  gap: 1rem;

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

const ProductImage = styled(LazyLoadImage)`
  width: 180px;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 180px;

  span {
    width: auto !important;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const ItemFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 430px) {
    flex-direction: column;
  }
`;

const ItemLeftFooter = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 430px) {
    font-size: 0.7rem;
    padding: 1rem 0;
  }
`;

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <CartItemContainer key={item.id}>
      <LeftContainer>
        <ProductImage
          src={`/${item.image}`}
          alt={item.name}
          threshold={50}
          effect="blur"
        />
      </LeftContainer>
      <RightContainer>
        <div>
          <h3>{item.name}</h3>
          <p>Unit Price : {formattedPrice(item.price)}</p>
        </div>
        <ItemFooterContainer>
          <ItemLeftFooter>
            <div
              className="mp"
              onClick={() => {
                if (item.quantity! > 1)
                  updateQuantity(item.id, item.quantity! - 1);
              }}
            >
              -
            </div>
            <input
              type="number"
              value={item.quantity}
              min={1}
              onChange={(e) =>
                updateQuantity(item.id, parseInt(e.target.value))
              }
            />
            <div
              className="mp"
              onClick={() => updateQuantity(item.id, item.quantity! + 1)}
            >
              +
            </div>
            <div>
              <b>Total Price : {formattedPrice(item.quantity! * item.price)}</b>
            </div>
          </ItemLeftFooter>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </ItemFooterContainer>
      </RightContainer>
    </CartItemContainer>
  );
};

export default CartItem;
