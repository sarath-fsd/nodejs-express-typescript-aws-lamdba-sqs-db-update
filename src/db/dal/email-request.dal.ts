import { Op } from 'sequelize';
import { isEmpty } from 'lodash';

import { GetAllEmailRequestsFilters } from './types';
import { EmailRequest } from '../models';
import { IEmailRequestInput, IEmailRequestOutput } from '../models/email-request.model';

export const create = async (payload: IEmailRequestInput): Promise<IEmailRequestOutput> => {
  const emailRequest = await EmailRequest.create(payload);
  return emailRequest;
};

export const update = async (id: number, payload: Partial<IEmailRequestInput>): Promise<IEmailRequestOutput> => {
  const emailRequest = await EmailRequest.findByPk(id);
  if (!emailRequest) {
    // @todo throw custom error
    throw new Error('not found');
  }
  const updatedEmailRequest = await (emailRequest as EmailRequest).update(payload);
  return updatedEmailRequest;
};

export const getById = async (id: number): Promise<IEmailRequestOutput> => {
  const emailRequest = await EmailRequest.findByPk(id);
  if (!emailRequest) {
    // @todo throw custom error
    throw new Error('not found');
  }
  return emailRequest;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedEmailRequestCount = await EmailRequest.destroy({
    where: { id },
  });
  return !!deletedEmailRequestCount;
};

export const getAll = async (filters?: GetAllEmailRequestsFilters): Promise<IEmailRequestOutput[]> => {
  return EmailRequest.findAll();
  // return EmailRequest.findAll({
  //   where: {
  //     ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
  //   },
  //   ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
  // });
};

export const checkNotificationRequestExists = async (notificationRequestId: number): Promise<boolean> => {
  const emailRequestWithNotificationRequest = await EmailRequest.findOne({
    where: {
      notificationRequestId,
    },
  });

  return !isEmpty(emailRequestWithNotificationRequest);
};
