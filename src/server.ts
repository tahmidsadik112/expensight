import fastify from 'fastify';
import { AddressInfo } from 'net';
import { port } from '../config';
import { router as userRouter } from './user/controller';
import fastifyFavicon from 'fastify-favicon';
import { initializeORM, mikroORMRefreshContextPlugin } from './db';

const app = fastify({ logger: { level: 'info', prettyPrint: true } });
const { log } = app;

app.register(fastifyFavicon);

app.register(mikroORMRefreshContextPlugin);
app.register(userRouter, {
  prefix: '/user',
});

app.get('/', async () => {
  return 'hello world';
});

const start = async (): Promise<void> => {
  try {
    await initializeORM(log);
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
