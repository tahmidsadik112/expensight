import { v4 as uuidV4 } from 'uuid';
import { orm } from '../../db';
import { hash } from 'bcrypt';
import { log } from '../../server';
import { findUserById } from '../../user/service';
import { UserAccessTokens as UserAccessToken } from '../../entities';

/*
 * * in a separate function so that we can control the generation logic separately
 */
async function genToken(): Promise<string> {
  const token = await hash(uuidV4(), 12);
  log.info('generated token = ', token);
  return token;
}

export async function generateAndAssociateAccessTokenWithUser(
  userID: number
): Promise<void> {
  const user = await findUserById(userID);
  const token = await genToken();

  const uat = new UserAccessToken({
    user,
    token,
  });

  orm.em.persistAndFlush(uat);
}
