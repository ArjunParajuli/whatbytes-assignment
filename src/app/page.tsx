'use client';

import { Suspense } from "react";
import { useMemo, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { products } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import Sidebar from '@/components/ui/Sidebar';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Filters } from "@/lib/types";


export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}

function HomePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { filters, setFilters } = useStore();

  // First useEffect: Read URL parameters and set filters
  useEffect(() => {
    const category = searchParams.get('category');
    const price = searchParams.get('price');
    const search = searchParams.get('search');

    if (category || price || search) {
      const newFilters: Partial<Filters> = {};
      
      if (category) {
        newFilters.category = category.split(',');
      }
      
      if (price) {
        const max = Number(price.split('-')[1] ?? price);
        newFilters.price = max;
      }
      
      if (search) {
        newFilters.search = search;
      }
      
      setFilters(newFilters);
    }
  }, [searchParams, setFilters]);

  // Second useEffect: Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.category.length > 0) {
      params.set('category', filters.category.join(','));
    }
    
    if (filters.price !== 1000) {
      params.set('price', `0-${filters.price}`);
    }
    
    if (filters.search) {
      params.set('search', filters.search);
    }
    
    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.push(newUrl, { scroll: false });
  }, [filters, router]);

  // THIS WAS MISSING: Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false;
      }
      
      // Price filter
      if (product.price > filters.price) {
        return false;
      }
      
      // Brand filter
      if (filters.brand.length > 0 && product.brand && !filters.brand.includes(product.brand)) {
        return false;
      }
      
      // Search filter
      if (filters.search && !product.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [filters]); // Recalculate when filters change

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Products ({filteredProducts.length})
          </h1>
          <p className="text-gray-600">
            Discover our amazing collection of products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h2>
            <p className="text-gray-600">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}