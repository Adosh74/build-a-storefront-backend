import { Pool } from 'pg';
import config from '../config';

const pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: parseInt(config.dbPort as string, 10),
  max: 5,
});

pool.on('error', (error: Error) => {
  console.log(error);
});

export default pool;
