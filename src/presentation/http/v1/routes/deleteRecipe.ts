import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.delete('/recipe', (req: Request, res: Response) => {
  
  // TODO stubbed resposne
  const response = {success: "OK"};
  res.status(StatusCodes.OK).json(response);
});

export default router;
