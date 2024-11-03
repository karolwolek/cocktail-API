import {
    getCocktail,
    getCocktails,
    createCocktail,
    updateCocktail,
    deleteCocktail
} from '../models/cocktailQueries.js'

import { getIngredients} from '../models/ingredientQueries.js'

// Get all cocktails
export async function fetchAllCocktails(req, res, next) {
    const sort = req.sort_condition || '';
    const condition = req.search_condition || '';
    const values = req.search_values || [];
    try {
        const cocktails = await getCocktails(sort, condition, values);
        res.status(200).json(cocktails);
    } catch (error) {
        next(error);
    }
}

// Get a single cocktail by ID
export async function fetchCocktailById(req, res, next) {
    try {
        const { id } = req.params;
        const cocktail = await getCocktail(id);
        if (!cocktail) {
            return res.status(404).json({ error: 'cocktail not found' });
        }
        res.status(200).json(cocktail);
    } catch (error) {
        next(error);
    }
}

// Create a new cocktail
export async function addCocktail(req, res, next) {
    try {
        const { name, category, description, image_url, ingredients } = req.body;
        
        await verifyIngredients(ingredients);

        const cocktail = await createCocktail(name, category, description, image_url, ingredients);
        res.status(201).json(cocktail);
    } catch (error) {
        next(error);
    }
}

// Delete an cocktail by ID
export async function removeCocktail(req, res, next) {
    try {
        const { id } = req.params;
        const affectedRows = await deleteCocktail(id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Cocktail not found' });
        }
        res.status(200).json({ message: 'Cocktail deleted successfully' });
    } catch (error) {
        next(error);
    }
}

// Update an cocktail by ID
export async function modifyCocktail(req, res, next) {
    try {
        const { id } = req.params;
        const updates = req.body || {};
        const ingredients = updates.ingredients || [];
        delete updates.ingredients;

        await verifyIngredients(ingredients);

        const cocktail = await updateCocktail(id, updates, ingredients);
        res.status(200).json(cocktail);
    } catch (error) {
        next(error);
    }
}

// HELPER METHOD FOR VERYFYING INGREDIENTS
async function verifyIngredients(ingredients) {

    // check if passed ingredients id are valid:
    const present_ingredients = await getIngredients('', '', []); // empty sort, condition and values
    const present_ids = present_ingredients.map(element => element.id);
    const ids = ingredients.map(element => element.ingredient_id);

    // identify invalid ids
    const invalid = ids.filter(id => !present_ids.includes(id));
    if(invalid.length > 0) {
        const errorMessage = `Invalid ingredient ID(s): ${invalid.join(', ')}`;
        const error = new Error(errorMessage);
        error.status = 400;
        throw error;
    }
}
