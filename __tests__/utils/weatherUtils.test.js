const { Cuisines } = require("../../utils/restaurantUtils");
const { generateRandomMenuItem, generateMenu, selectRandomCuisine } = require("../../utils/restaurantUtils");

describe('Restaurant Functions', () => {
    describe('generateRandomMenuItem', () => {
        it('should return a menu item with valid properties', () => {
            const item = generateRandomMenuItem("Spicy Kitchen");
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('description');
            expect(item).toHaveProperty('price');
            expect(typeof item.price).toBe('number');
        });
    });

    describe('generateMenu', () => {
        it('should return a menu for a given restaurant', () => {
            const menu = generateMenu("Spicy Kitchen");
            expect(menu).toHaveProperty('restaurant', 'Spicy Kitchen');
            expect(menu.items.length).toBeGreaterThan(0);
        });
    });

    describe('selectRandomCuisine', () => {
        it('should return a valid cuisine type', () => {
            const cuisine = selectRandomCuisine();
            expect(Cuisines).toContain(cuisine);
        });
    });
});
