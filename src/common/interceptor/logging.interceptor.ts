
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  obfuscateData(data) {
    if (!data) {
        return data
    }
    var offuscateRequest = JSON.parse(JSON.stringify(data));
    if (offuscateRequest && offuscateRequest.token)
        offuscateRequest.token = '*******';
    if (offuscateRequest && offuscateRequest.password)
        offuscateRequest.password = '*******';
    return offuscateRequest
  }

  log(start, req) {
    let line = `${new Date(start)} [${Date.now() - start}ms]: `
    line += `${req.method} ${req.path} ${JSON.stringify(this.obfuscateData(req.query))}`
    console.log(line)
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const start = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => this.log(start, req))
      )
  }
}