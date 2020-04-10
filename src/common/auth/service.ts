import { v4 as uuidV4 } from 'uuid';
import { orm } from '../../db';
import { hash, compare } from 'bcrypt';
import { log } from '../../server';
import { findUserById } from '../../user/service';
import { UserAccessTokens as UserAccessToken, User } from '../../entities';
import { FastifyReply } from 'fastify';
import { addDays } from 'date-fns';
import type { ServerResponse } from 'http';

/*
 * * in a separate function so that we can control the generation logic separately
 */
async function genToken(): Promise<string> {
  return uuidV4();
}

export async function generateAndAssociateAccessTokenWithUser(
  user: number | User
): Promise<UserAccessToken> {
  let userEntity: User | null;

  if (typeof user === 'number') {
    userEntity = await findUserById(user);
    if (!userEntity) {
      throw Error('Invalid UserID');
    }
  } else if (user instanceof User) {
    userEntity = user;
  } else {
    throw Error('Given user has invalid type ');
  }
  const token = await genToken();

  const uat = new UserAccessToken({
    user: userEntity,
    token,
  });

  await orm.em.persistAndFlush(uat);
  return uat;
}

export async function verifyAccessToken(
  userID: number,
  token: string
): Promise<boolean> {
  const user = await orm.em.findOne(UserAccessToken, {
    user: {
      id: userID,
    },
    token,
  });
  return !!user;
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function matchPassword(
  userID: number,
  password: string
): Promise<boolean> {
  const user = await findUserById(userID);
  if (!user) {
    return false;
  }
  log.debug(user);
  return compare(password, user.password);
}

export function setAuthCookie(
  reply: FastifyReply<ServerResponse>,
  token: string
): void {
  reply.setCookie('__estk', token, {
    httpOnly: true,
    signed: true,
    expires: addDays(new Date(), 7),
  });
}
