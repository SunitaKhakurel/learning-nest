import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtPayload } from './interfaces/jwt.payload';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthSerice } from 'src/auth/auth.service';

@Injectable()
export class PrismaRolesGuard implements CanActivate {
  constructor(
   
    private jwtService:JwtService,
    private prisma:PrismaService,
    private service:AuthSerice,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('hello000000');
    const request: Request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    console.log(authorizationHeader);
    if (!authorizationHeader) {
      console.log('hello');
      return false;
    }
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.substring('Bearer '.length);
      try {
        console.log('sunita' + process.env.JWT_SECRET);
        const jwtPayload: jwtPayload = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        });

        const userRole: Role[] = jwtPayload.roles;
          console.log("kkkkkkkkk",jwtPayload)
          console.log("zzzzzzzzzzzzzz",userRole)
        return await this.checkAuthorization(userRole);
       
      } catch (error) {
        throw new UnauthorizedException(error);
      }
    } else {
      throw new UnauthorizedException(
        'Invalid or missing Authorization Bearer header',
      );
    }

    throw new Error('Method not implemented.');
  }

  private async checkAuthorization(roles: Role[]): Promise<boolean> {
    console.log('hello', roles);
    // this.logger.debug('Authorization check',{role});
try{
  const authorized = await this.prisma.authorizaton.findFirst({
    where: { role: { role: { in: roles } } }, // Update this line
  });
  
   

    console.log('roleuuuuuuuuu', authorized.roleId);
    return !!authorized;
  }catch(error){
    console.log(error);
  }
   
  }
}
