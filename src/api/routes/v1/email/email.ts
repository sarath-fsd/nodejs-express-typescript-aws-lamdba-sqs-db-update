import { Router, Request, Response } from 'express';

import { SendGridEmail } from '../../../../db/services';
import { create as emailRequestCreate } from '../../../controllers/email';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  let statusCode = 200;

  const { to, cc, subject, htmlMessage, attachments, requestId } = req.body;

  const dbEmailRequest = {
    notificationRequestId: Number(requestId),
    emailFrom: process.env.EMAIL_FROM!,
    emailTo: to,
    cc: cc,
    subject: subject,
    htmlMessage: htmlMessage,
    attachments: attachments,
    status: 'FAILED',
  };

  try {
    await SendGridEmail.send({
      to,
      bcc: cc,
      htmlMessage,
      subject,
      attachments,
    });

    dbEmailRequest.status = 'SUCCESS';

    statusCode = 200;
  } catch (error) {
    dbEmailRequest.status = 'FAILED';
    statusCode = 400;
    console.log('Error: ' + JSON.stringify(error));
  }

  await emailRequestCreate({
    ...dbEmailRequest,
  });

  res.status(statusCode).send(`${statusCode === 200 ? 'Email sent successfully' : 'Error occurred while sending an email.'}`);
});

export { router as emailRouter };
