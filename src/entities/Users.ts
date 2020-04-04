import { Entity, PrimaryKey, Property, Unique } from 'mikro-orm';

@Entity()
export class Users {
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
  created!: Date;

  @Property({
    columnType: 'timestamp',
    length: 6,
    default: 'CURRENT_TIMESTAMP',
  })
  modified!: Date;

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
