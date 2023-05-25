import { Optional } from 'sequelize/types';

export type CreateEmailRequestDTO = {
  notificationRequestId: number;
  emailFrom: string;
  emailTo: string;
  cc?: string;
  subject: string;
  htmlMessage: string;
  attachments?: string;
  status: string;
};

export type UpdateEmailRequestDTO = Optional<CreateEmailRequestDTO, 'notificationRequestId'>;

export type FilterEmailRequestsDTO = {
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
