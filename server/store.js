import { v4 as uuidv4 } from 'uuid';

/**
 * @typedef {Object} MenuItem
 * @property {string} id - Unique identifier for the menu item.
 * @property {string} name - Name of the menu item.
 * @property {string} description - Description of the menu item.
 * @property {number} price - Price of the menu item.
 * @property {string} image - URL of the menu item image.
 * @property {string} category - Category of the menu item.
 */

/**
 * Initial Menu Data
 * @type {MenuItem[]}
 */
const MENU_ITEMS = [
    {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Classic delight with 100% real mozzarella cheese.',
        price: 12.99,
        image: '/images/Wmd7O8v3sWqvFc6Elvlf2iNuAOh9l4IpIUaHYu2zA8A0TeMLn3BKUSRHn-kGKRGmyDZOTryyTGfNp9UxvsKMtJnSAVzBPS06YuozSEGuhsg.jpg',
        category: 'Pizza'
    },
    {
        id: '2',
        name: 'Farmhouse Burger',
        description: 'Juicy beef patty with fresh lettuce, tomatoes, and our secret sauce.',
        price: 9.99,
        image: '/images/burger.jpg',
        category: 'Burgers'
    },
    {
        id: '3',
        name: 'Creamy Pasta',
        description: 'Penne pasta tossed in a rich, creamy alfredo sauce with broccoli.',
        price: 11.50,
        image: '/images/pasta.jpg',
        category: 'Pasta'
    },
    {
        id: '4',
        name: 'Spicy Tacos',
        description: 'Three crunchy tacos filled with seasoned meat, cheese, and salsa.',
        price: 8.99,
        image: '/images/tacos.jpg',
        category: 'Mexican'
    },
    {
        id: '5',
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce, croutons, parmesan cheese, and caesar dressing.',
        price: 7.99,
        image: '/images/salad.jpg',
        category: 'Salads'
    },
    {
        id: '6',
        name: 'Double Cheeseburger',
        description: 'Double the beef, double the cheese, double the flavor.',
        price: 13.99,
        image: '/images/burger2.jpg',
        category: 'Burgers'
    },
    {
        id: '7',
        name: 'Pepperoni Feast',
        description: 'Loaded with extra pepperoni and mozzarella cheese.',
        price: 14.99,
        image: '/images/pizza2.jpg',
        category: 'Pizza'
    },
    {
        id: '8',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a gooey molten center.',
        price: 6.50,
        image: '/images/chocolavacake.jpg',
        category: 'Dessert'
    }
];

/** @type {Object[]} */
let orders = [];

// Helper to simulate status updates
const STATUS_FLOW = ['received', 'preparing', 'out-for-delivery', 'delivered'];

/**
 * Simulates the progress of an order status over time.
 * @param {string} orderId - The ID of the order to track.
 */
const simulateOrderProgress = (orderId) => {
    let currentIndex = 0;

    const interval = setInterval(() => {
        currentIndex++;
        if (currentIndex >= STATUS_FLOW.length) {
            clearInterval(interval);
            return;
        }

        const orderIndex = orders.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            orders[orderIndex].status = STATUS_FLOW[currentIndex];
            console.log(`Order ${orderId} updated to ${STATUS_FLOW[currentIndex]}`);
        } else {
            clearInterval(interval);
        }
    }, 10000); // Update every 10 seconds
};

/**
 * Retrieves the full menu.
 * @returns {MenuItem[]} List of menu items.
 */
export const getMenu = () => MENU_ITEMS;

/**
 * Retrieves an order by ID.
 * @param {string} id - The order ID.
 * @returns {Object|undefined} The order object if found, otherwise undefined.
 */
export const getOrder = (id) => orders.find(o => o.id === id);

/**
 * Creates a new order.
 * @param {Object[]} items - List of items in the order.
 * @param {Object} user - User details.
 * @returns {Object} The created order.
 */
export const createOrder = (items, user) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newOrder = {
        id: uuidv4(),
        items,
        user,
        total,
        status: 'received',
        createdAt: Date.now()
    };
    orders.push(newOrder);

    // Start simulation
    simulateOrderProgress(newOrder.id);

    return newOrder;
};

/**
 * Clears all orders (for testing purposes).
 */
export const clearOrders = () => { orders = []; };
