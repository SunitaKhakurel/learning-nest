import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';

import { APP_GUARD } from '@nestjs/core';
import { PrismaRolesGuard } from './roles/PrismaRolesGuard';
import { UserModule } from './user/user.module';
import { AuthSerice } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  // providers:[{
  //   provide: APP_GUARD,
  //   useClass: PrismaRolesGuard,
  // },],
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   password: 'sunita',
    //   username: 'postgres',
    //   entities: [StudentEntity],
    //   database: 'learnignest',
    //   synchronize: true,
    //   logging: true,
    // }),
    AuthModule,UserModule,PrismaModule,ConfigModule.forRoot({
      isGlobal:true
    }),
    JwtModule.register({}),
  ],
  controllers: [UserController],
  
  
})
export class AppModule {}
