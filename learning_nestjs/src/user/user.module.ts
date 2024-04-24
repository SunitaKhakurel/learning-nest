import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { APP_GUARD } from "@nestjs/core";
import { PrismaRolesGuard } from "src/roles/PrismaRolesGuard";
import { AuthSerice } from "src/auth/auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";

@Module({
    controllers:[UserController],
    // providers: [
    //     {
    //       provide: APP_GUARD,
    //       useClass: PrismaRolesGuard,
    //     },
    //   ],
     imports:[
        JwtModule.register({}),AuthModule
     ]
     
})

export class UserModule{}