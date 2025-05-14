import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

/**
 * @openapi
 * /api/v1/recipe:
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
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: Updated name of the recipe
 *                 example: "Tap Water"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated list of ingredients
 *                 example: ["1 glass", "1 cup water"]
 *               instructions:
 *                 type: string
 *                 description: Updated cooking instructions
 *                 example: "Do the thing!"
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
