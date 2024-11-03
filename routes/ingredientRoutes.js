import express from 'express';

// controller
import {
    fetchAllIngredients,
    fetchIngredientById,
    addIngredient,
    removeIngredient,
    modifyIngredient
} from '../controllers/ingredientController.js';

// middleware
import { searchQueryMiddleware } from '../middleware/searchQueryMiddleware.js';
import { sortQueryMiddleware } from '../middleware/sortQueryMiddleware.js';
import { validateQuery } from '../middleware/validateQuery.js';
import { validateBody } from '../middleware/validateBody.js';

// schemes
import { 
    ingredient_query_schema, 
    ingredient_update_body_schema, 
    ingredient_body_schema 
} from '../validationSchemas/ingredientSchema.js';

const router = express.Router(); 
const allowed_parameters = ["name", "type", "description", "is_alcoholic", "percentage", "image_url"]

/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: API for managing ingredients
 */

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Retrieve a list of ingredients
 *     tags: [Ingredients]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by ingredient name
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by ingredient type
 *       - in: query
 *         name: is_alcoholic
 *         schema:
 *           type: boolean
 *         description: Filter by alcoholic content
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: name:asc
 *         description: Sort by field and order (e.g., name:asc)
 *       - in: query
 *         name: match_type
 *         schema:
 *           type: string
 *           enum: [partial, exact]
 *         description: Type of match for filters
 *     responses:
 *       200:
 *         description: A list of ingredients.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: Bad Request
 */
router.get('/', 
    // validate query
    validateQuery(ingredient_query_schema), 
    // generate filtering string
    searchQueryMiddleware(), 
    // generate sort string
    sortQueryMiddleware(allowed_parameters), 
    // fetch ingredients
    fetchAllIngredients
);

/**
 * @swagger
 * /ingredients/{id}:
 *   get:
 *     summary: Get an ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ingredient ID
 *     responses:
 *       200:
 *         description: The ingredient description by id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found
 */
router.get('/:id', fetchIngredientById);

/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Create a new ingredient
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewIngredient'
 *     responses:
 *       201:
 *         description: Ingredient created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: Bad Request
 */
router.post('/', validateBody(ingredient_body_schema), addIngredient);

/**
 * @swagger
 * /ingredients/{id}:
 *   delete:
 *     summary: Delete an ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ingredient ID
 *     responses:
 *       200:
 *         description: Ingredient deleted successfully.
 *       404:
 *         description: Ingredient not found
 */
router.delete('/:id', removeIngredient);

/**
 * @swagger
 * /ingredients/{id}:
 *   patch:
 *     summary: Update an ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ingredient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateIngredient'
 *     responses:
 *       200:
 *         description: Ingredient updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Ingredient not found
 */
router.patch('/:id', validateBody(ingredient_update_body_schema), modifyIngredient);

export default router;