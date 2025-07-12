export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  brand?: string;
  image: string;
  rating?: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Filters {
  category: string[];
  price: number;
  brand: string[];
  search: string;
}