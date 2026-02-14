import React from 'react';
import { CartItem } from '../types';
import { Button } from './ui/Button';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout
}) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="flex-1 bg-white shadow-xl flex flex-col animate-slide-in-right">
          <div className="px-4 py-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Your Order</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Trash2 size={24} />
                </div>
                <h3 className="text-gray-900 font-medium mb-1">Your cart is empty</h3>
                <p className="text-gray-500 text-sm">Add some delicious items to get started.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-brand-600 font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-50 text-gray-500"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-50 text-gray-500"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 text-xs hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-semibold text-gray-900">$2.99</span>
            </div>
            <div className="flex items-center justify-between mb-6 text-lg font-bold">
              <span className="text-gray-900">Total</span>
              <span className="text-brand-600">${(total + 2.99).toFixed(2)}</span>
            </div>
            <Button 
              className="w-full" 
              size="lg"
              disabled={items.length === 0}
              onClick={onCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};