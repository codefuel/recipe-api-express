import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

/**
 * @openapi
 * /api/v1/recipe:
 *   post:
 *     summary: Create a new recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the recipe
 *                 example: "Tap Water"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of ingredients
 *                 example: ["1 glass", "1 cup water"]
 *               instructions:
 *                 type: string
 *                 description: Cooking instructions
 *                 example: "Do the thing!"
 *     responses:
 *       200:
 *         description: Recipe successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "OK"
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
router.post('/recipe', (req: Request, res: Response) => {
  
  // TODO stubbed resposne
  const response = {success: "OK"};
  res.status(StatusCodes.OK).json(response);
});

export default router;
