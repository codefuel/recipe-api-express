import { Router, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRecipeByName } from '../../../../domain/theMealDbService';
import { query, validationResult } from 'express-validator';

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

  const name = req.query.name as string;

  const meals = await getRecipeByName(name);
  res.status(StatusCodes.OK).json({success: true, meals});
};

/**
 * @openapi
 * /v1/recipe:
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

export default router;
