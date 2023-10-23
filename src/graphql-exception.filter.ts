/* eslint-disable prettier/prettier */
import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { EntityNotFoundException } from './filters/entity-notfound-error';

@Catch(EntityNotFoundException)
export class EntityNotFoundError implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    GqlArgumentsHost.create(host);
    return new NotFoundException('Entity not found');
  }
}
