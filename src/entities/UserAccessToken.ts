import {
  Cascade,
  Entity,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from 'mikro-orm';
import { User } from './User';

@Entity({ tableName: 'user_access_tokens' })
export class UserAccessToken {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => User, cascade: [Cascade.MERGE] })
  user!: User;

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
    user: User;
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
