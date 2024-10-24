const express = require('express');
const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Sample data for restaurants
const restaurants = [
    { name: "The Gourmet Bistro", cuisine: "French" },
    { name: "Spicy Kitchen", cuisine: "Indian" },
    { name: "Healthy Eats", cuisine: "Vegan" },
    { name: "Comfort Diner", cuisine: "American" },
    { name: "Sweet Tooth Bakery", cuisine: "Bakery" }
];

// Menu data for restaurants
const menuData = {
    "The Gourmet Bistro": [
        { name: "Truffle Pasta", description: "Pasta with truffle oil", price: 15.99, special: false },
        { name: "Seared Salmon", description: "Salmon with lemon butter", price: 22.99, special: true },
        { name: "Gourmet Salad", description: "Mixed greens with vinaigrette", price: 10.99, special: false },
        { name: "Duck Confit", description: "Slow-cooked duck leg", price: 18.99, special: false },
        { name: "Chocolate Fondant", description: "Warm chocolate cake", price: 7.99, special: true },
        { name: "Cheese Platter", description: "Selection of fine cheeses", price: 12.99, special: false }
    ],
    "Spicy Kitchen": [
        { name: "Chicken Curry", description: "Spicy chicken curry", price: 12.99, special: false },
        { name: "Spicy Noodles", description: "Noodles with chili sauce", price: 10.99, special: true },
        { name: "Vegetable Stir Fry", description: "Mixed vegetables in soy sauce", price: 9.99, special: false },
        { name: "Lamb Kebabs", description: "Grilled lamb skewers", price: 14.99, special: false },
        { name: "Sichuan Tofu", description: "Spicy tofu dish", price: 11.99, special: true },
        { name: "Chili Chicken Wings", description: "Wings with spicy glaze", price: 8.99, special: false }
    ],
    "Healthy Eats": [
        { name: "Quinoa Salad", description: "Healthy quinoa salad", price: 9.99, special: false },
        { name: "Green Smoothie", description: "Refreshing green smoothie", price: 5.99, special: true },
        { name: "Avocado Toast", description: "Toast topped with avocado", price: 7.99, special: false },
        { name: "Chickpea Salad", description: "Protein-rich chickpea salad", price: 8.99, special: false },
        { name: "Fruit Bowl", description: "Fresh seasonal fruits", price: 6.99, special: true },
        { name: "Grilled Vegetable Wrap", description: "Vegetables wrapped in a tortilla", price: 10.99 }
    ],
    "Comfort Diner": [
        { name: "Cheeseburger", description: "Juicy cheeseburger", price: 10.99, special: false },
        { name: "Milkshake", description: "Classic chocolate milkshake", price: 4.99, special: true },
        { name: "French Fries", description: "Crispy golden fries", price: 3.99, special: false },
        { name: "Meatloaf", description: "Homestyle meatloaf", price: 11.99, special: false },
        { name: "Pancakes", description: "Fluffy pancakes with syrup", price: 8.99, special: true },
        { name: "Club Sandwich", description: "Triple-decker sandwich", price: 9.99, special: false }
    ],
    "Sweet Tooth Bakery": [
        { name: "Chocolate Cake", description: "Rich chocolate cake", price: 5.99, special: false },
        { name: "Cookies", description: "Freshly baked cookies", price: 2.99, special: true },
        { name: "Apple Pie", description: "Classic apple pie", price: 4.99, special: false },
        { name: "Cupcakes", description: "Assorted flavored cupcakes", price: 3.49, special: false },
        { name: "Brownies", description: "Fudgy brownies", price: 2.49, special: true },
        { name: "Cheesecake", description: "Creamy cheesecake with berries", price: 6.99, special: false }
    ]
};

// Function to generate random menu items
function generateRandomMenuItem() {
    const randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
    const items = menuData[randomRestaurant.name];
    
    if (!items) {
        throw new Error(`No items found for restaurant: ${randomRestaurant.name}`);
    }
    
    const randomItem = items[Math.floor(Math.random() * items.length)];
    return {
        restaurant: randomRestaurant.name,
        cuisine: randomRestaurant.cuisine, // Add cuisine here
        item: randomItem
    };
}


// Function to generate a menu for a restaurant
function generateMenu(restaurantName) {
    const items = menuData[restaurantName];
    if (!items) {
        throw new Error(`No items found for restaurant: ${restaurantName}`);
    }

    const restaurant = restaurants.find(r => r.name === restaurantName); // Get the restaurant object
    if (!restaurant) {
        throw new Error(`Restaurant not found: ${restaurantName}`);
    }

    return {
        restaurant: restaurantName,
        cuisine: restaurant.cuisine, // Retrieve cuisine type
        items: items.slice(0, 6) // Return up to 6 items
    };
}

// Route for home page
app.get('/', (req, res) => {
    const randomMenuItem = generateRandomMenuItem(); // Returns an object with restaurant and item
    res.render('index', { restaurants, randomMenuItem });
});

// Route for restaurant menu page
app.get('/menu/:restaurant', (req, res) => {
    const restaurantName = req.params.restaurant;

    if (!menuData[restaurantName]) {
        return res.status(404).send("Restaurant not found");
    }

    const menu = generateMenu(restaurantName);
    console.log(menu); // Log the menu object to check its contents
    res.render('menu', { menu, restaurant: restaurantName }); // Pass the menu object correctly
});

// For menu alerts page
app.get('/alerts', (req, res) => {
    const alerts = restaurants.map(r => ({
        name: r.name,
        alert: Math.random() > 0.5 ? "Special event today!" : "No current alerts."
    }));
    res.render('alerts', { alerts });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
