import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthLogin{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password:string
}