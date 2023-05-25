import { kebabCase } from 'lodash';

import * as emailRequestDal from '../dal/email-request.dal';
import { GetAllEmailRequestsFilters } from '../dal/types';
import { IEmailRequestInput, IEmailRequestOutput } from '../models/email-request.model';

export const create = async (payload: IEmailRequestInput): Promise<IEmailRequestOutput> => {
  const notificationRequestId = payload.notificationRequestId;
  const notificationRequestExists = await emailRequestDal.checkNotificationRequestExists(notificationRequestId);

  if (notificationRequestExists) {
    throw new Error(`Notification request with the id ${notificationRequestId} is already exists.`);
  }

  return emailRequestDal.create(payload);
};

export const update = async (id: number, payload: Partial<IEmailRequestInput>): Promise<IEmailRequestOutput> => {
  const notificationRequestId = payload.notificationRequestId;

  if (!notificationRequestId) {
    throw new Error(`Notification request with the id ${notificationRequestId} doesn't exists.`);
  }

  const notificationRequestExists = await emailRequestDal.checkNotificationRequestExists(notificationRequestId);

  if (!notificationRequestExists) {
    throw new Error(`Notification request with the id ${notificationRequestId} doesn't exists.`);
  }

  return emailRequestDal.update(id, payload);
};

export const getById = (id: number): Promise<IEmailRequestOutput> => {
  return emailRequestDal.getById(id);
};

export const deleteById = (id: number): Promise<boolean> => {
  return emailRequestDal.deleteById(id);
};

export const getAll = (filters: GetAllEmailRequestsFilters): Promise<IEmailRequestOutput[]> => {
  return emailRequestDal.getAll(filters);
};
