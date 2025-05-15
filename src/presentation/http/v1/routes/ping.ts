import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * @openapi
 * /api/v1/ping:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: OK
 */

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
  
  // TODO stubbed resposne
  const response = {message: "pong"};
  res.status(StatusCodes.OK).json(response);
});

export default router;
