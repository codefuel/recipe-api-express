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
