'use client';

import { useStore } from '@/lib/store';
import { categories } from '@/data/products';

export default function Sidebar() {
  const { filters, setFilters } = useStore();

  const handleCategoryChange = (category: string) => {
    setFilters({ category: category === 'All' ? [] : [category] });
  };

  const handlePriceChange = (value: number) => {
    setFilters({ price: value });
  };

  const isAllSelected = filters.category.length === 0;

  return (
    <div className="w-64 ml-6 mt-6">
      {/* Blue Filters Section */}
      <div className="bg-blue-600 text-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        
        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Category</h3>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={isAllSelected}
                onChange={() => handleCategoryChange('All')}
                className="mr-3 w-4 h-4 text-white bg-transparent border-2 border-white rounded-full focus:ring-2 focus:ring-white"
              />
              <span className="text-sm">All</span>
            </label>
            {categories.map((category) => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category.includes(category) && !isAllSelected}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-3 w-4 h-4 text-white bg-transparent border-2 border-white rounded-full focus:ring-2 focus:ring-white"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-3">Price</h3>
          <div className="space-y-3">
            <input
              type="range"
              min={0}
              max={1000}
              value={filters.price}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full h-2 bg-blue-800 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex items-center justify-between text-sm">
              <span>0</span>
              <span>1000</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid #1e40af;
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid #1e40af;
        }
      `}</style>
    </div>
  );
}