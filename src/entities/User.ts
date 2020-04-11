import {
  Entity,
  PrimaryKey,
  Property,
  Unique,
  OneToMany,
  Collection,
  WrappedEntity,
} from 'mikro-orm';
import { UserAccessToken } from './UserAccessToken';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'text' })
  fullName: string;

  @Unique({ name: 'users_phone_key' })
  @Property({ columnType: 'text' })
  phone: string;

  @Unique({ name: 'users_email_key' })
  @Property({ columnType: 'text' })
  email: string;

  @Property({ columnType: 'text' })
  password: string;

  @Property({
    columnType: 'timestamp',
    length: 6,
    default: 'CURRENT_TIMESTAMP',
  })
  created_at!: Date;

  @Property({
    columnType: 'timestamp',
    length: 6,
    default: 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;

  @OneToMany(() => UserAccessToken, uat => uat.user)
  accessTokens = new Collection<UserAccessToken>(this);

  constructor({
    fullName,
    phone,
    email,
    password,
  }: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }) {
    this.fullName = fullName;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }
}

export interface User extends WrappedEntity<User, 'id'> {}
