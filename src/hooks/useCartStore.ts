import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity?: number;
}

interface CartState {
  cartItems: Product[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (product: Product, quantity: number) =>
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (item) => item.id === product.id
          );
          if (existingItemIndex !== -1) {
            const updatedCartItems = [...state.cartItems];
            const existingItem = updatedCartItems[existingItemIndex];
            if (existingItem) {
              existingItem.quantity! += quantity;
            }
            return { cartItems: updatedCartItems };
          } else {
            return {
              cartItems: [...state.cartItems, { ...product, quantity }],
            };
          }
        }),
      removeFromCart: (productId: number) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId: number, quantity: number) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),
    }),
    {
      name: "cartStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
