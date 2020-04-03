import { Entity, PrimaryKey, Property } from 'mikro-orm';

@Entity()
export class Transactions {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'text', default: "'expense'" })
  type!: string;

  @Property({ columnType: 'text' })
  title!: string;

  @Property({ columnType: 'float8' })
  amount!: number;

  @Property({ columnType: 'text' })
  category!: string;

  @Property({ columnType: 'text', nullable: true })
  subCategory?: string;

  @Property({ columnType: 'text' })
  account!: string;

  @Property()
  userid!: number;

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
}
