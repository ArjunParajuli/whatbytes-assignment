'use client';

import { useStore } from '@/lib/store';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Image from "next/image";


export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useStore();

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <Link href="/" className="text-primary hover:underline">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Shopping Cart ({cart.length} items)
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
                <Image
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded"
                  width={500}
                  height={500}
                />
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {item.product.title}
                  </h3>
                  <p className="text-gray-600">
                    ${item.product.price.toFixed(2)} each
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() =>{
                      removeFromCart(item.product.id);
                      toast.error("Removed from cart!");
                    }}
                    className="text-red-500 hover:text-red-700 mt-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-gray-900">
                Total: ${total.toFixed(2)}
              </span>
            </div>
            
            <button className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors duration-200">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}