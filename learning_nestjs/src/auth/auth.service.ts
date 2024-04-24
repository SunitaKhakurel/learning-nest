import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthLogin } from "./dto/authlogin.dto";
import { connect } from "http2";
import { Role } from "@prisma/client";
@Injectable({})
export class AuthSerice{
constructor(
    private prisma:PrismaService,
    private jwt:JwtService,
    private config:ConfigService,
){ }

async signup(dto: AuthDto){
    //generate the password hash
    const hash=await argon.hash(dto.password)
    console.log(hash);

    //save the new user in the db
    try{
    const user= await this.prisma.user.create({
        data:{
            email:dto.email,
            password:hash,
        },
    });

    //return the saved user
    return this.signToken(user.id,user.email,user.roles);
}catch(error){
    if(error instanceof PrismaClientKnownRequestError){
       if(error.code === 'P2002'){
        throw new ForbiddenException('credentials taken')
       } 
    }
    throw error;
}
}

async signin(dto: AuthLogin){
   const user=await this.prisma.user.findUnique({
    where:{
        email:dto.email,
    },
   }) ;
   if(!user){
    throw new ForbiddenException(
        'credentials incorrect'
    );
   }
   const pwMatches=await argon.verify(
    user.password,
    dto.password,
   );
   if(!pwMatches)
    throw new ForbiddenException(
        'credentials incorrect'
    );
    // delete user.hash;
    console.log('hhhhhhhhhhhhhhhhh',user.roles,user.id)
    return this.signToken(user.id,user.email,user.roles);
}

async getUser(){
    // return await this.prisma.user.findMany();
    return await this.prisma.authorizaton.findFirst({
        where: { role: { role:'User' } },
      });
}

async updateUser(id: number,authDto:AuthDto){
    return await this.prisma.user.update({
        where: { id },
        data:{email: authDto.email,
        name: authDto.name,
        password:authDto.password,
    }
})
}

async deleteUser(id:number){
    return await this.prisma.user.delete({
        where: { id },
      });
}

async signToken(userId:number,email:string,roles: Role[]):Promise<{access_token:string}>{
    const payload={
        sub:userId,
        email,
        roles,
    };
    const secret=this.config.get('JWT_SECRET')
    console.log(secret);
    const token=await this.jwt.signAsync(payload,{
        expiresIn:'15m',
        secret:secret,

    })
    return {
        access_token:token
    } 
}



//one-to-many
async createBook(userId:number,authorEmail:string,name:string ){
    return this.prisma.book.create({
        data: {
        authorEmail,
          name,
          user: { connect: { id: userId } },
        },
      });    

}


async createProfile(userId:number,about:string,education:string){
    return this.prisma.profile.create({
        data:{
            about,
            education,
            user:{connect:{id:userId}},
        }
    })

   
}

}