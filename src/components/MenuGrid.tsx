import React from 'react';
import { MenuItem } from '../types';
import { Button } from './ui/Button';
import { Plus } from 'lucide-react';

interface MenuGridProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

export const MenuGrid: React.FC<MenuGridProps> = ({ items, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
        >
          <div className="aspect-[4/3] overflow-hidden relative">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-gray-700 shadow-sm">
              {item.category}
            </div>
          </div>
          
          <div className="p-4 flex flex-col h-[180px]">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                <span className="font-bold text-brand-600">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-gray-500 text-sm line-clamp-3">{item.description}</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-50">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full group-hover:bg-brand-50 group-hover:border-brand-200 group-hover:text-brand-700"
                onClick={() => onAddToCart(item)}
              >
                <Plus size={16} className="mr-1.5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};