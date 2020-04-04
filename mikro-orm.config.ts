import { db } from './config';
import { Options } from 'mikro-orm';
import { ConnectionString } from 'connection-string';
import { Users } from './src/entities/Users';
import { UserAccessTokens } from './src/entities/UserAccessTokens';
import { Transactions } from './src/entities/Transactions';

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
  entities: [Users, UserAccessTokens, Transactions],
  entitiesDirs: ['./dist/src/entities'],
  entitiesDirsTs: ['./src/entities'],
  dbName: database,
  type: 'postgresql',
  discovery: { warnWhenNoEntities: false },
  clientUrl: databaseUri,
  debug: true,
} as Options;

export default configs;
