import {
    getCocktail,
    getCocktails,
    createCocktail,
    updateCocktail,
    deleteCocktail
} from '../models/cocktailQueries.js'

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
        const { name, category, description, image_url } = req.body;
        const cocktail = await createCocktail(name, category, description, image_url);
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
        const updates = req.body;
        const cocktail = await updateCocktail(id, updates);
        res.status(200).json(cocktail);
    } catch (error) {
        next(error);
    }
}