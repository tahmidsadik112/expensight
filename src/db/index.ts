import { db } from './../../config';
import {
  MikroORM,
  Options,
  Connection,
  IDatabaseDriver,
  RequestContext,
} from 'mikro-orm';
import { ConnectionString } from 'connection-string';
import { User, Transaction, UserAccessTokens } from '../entities/index';
import { log } from '../server';

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

export let orm: MikroORM<IDatabaseDriver<Connection>>;

export async function initializeORM(): Promise<void> {
  log.info('Initializing orm');
  orm = await MikroORM.init({
    entities: [User, UserAccessTokens, Transaction],
    entitiesDirs: ['./dist/src/entities'],
    entitiesDirsTs: ['./src/entities'],
    dbName: database,
    type: 'postgresql',
    discovery: { warnWhenNoEntities: false },
    clientUrl: cs.toString(),
    debug: process.env.NODE_ENV === 'development',
    logger: log,
  } as Options);
}

// @ts-ignore
export const refreshCtx = function (_req, _res, next): void {
  log.info('refreshing entity manager context');
  RequestContext.create(orm.em, next);
};
