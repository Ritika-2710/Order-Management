export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type OrderStatus = 'received' | 'preparing' | 'out-for-delivery' | 'delivered';

export interface UserDetails {
  name: string;
  address: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  user: UserDetails;
  createdAt: number;
}

export type ViewState = 'MENU' | 'CART' | 'CHECKOUT' | 'ORDER_TRACKING';