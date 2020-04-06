import {
  Cascade,
  Entity,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from 'mikro-orm';
import { Users } from './Users';

@Entity()
export class UserAccessTokens {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => Users, cascade: [Cascade.MERGE] })
  user!: Users;

  @Property({ columnType: 'INTc' })
  userID: number;

  @Unique({ name: 'user_access_tokens_token_key' })
  @Property({ columnType: 'text' })
  token!: string;

  @Index({ name: 'user_tokens_expires_at_idx' })
  @Property({
    columnType: 'timestamp',
    length: 6,
    default: "(CURRENT_TIMESTAMP + '01:00:00'::interval)",
  })
  expiresAt?: Date;

  @Property({
    columnType: 'timestamp',
    length: 6,
    default: 'CURRENT_TIMESTAMP',
  })
  created!: Date;

  @Property({
    columnType: 'timestamp',
    length: 6,
    default: 'CURRENT_TIMESTAMP',
  })
  modified!: Date;

  constructor({
    user,
    token,
    expiresAt,
  }: {
    user: Users;
    token: string;
    expiresAt?: Date;
  }) {
    this.user = user;
    this.token = token;
    if (expiresAt) {
      this.expiresAt = expiresAt;
    }
  }
}
