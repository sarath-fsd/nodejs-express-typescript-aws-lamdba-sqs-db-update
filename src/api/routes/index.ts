import { Router, Request, Response } from 'express';

import { v1Router } from './v1';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({ message: `Welcome to the Email SEND EMAIL API!` });
});

router.use('/v1/api', v1Router);

export default router;
