 // Define cuisines and menu items for each restaurant
 const cuisines = ["French", "Indian", "Vegan", "American", "Bakery"];
 const menuItems = {
     French: [
         { name: "Truffle Pasta", description: "Pasta with truffle oil", price: 15.99 },
         { name: "Seared Salmon", description: "Salmon with lemon butter", price: 22.99 },
         { name: "Gourmet Salad", description: "Mixed greens with vinaigrette", price: 10.99 },
         { name: "Duck Confit", description: "Slow-cooked duck leg", price: 18.99 },
         { name: "Chocolate Fondant", description: "Warm chocolate cake", price: 7.99 },
         { name: "Cheese Platter", description: "Selection of fine cheeses", price: 12.99 },
     ],
     Indian: [
         { name: "Chicken Curry", description: "Spicy chicken curry", price: 12.99 },
         { name: "Spicy Noodles", description: "Noodles with chili sauce", price: 10.99 },
         { name: "Vegetable Stir Fry", description: "Mixed vegetables in soy sauce", price: 9.99 },
         { name: "Lamb Kebabs", description: "Grilled lamb skewers", price: 14.99 },
         { name: "Sichuan Tofu", description: "Spicy tofu dish", price: 11.99 },
         { name: "Chili Chicken Wings", description: "Wings with spicy glaze", price: 8.99 },
     ],
     Vegan: [
         { name: "Quinoa Salad", description: "Healthy quinoa salad", price: 9.99 },
         { name: "Green Smoothie", description: "Refreshing green smoothie", price: 5.99 },
         { name: "Avocado Toast", description: "Toast topped with avocado", price: 7.99 },
         { name: "Chickpea Salad", description: "Protein-rich chickpea salad", price: 8.99 },
         { name: "Fruit Bowl", description: "Fresh seasonal fruits", price: 6.99 },
         { name: "Grilled Vegetable Wrap", description: "Vegetables wrapped in a tortilla", price: 10.99 },
     ],
     American: [
         { name: "Cheeseburger", description: "Juicy cheeseburger", price: 10.99 },
         { name: "Milkshake", description: "Classic chocolate milkshake", price: 4.99 },
         { name: "French Fries", description: "Crispy golden fries", price: 3.99 },
         { name: "Meatloaf", description: "Homestyle meatloaf", price: 11.99 },
         { name: "Pancakes", description: "Fluffy pancakes with syrup", price: 8.99 },
         { name: "Club Sandwich", description: "Triple-decker sandwich", price: 9.99 },
     ],
     Bakery: [
         { name: "Chocolate Cake", description: "Rich chocolate cake", price: 5.99 },
         { name: "Cookies", description: "Freshly baked cookies", price: 2.99 },
         { name: "Apple Pie", description: "Classic apple pie", price: 4.99 },
         { name: "Cupcakes", description: "Assorted flavored cupcakes", price: 3.49 },
         { name: "Brownies", description: "Fudgy brownies", price: 2.49 },
         { name: "Cheesecake", description: "Creamy cheesecake with berries", price: 6.99 },
     ],
 };
 
 // Function to generate a random menu for a restaurant
 function generateRandomMenu() {
     const restaurantNames = [
         "The Gourmet Bistro",
         "Spicy Kitchen",
         "Healthy Eats",
         "Comfort Diner",
         "Sweet Tooth Bakery"
     ];
 
     const menus = {};
 
     restaurantNames.forEach(restaurant => {
         const randomCuisine = cuisines[Math.floor(Math.random() * cuisines.length)];
         const items = menuItems[randomCuisine];
         const numberOfItems = Math.floor(Math.random() * (6)) + 5; // Randomly select between 5 and 10 items
         menus[restaurant] = {
             cuisine: randomCuisine,
             items: items.sort(() => 0.5 - Math.random()).slice(0, numberOfItems), // To get random items
         };
     });
 
     return menus;
 }
 
 // Exported the generated menus
 module.exports = generateRandomMenu;