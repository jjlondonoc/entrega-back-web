import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class UseRoleGuard implements CanActivate {

    constructor(private reflector: Reflector) {}
    canActivate(
        context: ExecutionContext,
    ):  boolean | Promise<boolean> | Observable<boolean> {

        const validRoles = this.reflector.get<string[]>('roles', context.getHandler()); // Extraemos los roles del decorador
        if(!validRoles) {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        for(const rol of user.roles){
            if(validRoles.includes(rol)) return true;
        }
        throw new UnauthorizedException('No permitido');
    }
}