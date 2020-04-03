import config from 'config';

interface DBConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const db: DBConfig = config.get('db');
const port: number = config.get('port');
const killTimeout: number = config.get('killTimeout');

export { db, port, killTimeout };
