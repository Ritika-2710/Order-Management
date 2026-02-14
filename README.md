# CraveBites - Food Delivery App

A simple, robust order management feature for a food delivery application, built with React, Node.js, and TypeScript.


## Features

- **Menu Display**: Browse a curated list of food items with real images.
- **Order Placement**: Add items to cart, adjust quantities, and checkout.
- **Order Tracking**: Real-time simulated status updates (Received -> Preparing -> Out for Delivery -> Delivered).
- **Responsive Design**: Works on desktop and mobile.

## Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express
- **Testing**: Jest, React Testing Library, Supertest

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (usually comes with Node.js)

## Installation

1.  Clone the repository (if you haven't already):
    ```bash
    git clone https://github.com/Ritika-2710/Order-Management.git
    cd Order-Management
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Running the Application

### Option 1: Run All (Recommended)
You can run both the frontend and backend concurrently with a single command:

```bash
npm run dev
```
- Frontend will be available at: `http://localhost:3000` (or similar, check console output)
- Backend API will run on: `http://localhost:3002`

### Option 2: Run Separately
If you prefer to run them in separate terminals:

1.  **Start the Backend**:
    ```bash
    npm run start:backend
    ```

2.  **Start the Frontend** (in a new terminal):
    ```bash
    npm run start:frontend
    ```

## Running Tests

To run the automated test suite (including unit and integration tests):

```bash
npm test
```

## Project Structure

- `src/`: Frontend React application source code.
- `server/`: Backend Node.js/Express application source code.
- `public/`: Static assets (images).
