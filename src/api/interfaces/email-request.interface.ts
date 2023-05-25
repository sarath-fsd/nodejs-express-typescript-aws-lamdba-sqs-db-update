export interface IEmailRequest {
  id: number;
  notificationRequestId: number;
  emailFrom: string;
  emailTo: string;
  cc?: string;
  subject: string;
  htmlMessage: string;
  attachments?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
