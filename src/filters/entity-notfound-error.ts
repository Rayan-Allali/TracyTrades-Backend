/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(entityName: string, entityId: number) {
    super(`${entityName} with id ${entityId} not found`);
  }
}
