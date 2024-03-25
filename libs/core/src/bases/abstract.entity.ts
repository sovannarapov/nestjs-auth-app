import { PrimaryGeneratedColumn } from 'typeorm';

import { AbstractBaseEntity } from './abstract-base-entity';

export abstract class AbstractEntity extends AbstractBaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id!: number;
}
