import * as service from '../../../db/services/email-request.service';
import { CreateEmailRequestDTO, UpdateEmailRequestDTO, FilterEmailRequestsDTO } from '../../dtos/email-request.dto';
import { IEmailRequest } from '../../interfaces';
import * as mapper from './mapper';

export const create = async (payload: CreateEmailRequestDTO): Promise<IEmailRequest> => {
  return mapper.toEmailRequest(await service.create(payload));
};

export const update = async (id: number, payload: UpdateEmailRequestDTO): Promise<IEmailRequest> => {
  return mapper.toEmailRequest(await service.update(id, payload));
};

export const getById = async (id: number): Promise<IEmailRequest> => {
  return mapper.toEmailRequest(await service.getById(id));
};

export const deleteById = async (id: number): Promise<Boolean> => {
  const isDeleted = await service.deleteById(id);

  return isDeleted;
};

export const getAll = async (filters: FilterEmailRequestsDTO): Promise<IEmailRequest[]> => {
  return (await service.getAll(filters)).map(mapper.toEmailRequest);
};
