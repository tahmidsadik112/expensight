import { db } from './config';
import { Options } from 'mikro-orm';
import { ConnectionString } from 'connection-string';
import { User } from './src/entities/User';
import { UserAccessToken } from './src/entities/UserAccessToken';
import { Transaction } from './src/entities/Transaction';

const { host, port, password, database, username: user } = db;

const cs = new ConnectionString('');
cs.setDefaults({
  user,
  password,
  hosts: [
    {
      name: host,
      port,
    },
  ],
  protocol: 'postgresql',
  path: [database],
});

const databaseUri = cs.toString();

const configs = {
  entities: [User, UserAccessToken, Transaction],
  entitiesDirs: ['./dist/src/entities'],
  entitiesDirsTs: ['./src/entities'],
  dbName: database,
  type: 'postgresql',
  discovery: { warnWhenNoEntities: false },
  clientUrl: databaseUri,
  debug: true,
} as Options;

export default configs;
