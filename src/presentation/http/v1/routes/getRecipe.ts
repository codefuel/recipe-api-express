import { Router, RequestHandler, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { lookupRecipeById, lookupRecipeByFristLetter, lookupRecipeByName } from '../../../../domain/theMealDbService';
import { param, query, validationResult } from 'express-validator';

const router = Router();

const getRecipeHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      errors: errors.array()
    });
    return;
  }

  try {
    const name = req.query.name as string;

    let meals: any[] = [];

    if (name.length === 1) {
      meals = [await lookupRecipeByFristLetter(name)];
    } else {
      meals = await lookupRecipeByName(name);
    }
    res.status(StatusCodes.OK).json({success: true, meals});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, error});
  }
};

const getRecipeByIdHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      errors: errors.array()
    });
    return;
  }

  try {
    const recipeId = parseInt(req.params.recipeId);

    const meals = await lookupRecipeById(recipeId);

    res.status(StatusCodes.OK).json({success: true, meals});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, error});
  }
};

/**
 * @openapi
 * /api/v1/recipe:
 *   get:
 *     summary: Get recipes by name
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the recipe to search for
 *     responses:
 *       200:
 *         description: Successfully retrieved recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 meals:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Missing or invalid query parameter
 */
router.get(
  '/recipe',
  [
    query('name').isString(),
    getRecipeHandler
  ],
);

/**
 * @openapi
 * /api/v1/recipe/{recipeId}:
 *   get:
 *     summary: Get recipe by id
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric Id of the recipe to retrieve
 *         example: 52819
 *     responses:
 *       200:
 *         description: Successfully retrieved recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 meals:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid recipeId parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: recipeId must be a number
 */
router.get(
  '/recipe/:recipeId',
  param('recipeId').isNumeric().withMessage('recipeId must be a number'),
  getRecipeByIdHandler
);

export default router;
