import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('app_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item): item is CartItem =>
              Boolean(item && item.product && item.product.id && typeof item.quantity === 'number')
          );
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('app_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    if (!product || !product.id) return;
    setCart((prev) => {
      const safePrev = Array.isArray(prev) ? prev.filter((item) => item && item.product && item.product.id) : [];
      const existing = safePrev.find((item) => item.product.id === product.id);
      if (existing) {
        return safePrev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
      }
      return [...safePrev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    if (!productId) return;
    setCart((prev) =>
      Array.isArray(prev)
        ? prev.filter((item) => item && item.product && item.product.id !== productId)
        : []
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (!productId) return;
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      Array.isArray(prev)
        ? prev
            .filter((item) => item && item.product && item.product.id)
            .map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            )
        : []
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const safeCart = Array.isArray(cart) ? cart.filter((item) => item && item.product && item.product.id) : [];
  const totalItems = safeCart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalPrice = safeCart.reduce(
    (sum, item) => sum + ((item.product?.price || 0) * (item.quantity || 0)),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart: safeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cart: [],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      totalItems: 0,
      totalPrice: 0,
      isCartOpen: false,
      setIsCartOpen: () => {},
    };
  }
  return context;
};
