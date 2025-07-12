"use client";

import { Trash2, Minus, Plus } from "lucide-react";
import { Product } from "@/lib/types";
import toast from "react-hot-toast";

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({ product, quantity, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border">
      <img
        src={product.image}
        alt={product.title}
        className="w-16 h-16 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{product.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Minus className="h-4 w-4" />
        </button>
        
        <span className="w-8 text-center">{quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      
      <div className="text-right">
        <p className="font-semibold text-blue-600">${(product.price * quantity).toFixed(2)}</p>
        <p className="text-sm text-gray-500">${product.price} each</p>
      </div>
      
      <button
        onClick={() => {
          onRemove(product.id)
          toast.error("Removed from cart!");
        }}
          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
} 