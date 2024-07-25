import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LogService } from '../services/log.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const cronjobId = request.headers['cronjob-id'] || 'unknown';
    const now = Date.now();

    const method = request.method;
    const url = request.url;

    this.logService.logInfo(cronjobId, `Starting request to ${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        this.logService.logInfo(
          cronjobId,
          `Request to ${method} ${url} took ${duration}ms`,
        );
      }),
      catchError((error) => {
        const duration = Date.now() - now;
        const errorMessage = `Request to ${method} ${url} failed after ${duration}ms`;
        const stack = error.stack || 'No stack trace available';
        this.logService.logError(cronjobId, errorMessage, stack);
        return throwError(() => error);
      }),
    );
  }
}
