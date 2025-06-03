import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 获取当前用户装饰器
 */
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);