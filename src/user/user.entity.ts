import { Column, Entity } from 'typeorm';
import { AbstractSoftDeleteEntity } from 'libs/core/src';

@Entity()
export class User extends AbstractSoftDeleteEntity {
  @Column()
  identifier: string;

  @Column()
  password: string;
}
