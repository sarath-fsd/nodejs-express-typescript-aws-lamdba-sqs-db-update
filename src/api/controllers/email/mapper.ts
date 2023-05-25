import { IEmailRequest } from '../../interfaces';
import { IEmailRequestOutput } from '../../../db/models/email-request.model';

export const toEmailRequest = (emailRequest: IEmailRequestOutput): IEmailRequest => {
  return {
    id: emailRequest.id,
    createdAt: emailRequest.createdAt,
    updatedAt: emailRequest.updatedAt,
    deletedAt: emailRequest.deletedAt,
    notificationRequestId: emailRequest.notificationRequestId,
    emailFrom: emailRequest.emailFrom,
    emailTo: emailRequest.emailTo,
    cc: emailRequest.cc,
    subject: emailRequest.subject,
    htmlMessage: emailRequest.htmlMessage,
    attachments: emailRequest.attachments,
    status: emailRequest.status,
  };
};
