const { Restaurants, Cuisines } = require("./utils/data");
const express = require('express');
const path = require('path');
const { generateRandomMenuItem, generateMenu, selectRandomCuisine } = require("./utils/restaurantUtils");

const app = express();
let restaurantData = {}; // This should be populated soon

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

/*
 * Renders the homepage that lists cities and restaurant names.
 */
app.get('/', (request, response) => {
    response.render('index', { restaurants: Restaurants });
});

/*
 * Displays a specific restaurant's random menu.
 * The cuisine is randomly selected and a menu is generated based on it.
 */
app.get('/restaurant', (request, response) => {
    const restaurantId = request.query.restaurantId;
    console.log(`restaurantId: ${restaurantId}`); // Corrected template

    // Logic to get the restaurant's menu
    const restaurant = Restaurants.find(r => r.id === restaurantId);
    if (!restaurant) {
        return response.status(404).send("Restaurant not found");
    }

    // Generate a random menu item and render the restaurant page
    const randomMenuItem = generateRandomMenuItem(restaurant.name);
    const menu = generateMenu(restaurant.name); // Generate the full menu

    response.render('restaurant', { restaurant, randomMenuItem, menu });
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`); // Corrected template literal
});
