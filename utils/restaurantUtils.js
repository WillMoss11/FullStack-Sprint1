// Sample data for restaurants
const restaurants = [
  { name: "The Gourmet Bistro", cuisine: "French" },
  { name: "Spicy Kitchen", cuisine: "Indian" },
  { name: "Healthy Eats", cuisine: "Vegan" },
  { name: "Comfort Diner", cuisine: "American" },
  { name: "Sweet Tooth Bakery", cuisine: "Bakery" }
];

// Sample menu data for restaurants
const menuData = {
  "The Gourmet Bistro": [
      { name: "Truffle Pasta", description: "Pasta with truffle oil", price: 15.99, special: false },
      { name: "Seared Salmon", description: "Salmon with lemon butter", price: 22.99, special: true },
      
  ],
  "Spicy Kitchen": [
      { name: "Chicken Curry", description: "Spicy chicken curry", price: 12.99, special: false },
      { name: "Spicy Noodles", description: "Noodles with chili sauce", price: 10.99, special: true },
      
  ],
  
};

// Cuisine types
const Cuisines = ["French", "Indian", "Vegan", "American", "Bakery"];

// Function to generate a random menu item
function generateRandomMenuItem(restaurantName) {
  const items = menuData[restaurantName];
  if (!items || items.length === 0) {
      throw new Error(`No items found for restaurant: ${restaurantName}`);
  }
  return items[Math.floor(Math.random() * items.length)];
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
      cuisine: restaurant.cuisine, // Correctly retrieve cuisine type
      items: items.slice(0, 6) // Return up to 6 items
  };
}

// Function to select a random cuisine type
function selectRandomCuisine() {
  const randomIndex = Math.floor(Math.random() * Cuisines.length);
  return Cuisines[randomIndex];
}

// Export functions as needed
module.exports = {
  generateRandomMenuItem,
  generateMenu,
  selectRandomCuisine,
  Cuisines
};


