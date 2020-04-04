import { db } from './../../config';
import {
  MikroORM,
  Options,
  Connection,
  IDatabaseDriver,
  RequestContext,
} from 'mikro-orm';
import { ConnectionString } from 'connection-string';
import { Users, Transactions, UserAccessTokens } from '../entities/index';
import { FastifyInstance, RegisterOptions, Logger } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

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

export async function initializeORM(logger?: Logger): Promise<void> {
  logger ? logger.info('Initializing orm') : console.log('initializing ORM');
  orm = await MikroORM.init({
    entities: [Users, UserAccessTokens, Transactions],
    entitiesDirs: ['./dist/src/entities'],
    entitiesDirsTs: ['./src/entities'],
    dbName: database,
    type: 'postgresql',
    discovery: { warnWhenNoEntities: false },
    clientUrl: cs.toString(),
    debug: process.env.NODE_ENV === 'development',
    logger,
  } as Options);
}

export const mikroORMRefreshContextPlugin = async function (
  { log }: FastifyInstance,
  _options: RegisterOptions<Server, IncomingMessage, ServerResponse>,
  // @ts-ignore
  next: (...args: any[]) => any
): Promise<void> {
  if (!orm) {
    log.warn('orm object is null, reinitializing...');
    await initializeORM(log);
  }

  if (orm) {
    log.info('refreshing mikro-orm context');
    RequestContext.create(orm.em, next);
  }
  throw Error('Cannot initalize context as orm is null');
};
