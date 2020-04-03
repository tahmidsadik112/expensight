import { PostgreSQLDatabaseEngine } from '@synor/database-postgresql';
import { FileSourceEngine } from '@synor/source-file';
import path from 'path';
import { db } from './config';
import { ConnectionString } from 'connection-string';

const { username: user, password, host, port, database } = db;

const migrationFilesPath = `file://${path.resolve(__dirname, './migrations')}`;

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

const synorCLIConfig = {
  databaseEngine: PostgreSQLDatabaseEngine,
  databaseUri,
  sourceEngine: FileSourceEngine,
  sourceUri: migrationFilesPath,

  baseVersion: '0000',
  recordStartId: 1,
  migrationInfoNotation: {
    do: 'do',
    undo: 'undo',
    separator: '.',
  },
};

export default synorCLIConfig;
