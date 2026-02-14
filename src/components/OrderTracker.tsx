import React, { useEffect, useState } from 'react';
import { Order, OrderStatus } from '../types';
import { STATUS_STEPS } from '../constants';
import { api } from '../api';
import { Check, Clock, Truck, MapPin } from 'lucide-react';

interface OrderTrackerProps {
  orderId: string;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ orderId }) => {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    let intervalId: number;

    const fetchOrder = async () => {
      const data = await api.getOrder(orderId);
      if (data) {
        setOrder({ ...data }); // Spread to ensure new reference for React
      }
    };

    fetchOrder();
    // Poll for updates every 2 seconds
    intervalId = window.setInterval(fetchOrder, 2000);

    return () => window.clearInterval(intervalId);
  }, [orderId]);

  if (!order) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  const getCurrentStepIndex = (status: OrderStatus) => {
    return STATUS_STEPS.findIndex(s => s.id === status);
  };

  const currentStep = getCurrentStepIndex(order.status);

  const getIcon = (id: string, index: number) => {
    if (index < currentStep) return <Check size={20} />;
    if (index === currentStep) {
      if (id === 'received') return <Clock size={20} />;
      if (id === 'preparing') return <UtensilsIcon size={20} />;
      if (id === 'out-for-delivery') return <Truck size={20} />;
      return <MapPin size={20} />;
    }
    return <div className="w-2 h-2 rounded-full bg-gray-300" />;
  };

  // Helper component for Icon inside
  const UtensilsIcon = ({ size }: { size: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Status</h2>
          <p className="text-gray-500">Order ID: #{order.id}</p>
        </div>

        <div className="relative">
          {/* Progress Bar Background */}
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 rounded-full -z-10"></div>

          {/* Active Progress Bar */}
          <div
            className="absolute top-5 left-0 h-1 bg-brand-500 rounded-full -z-10 transition-all duration-1000 ease-in-out"
            style={{ width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` }}
          ></div>

          <div className="flex justify-between">
            {STATUS_STEPS.map((step, index) => {
              const isActive = index <= currentStep;
              const isCurrent = index === currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center group">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${isActive
                      ? 'bg-brand-500 border-brand-100 text-white shadow-lg shadow-brand-500/30'
                      : 'bg-white border-gray-200 text-gray-400'
                      }`}
                  >
                    {getIcon(step.id, index)}
                  </div>
                  <div className="mt-4 text-center">
                    <p className={`text-sm font-semibold mb-1 ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    <p className={`text-xs max-w-[100px] hidden sm:block ${isCurrent ? 'text-brand-600' : 'text-gray-400'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-4">Order Summary</h3>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.quantity}x {item.name}</span>
              <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-brand-600">${(order.total + 2.99).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};