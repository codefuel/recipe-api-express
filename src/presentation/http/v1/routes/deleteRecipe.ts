import { NextFunction, Request, Response, Router, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { deleteRecipeById } from '../../../../domain/theMealDbService';
import { param, validationResult } from 'express-validator';

const router = Router();

const deleteRecipeHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: errors.array()
    });
    return;
  }

  try {
    const recipeId = req.params.recipeId as unknown as number;

    await deleteRecipeById(recipeId);
    res.status(StatusCodes.OK).json({success: true});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, error});
  }
};

/**
 * @openapi
 * /api/v1/recipe/{recipeId}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the recipe to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Recipe successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
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
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 */
router.delete(
  '/recipe/:recipeId',
  [
    // TODO: Extract
    // 🔍 Logging middleware
    (req: Request, _res: Response, next: NextFunction) => {
      console.log('Incoming request:', {
        method: req.method,
        url: req.originalUrl,
        query: req.query,
        body: req.body,
        headers: req.headers,
      });
      next();
    },
    param('recipeId').isNumeric().withMessage('recipeId must be a number'),
    deleteRecipeHandler
  ]
);

export default router;
