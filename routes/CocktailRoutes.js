import express from 'express';

// controller
import {
    fetchAllCocktails,
    fetchCocktailById,
    addCocktail,
    removeCocktail,
    modifyCocktail,
} from '../controllers/cocktailController.js';

// middleware
import { searchQueryMiddleware } from '../middleware/searchQueryMiddleware.js';
import { sortQueryMiddleware } from '../middleware/sortQueryMiddleware.js';
import { validateQuery } from '../middleware/validateQuery.js';
import { validateBody } from '../middleware/validateBody.js';

// schemes
import { 
    cocktail_body_schema,
    cocktail_update_body_schema,
    cocktail_query_schema
} from '../validationSchemas/cocktailSchema.js';

const router = express.Router(); 
const allowed_parameters = ["name", "category", "description", "image_url"]

// Get all cocktails
router.get('/', 
    // validate query
    validateQuery(cocktail_query_schema), 
    // generate filtering string
    searchQueryMiddleware(), 
    // generate sort string
    sortQueryMiddleware(allowed_parameters), 
    // fetch cocktails
    fetchAllCocktails
);

// Get a single cocktail by ID
router.get('/:id', fetchCocktailById);

// Create a new cocktail
router.post('/', validateBody(cocktail_body_schema), addCocktail);

// Delete an cocktail by ID
router.delete('/:id', removeCocktail);

// Update an cocktail by ID
router.patch('/:id', validateBody(cocktail_update_body_schema), modifyCocktail);

export default router;