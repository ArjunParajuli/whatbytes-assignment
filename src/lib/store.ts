import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Filters } from './types';

interface StoreState {
  cart: CartItem[];
  filters: Filters;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setFilters: (filters: Partial<Filters>) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      filters: {
        category: [],
        price: 1000,
        brand: [],
        search: ''
      },
      addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter(item => item.product.id !== productId)
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set({
          cart: get().cart.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        });
      },
      setFilters: (newFilters) => {
        set({
          filters: { ...get().filters, ...newFilters }
        });
      },
      clearCart: () => set({ cart: [] })
    }),
    {
      name: 'ecommerce-store',
      partialize: (state) => ({ cart: state.cart })
    }
  )
);