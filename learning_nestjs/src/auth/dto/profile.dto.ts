import { IsNotEmpty, IsString, isString } from "class-validator";

export class ProfileDto{
    
    @IsString()
    about: string;

    @IsString()
    education:string;
    @IsNotEmpty()
    userId:number;

}