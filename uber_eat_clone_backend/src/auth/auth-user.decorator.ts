import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const requestContext = GqlExecutionContext.create(context);
    const request = requestContext.getContext().req;
    return request.user;
  },
);
