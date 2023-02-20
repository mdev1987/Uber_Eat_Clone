import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requestContext = GqlExecutionContext.create(context);
    const request = requestContext.getContext()?.req;
    const token = request?.headers['authorization'];
    const payload = this.jwtService.verifyToken(token);
    request.user = payload;
    return Boolean(payload);
  }
}
