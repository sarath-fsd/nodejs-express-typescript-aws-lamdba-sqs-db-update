import { EmailRequest } from './models/index';

const isDev = process.env.NODE_ENV === 'development';

const dbInit = () => {
  EmailRequest.sync({ alter: isDev });
};

export default dbInit;
