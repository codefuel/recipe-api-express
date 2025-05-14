import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

/**
 * @openapi
 * /v1/recipe:
 *   put:
 *     summary: Update an existing recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID of the recipe to update
 *               name:
 *                 type: string
 *                 description: Updated name of the recipe
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated list of ingredients
 *               instructions:
 *                 type: string
 *                 description: Updated cooking instructions
 *     responses:
 *       200:
 *         description: Recipe successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "OK"
 *       400:
 *         description: Invalid request body
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
router.put('/recipe', (req: Request, res: Response) => {
  
  // TODO stubbed resposne
  const response = {success: "OK"};
  res.status(StatusCodes.OK).json(response);
});

export default router;
