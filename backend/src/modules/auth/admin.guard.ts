import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const path = request.path || '';

    // Only apply to /api/admin routes
    if (!path.startsWith('/api/admin')) {
      return true;
    }

    // Otherwise, use the standard JWT Guard logic which calls Strategy.validate
    return super.canActivate(context);
  }
}
