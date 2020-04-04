import type {
  FastifyInstance,
  RegisterOptions,
  FastifyRequest,
  FastifyReply,
  Plugin,
} from 'fastify';

import type { Server, IncomingMessage, ServerResponse } from 'http';

import { userSchema } from './validation-schemas';
import { createUser } from './service';
import { Users as User } from '../entities';

type Request = IncomingMessage;
type Response = ServerResponse;

type RoutePlugin = Plugin<
  Server,
  Request,
  Response,
  RegisterOptions<Server, Request, Response>
>;

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

  fastify.post(
    '/',
    {
      schema: {
        body: userSchema,
      },
    },
    async function (req: FastifyRequest): Promise<User> {
      const { name, email, password, phone } = req.body;

      const user = await createUser({
        fullName: name,
        email,
        password,
        phone,
      });

      return user;
    }
  );

  next();
};
