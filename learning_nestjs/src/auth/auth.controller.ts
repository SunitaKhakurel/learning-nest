import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthSerice } from "./auth.service";
import { AuthDto } from "./dto";
import { ProfileDto } from "./dto/profile.dto";
import { AuthGuard } from "@nestjs/passport";
import { PrismaRolesGuard } from "src/roles/PrismaRolesGuard";

@Controller('auth')
export class AuthController{
constructor(private authService:AuthSerice){}

@Post('signin')
login(@Body() dto:AuthDto){
    return this.authService.signin(dto);
}

@Post('signup')
signup(@Body() dto:AuthDto){
    return this.authService.signup(dto);
}

@Post('createbook')
createBook(@Body() bookData:{userId:number,authorEmail:string,name:string}){
  return this.authService.createBook(bookData.userId,bookData.authorEmail,bookData.name);
}
// @Get('getUser:id')
// getUser(@Param('id') id: string){
//     return this.authService.getUser(id);
// }

@Post('createProfile')
createProfile(@Body() dto:ProfileDto){
  return this.authService.createProfile(dto.userId,dto.about,dto.education);
}


@UseGuards(AuthGuard('jwt'))
@UseGuards(PrismaRolesGuard)
@Get('getUser')
getUser(){
    return this.authService.getUser();
}

@Patch('updateUser/:id')
updateUSer(@Param('id') id: string, @Body() authDto:AuthDto) {
  return this.authService.updateUser(+id, authDto);
}

@Delete('deleteUser/:id')
async remove(@Param('id', ParseIntPipe) id: number) {
  return await this.authService.deleteUser(id);
}


}