const express = require('express');
const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Sample data for restaurants
const restaurants = [
    { name: "The Gourmet Bistro", cuisine: "French" },
    { name: "Spicy Kitchen", cuisine: "Indian" },
    { name: "Healthy Eats", cuisine: "Vegan" },
    { name: "Comfort Diner", cuisine: "American" },
    { name: "Sweet Tooth Bakery", cuisine: "Bakery" }
];

// Function to generate random menu items
function generateRandomMenuItem(cuisine) {
    const items = [
        { name: "Pasta", description: "Delicious pasta with tomato sauce", price: 12.99, special: false},
        { name: "Curry", description: "Spicy chicken curry", price: 10.99, special: true},
        { name: "Salad", description: "Fresh garden salad", price: 8.99, special: false},
        { name: "Burger", description: "Juicy beef burger", price: 11.99, special: true},
        { name: "Cake", description: "Rich chocolate cake", price: 5.99, special: false}
    ];
    return items[Math.floor(Math.random() * items.length)];
}

// Function to generate a menu for a restaurant
function generateMenu(restaurant) {
    const menuSize = Math.floor(Math.random() * 6) + 5; // Randomly between 5 and 10 items
    const menuItems = [];
    for (let i = 0; i < menuSize; i++) {
        const item = generateRandomMenuItem(restaurant.cuisine);
        console.log(item); // Log the generated item
        menuItems.push(item);
    }
    console.log(menuItems); // Log the full menu
    return { cuisine: restaurant.cuisine, items: menuItems };
}

// Route for home page
app.get('/', (req, res) => {
    const randomItem = generateRandomMenuItem("Spicy"); // Example to get a random item
    res.render('index', { restaurants, randomItem });
});

// Route for restaurant menu page
app.get('/menu/:name', (req, res) => {
    const restaurant = restaurants.find(r => r.name === req.params.name);
    
    if (!restaurant) {
        return res.status(404).send("Restaurant not found");
    }

    console.log(restaurant); // Log the found restaurant

    const menu = generateMenu(restaurant);
    
    if (!menu || !Array.isArray(menu.items)) {
        return res.status(500).send("Error generating menu");
    }

    res.render('menu', { restaurant, menu });
});

// Route for menu alerts page
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

app.use(express.static('public'));
