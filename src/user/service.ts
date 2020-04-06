import { orm } from '../db';
import { User } from '../entities';
import { hashPassword } from '../common/auth';

export async function findUserById(userID: number): Promise<User | null> {
  const user = await orm.em.findOne(User, {
    id: userID,
  });
  return user;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const user = await orm.em.findOne(User, {
    email,
  });
  return user;
}

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
  const hashedPassword = await hashPassword(password);

  const user = new User({
    fullName,
    email,
    password: hashedPassword,
    phone,
  });

  await orm.em.persistAndFlush(user);

  return user;
}
