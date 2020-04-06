import fastify from 'fastify';
import { AddressInfo } from 'net';
import fastifyFavicon from 'fastify-favicon';
import fastifySensible from 'fastify-sensible';
import { port } from '../config';
import { router as userRouter } from './user/controller';
import { initializeORM, refreshCtx } from './db/index';

const app = fastify({ logger: { level: 'info', prettyPrint: true } });
export const { log } = app;

app.register(fastifyFavicon);
app.register(fastifySensible);

app.register(userRouter, {
  prefix: '/user',
});

app.addHook('preHandler', refreshCtx);

app.get('/', async () => 'hello world');

const start = async (): Promise<void> => {
  try {
    await initializeORM();
    await app.listen(port);
    log.info(
      `server listening on ${(app.server.address() as AddressInfo).port}`
    );
  } catch (err) {
    log.error(err);
    log.error('exiting...');
    process.exit(1);
  }
};

start();
