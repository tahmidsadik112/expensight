import { v4 as uuidV4 } from 'uuid';
import { orm } from '../../db';
import { hash } from 'bcrypt';
import { log } from '../../server';
import { Users as User } from '../../entities';

/*
 * * in a separate method so that we can control the generation logic separately
 */
async function genToken(): Promise<string> {
  const token = await hash(uuidV4(), 12);
  log.info('generated token = ', token);
  return token;
}

export async function generateAndAssociateAccessTokenWithUser(
  userID: number
): Promise<void> {
  const user = await orm.em.findOneOrFail(User, { id: userID }, [
    'accessTokens',
  ]);

  const token = await genToken();
  console.log(user, token);
}
