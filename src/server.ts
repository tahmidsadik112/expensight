import fastify from 'fastify';
import { AddressInfo } from 'net';
import { port } from '../config';

const app = fastify({ logger: true });
const { log } = app;

app.get('/', async () => {
  return 'hello world';
});

const start = async (): Promise<void> => {
  try {
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
