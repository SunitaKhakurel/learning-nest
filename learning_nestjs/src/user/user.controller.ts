import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { AuthSerice } from 'src/auth/auth.service';
import { PrismaRolesGuard } from 'src/roles/PrismaRolesGuard';
import { Roles } from 'src/roles/roles.decorator';


@Controller('users')
@UseGuards(AuthGuard('jwt'))
@UseGuards(PrismaRolesGuard)
export class UserController {
constructor(authservice:AuthSerice){}
    
    @Get('me')
    getMe(@Req() req:Request){
        // console.log({
        //     user:req.user,
        // });
        // return 'user info'
        
        return req.user;
    }
}
