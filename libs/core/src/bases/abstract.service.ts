import { NotFoundException } from '@nestjs/common';

export abstract class AbstractService<T> {
  throwNotFoundException(name: string): NotFoundException {
    throw new NotFoundException(`The ${name} entity is not found.`);
  }
}
