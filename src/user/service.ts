import { orm } from '../db';
import { Users as User } from '../entities';

export async function createUser({
  fullName,
  email,
  password,
  phone,
}: {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}): Promise<User> {
  const user = new User({
    fullName,
    email,
    password,
    phone,
  });

  await orm.em.persistAndFlush(user);

  return user;
}
