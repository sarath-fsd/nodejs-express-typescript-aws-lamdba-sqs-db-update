import { Router } from 'express';
import { emailRouter } from './email/email';

const router = Router();

router.use('/email', emailRouter);

export { router as v1Router };
