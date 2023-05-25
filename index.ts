import dotenv from 'dotenv';
dotenv.config();

import dbInit from './src/db/init';

import { app } from './src/app';
const port = process.argv.slice(2)[0];

const startup = async () => {
  const env = process.env;

  if (!env.SEND_GRID_KEY) {
    throw new Error('SEND_GRID_KEY environment variable is not configured.');
  }

  if (!env.EMAIL_FROM) {
    throw new Error('EMAIL_FROM environment variable is not configured.');
  }

  if (!env.DB_PASSWORD) {
    throw new Error('DB details are not configured.');
  }

  try {
    dbInit();
    app.listen(port, () => {
      console.log(`Listening on port ${port}!`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startup();
