import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserDetails } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface CheckoutFormProps {
  onSubmit: (details: UserDetails) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const checkoutSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  address: z.string().min(5, 'Address must be at least 5 characters').max(500),
  phone: z.string()
    .min(1, 'Phone is required')
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => /^\d{10}$/.test(val), 'Enter a valid 10-digit phone number')
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, onCancel, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: ''
    }
  });

  const onFormSubmit = (data: CheckoutFormData) => {
    onSubmit(data as UserDetails);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Delivery Details</h2>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <Input
          label="Full Name"
          {...register('name')}
          placeholder="John Doe"
          error={errors.name?.message}
        />

        <Input
          label="Delivery Address"
          {...register('address')}
          placeholder="123 Foodie St, Apt 4B"
          error={errors.address?.message}
        />

        <Input
          label="Phone Number"
          {...register('phone')}
          type="tel"
          placeholder="(555) 123-4567"
          error={errors.phone?.message}
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