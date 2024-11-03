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

// map for query parameter alias mapping
import { cocktail_ingredient_map } from '../utils/aliasMap.js'

const router = express.Router(); 
const allowed_parameters = ["c_name", "c_category", "c_description", "c_image_url", "i_name", "i_quantity"];

/**
 * @swagger
 * tags:
 *   name: Cocktails
 *   description: API for managing cocktails
 */

/**
 * @swagger
 * /cocktails:
 *   get:
 *     summary: Retrieve a list of cocktails
 *     tags: [Cocktails]
 *     parameters:
 *       - in: query
 *         name: c_name
 *         schema:
 *           type: string
 *         description: Filter by cocktail name
 *       - in: query
 *         name: c_category
 *         schema:
 *           type: string
 *         description: Filter by cocktail category
 *       - in: query
 *         name: i_name
 *         schema:
 *           type: string
 *         description: Filter by ingredient name
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: c_name:asc
 *         description: Sort by field and order (e.g., c_name:asc)
 *       - in: query
 *         name: match_type
 *         schema:
 *           type: string
 *           enum: [partial, exact]
 *         description: Type of match for filters
 *     responses:
 *       200:
 *         description: A list of cocktails.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cocktail'
 *       400:
 *         description: Bad Request
 */
router.get('/', 
    // validate query
    validateQuery(cocktail_query_schema), 
    // generate filtering string
    searchQueryMiddleware(cocktail_ingredient_map), 
    // generate sort string
    sortQueryMiddleware(allowed_parameters, cocktail_ingredient_map), 
    // fetch cocktails
    fetchAllCocktails
);

/**
 * @swagger
 * /cocktails/{id}:
 *   get:
 *     summary: Get a cocktail by ID
 *     tags: [Cocktails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The cocktail ID
 *     responses:
 *       200:
 *         description: The cocktail description by id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cocktail'
 *       404:
 *         description: Cocktail not found
 */
router.get('/:id', fetchCocktailById);

/**
 * @swagger
 * /cocktails:
 *   post:
 *     summary: Create a new cocktail
 *     tags: [Cocktails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCocktail'
 *     responses:
 *       201:
 *         description: Cocktail created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cocktail'
 *       400:
 *         description: Bad Request
 */
router.post('/', validateBody(cocktail_body_schema), addCocktail);

/**
 * @swagger
 * /cocktails/{id}:
 *   delete:
 *     summary: Delete a cocktail by ID
 *     tags: [Cocktails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The cocktail ID
 *     responses:
 *       200:
 *         description: Cocktail deleted successfully.
 *       404:
 *         description: Cocktail not found
 */
router.delete('/:id', removeCocktail);

/**
 * @swagger
 * /cocktails/{id}:
 *   patch:
 *     summary: Update a cocktail by ID
 *     tags: [Cocktails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The cocktail ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCocktail'
 *     responses:
 *       200:
 *         description: Cocktail updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cocktail'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Cocktail not found
 */
router.patch('/:id', validateBody(cocktail_update_body_schema), modifyCocktail);

export default router;