import { BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractBaseEntity {
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }
}
