import { SQSHandler } from 'aws-lambda';
import { SendGridEmail } from '../db/services';
import { TriggerEmailProps } from '../db/services/send-grid.service';
import { MAIL_STATUS, updateStatus } from './updateStatus';
import { create as emailRequestCreate } from '../api/controllers/email';
import dbInit from '../db/init';

const receiver: SQSHandler = async (event) => {
  try {
    dbInit();

    const { UPDATE_NOTIFICATION_STATUS_QUEUE_ACCOUNT_ID, UPDATE_NOTIFICATION_STATUS_QUEUE_NAME, UPDATE_NOTIFICATION_STATUS_QUEUE_REGION } =
      process.env;

    const updateStatusQueueDetails = {
      accountId: UPDATE_NOTIFICATION_STATUS_QUEUE_ACCOUNT_ID!,
      queueName: UPDATE_NOTIFICATION_STATUS_QUEUE_NAME!,
      region: UPDATE_NOTIFICATION_STATUS_QUEUE_REGION!,
    };

    console.log('UpdateNotificationStatusQueue Details:', updateStatusQueueDetails);

    let updateStatusDetails = {
      accountId: Number(updateStatusQueueDetails.accountId),
      region: updateStatusQueueDetails.region,
      queueName: updateStatusQueueDetails.queueName,
      requestId: '',
      status: MAIL_STATUS.SUCCESS,
    };

    for (const record of event.Records) {
      try {
        const { messageAttributes, body } = record;
        const { triggerEmailNotificationRequestId } = messageAttributes;

        updateStatusDetails.requestId = triggerEmailNotificationRequestId.stringValue!;

        const { to, subject, htmlMessage, attachments, bcc } = JSON.parse(body) as TriggerEmailProps;

        const dbEmailRequest = {
          notificationRequestId: Number(updateStatusDetails.requestId),
          emailFrom: process.env.EMAIL_FROM!,
          emailTo: to,
          cc: bcc,
          subject: subject,
          htmlMessage: htmlMessage,
          attachments: undefined,
          status: 'FAILED',
        };

        await SendGridEmail.send({
          to,
          bcc: bcc,
          htmlMessage,
          subject,
          attachments,
        });

        dbEmailRequest.status = 'SUCCESS';

        await emailRequestCreate({
          ...dbEmailRequest,
        });
      } catch (error) {
        console.log('Error occurred while sending an email: ', error);
        updateStatusDetails.status = MAIL_STATUS.FAILED;
      }

      const result = await updateStatus({
        ...updateStatusDetails,
      });

      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};
export default receiver;
