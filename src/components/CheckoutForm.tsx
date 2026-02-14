import React, { useState } from 'react';
import { UserDetails } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface CheckoutFormProps {
  onSubmit: (details: UserDetails) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState<UserDetails>({
    name: '',
    address: '',
    phone: ''
  });

  const [errors, setErrors] = useState<Partial<UserDetails>>({});

  const validate = () => {
    const newErrors: Partial<UserDetails> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Enter a valid 10-digit phone number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Delivery Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Full Name" 
          placeholder="John Doe" 
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          error={errors.name}
        />
        
        <Input 
          label="Delivery Address" 
          placeholder="123 Foodie St, Apt 4B" 
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          error={errors.address}
        />
        
        <Input 
          label="Phone Number" 
          type="tel"
          placeholder="(555) 123-4567" 
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          error={errors.phone}
        />

        <div className="pt-4 flex gap-4">
          <Button 
            type="button" 
            variant="outline" 
            className="w-1/3" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            className="flex-1"
            isLoading={isSubmitting}
          >
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
};