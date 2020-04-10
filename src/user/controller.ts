import type {
  FastifyInstance,
  RegisterOptions,
  FastifyRequest,
  FastifyReply,
  Plugin,
} from 'fastify';

import type { Server, IncomingMessage, ServerResponse } from 'http';
import { userSchema, loginSchema } from './validation-schemas';
import { createUser, findUserByEmail } from './service';
import {
  generateAndAssociateAccessTokenWithUser,
  matchPassword,
  setAuthCookie,
} from '../common/auth';

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
    async function (
      req: FastifyRequest,
      reply: FastifyReply<ServerResponse>
    ): Promise<{
      fullName: string;
      phone: string;
      email: string;
      accessToken: string;
    }> {
      const { name, email, password, phone } = req.body;

      const user = await createUser({
        fullName: name,
        email,
        password,
        phone,
      });
      const uat = await generateAndAssociateAccessTokenWithUser(user);
      setAuthCookie(reply, uat.token);
      return {
        fullName: name,
        phone,
        email,
        accessToken: uat.token,
      };
    }
  );

  fastify.post(
    '/login',
    {
      schema: {
        body: loginSchema,
      },
    },
    async function loginHandler(
      req: FastifyRequest,
      reply: FastifyReply<ServerResponse>
    ) {
      const { email, password } = req.body;
      const user = await findUserByEmail(email);
      if (!user) {
        throw fastify.httpErrors.unauthorized(
          'Incorrect email/password combination'
        );
      }
      if (!(await matchPassword(user.id, password))) {
        fastify.log.debug('password did not match');
        throw fastify.httpErrors.unauthorized(
          'Incorrect email/password combination'
        );
      }

      const uat = await generateAndAssociateAccessTokenWithUser(user);

      setAuthCookie(reply, uat.token);

      return {
        fullName: user.fullName,
        phone: user.phone,
        email,
        accessToken: uat.token,
      };
    }
  );

  next();
};
