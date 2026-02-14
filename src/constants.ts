import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic delight with 100% real mozzarella cheese.',
    price: 12.99,
    image: 'https://picsum.photos/400/300?random=1',
    category: 'Pizza'
  },
  {
    id: '2',
    name: 'Farmhouse Burger',
    description: 'Juicy beef patty with fresh lettuce, tomatoes, and our secret sauce.',
    price: 9.99,
    image: 'https://picsum.photos/400/300?random=2',
    category: 'Burgers'
  },
  {
    id: '3',
    name: 'Creamy Pasta',
    description: 'Penne pasta tossed in a rich, creamy alfredo sauce with broccoli.',
    price: 11.50,
    image: 'https://picsum.photos/400/300?random=3',
    category: 'Pasta'
  },
  {
    id: '4',
    name: 'Spicy Tacos',
    description: 'Three crunchy tacos filled with seasoned meat, cheese, and salsa.',
    price: 8.99,
    image: 'https://picsum.photos/400/300?random=4',
    category: 'Mexican'
  },
  {
    id: '5',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce, croutons, parmesan cheese, and caesar dressing.',
    price: 7.99,
    image: 'https://picsum.photos/400/300?random=5',
    category: 'Salads'
  },
  {
    id: '6',
    name: 'Double Cheeseburger',
    description: 'Double the beef, double the cheese, double the flavor.',
    price: 13.99,
    image: 'https://picsum.photos/400/300?random=6',
    category: 'Burgers'
  },
  {
    id: '7',
    name: 'Pepperoni Feast',
    description: 'Loaded with extra pepperoni and mozzarella cheese.',
    price: 14.99,
    image: 'https://picsum.photos/400/300?random=7',
    category: 'Pizza'
  },
  {
    id: '8',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a gooey molten center.',
    price: 6.50,
    image: 'https://picsum.photos/400/300?random=8',
    category: 'Dessert'
  }
];

export const STATUS_STEPS: { id: string; label: string; description: string }[] = [
  { id: 'received', label: 'Order Received', description: 'We have received your order.' },
  { id: 'preparing', label: 'Preparing', description: 'Our chefs are cooking your meal.' },
  { id: 'out-for-delivery', label: 'Out for Delivery', description: 'Your food is on the way!' },
  { id: 'delivered', label: 'Delivered', description: 'Enjoy your meal!' },
];
