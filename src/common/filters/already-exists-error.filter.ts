import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AlreadyExistsError } from '../errors';
import { Response } from 'express';

@Catch(AlreadyExistsError)
export class AlreadyExistsErrorFilter implements ExceptionFilter {
  catch(exception: AlreadyExistsError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 409;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
