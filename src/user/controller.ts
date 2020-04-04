import type {
  FastifyInstance,
  RegisterOptions,
  FastifyRequest,
  FastifyReply,
  Plugin,
} from 'fastify';

import type { Server, IncomingMessage, ServerResponse } from 'http';
import { Users as User } from './../entities/Users';
import { orm } from './../db';

type Request = IncomingMessage;
type Response = ServerResponse;

type RoutePlugin = Plugin<
  Server,
  Request,
  Response,
  RegisterOptions<Server, Request, Response>
>;

async function createUserHandler(req: FastifyRequest): Promise<string> {
  console.log(req.body);

  const user = new User({
    fullName: 'Tahmid Sadik',
    email: 'tahmid@tahmidsadik.com',
    phone: '01770169762',
    password: 'lskdjflsdjflskkjflskdjfnviqitp23993809cv',
  });

  orm.em.persistAndFlush(user);

  console.log(user);

  return 'request received';
}

export const router: RoutePlugin = function (
  fastify: FastifyInstance,
  _options: RegisterOptions<Server, Request, Response>,
  next: Function
): void {
  fastify.get('/', async function (
    _req: FastifyRequest,
    _res: FastifyReply<ServerResponse>
  ): Promise<string> {
    return 'hello world';
  });

  fastify.post('/', createUserHandler);

  next();
};
