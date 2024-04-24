import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthSerice } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";
import { PrismaRolesGuard } from "src/roles/PrismaRolesGuard";
import { APP_GUARD } from "@nestjs/core";


@Module({

    imports:[JwtModule.register({})], 
    controllers:[AuthController],
    providers:[AuthSerice,JwtStrategy,],
   exports:[AuthSerice,JwtStrategy]
})
export class AuthModule{

}