'use client';

import { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { cart, filters, setFilters } = useStore();
  const [searchTerm, setSearchTerm] = useState(filters.search);
  const router = useRouter();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ search: searchTerm });
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  return (
    <header className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-white">Whatbytes</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Cart Button */}
          <div className="flex-shrink-0">
            <button
              onClick={handleCartClick}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors duration-200"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="font-medium">Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ml-1">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}