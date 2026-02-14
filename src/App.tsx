import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { MenuGrid } from './components/MenuGrid';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderTracker } from './components/OrderTracker';
import { MenuItem, CartItem, ViewState, UserDetails } from './types';
import { api } from './api';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('MENU');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // Load menu on mount
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const menu = await api.getMenu();
        setItems(menu);
      } catch (error) {
        console.error("Failed to load menu", error);
      }
    };
    loadMenu();
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckoutStart = () => {
    setIsCartOpen(false);
    setView('CHECKOUT');
  };

  const handlePlaceOrder = async (userDetails: UserDetails) => {
    setIsSubmittingOrder(true);
    try {
      const order = await api.placeOrder(cartItems, userDetails);
      setActiveOrderId(order.id);
      setCartItems([]); // Clear cart
      setView('ORDER_TRACKING');
    } catch (error) {
      console.error("Order failed", error);
      alert("Something went wrong placing your order.");
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Layout
      cartCount={cartCount}
      onCartClick={() => setIsCartOpen(true)}
      onLogoClick={() => setView('MENU')}
    >
      <div className="max-w-7xl mx-auto">
        {view === 'MENU' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2 mb-12">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Fresh Food, Delivered.</h1>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Order your favorites from our curated menu of delicious meals.
              </p>
            </div>
            <MenuGrid items={items} onAddToCart={handleAddToCart} />
          </div>
        )}

        {view === 'CHECKOUT' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="mb-6">
              <button onClick={() => setView('MENU')} className="text-sm text-gray-500 hover:text-brand-600">
                &larr; Back to Menu
              </button>
            </div>
            <CheckoutForm
              onSubmit={handlePlaceOrder}
              onCancel={() => setView('MENU')}
              isSubmitting={isSubmittingOrder}
            />
          </div>
        )}

        {view === 'ORDER_TRACKING' && activeOrderId && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="mb-6 text-center">
              <button onClick={() => { setActiveOrderId(null); setView('MENU'); }} className="text-sm text-gray-500 hover:text-brand-600">
                Place another order
              </button>
            </div>
            <OrderTracker orderId={activeOrderId} />
          </div>
        )}
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutStart}
      />
    </Layout>
  );
};

export default App;