import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsEmail()
    email: string;

    @IsEnum(["INTERN" , "EMPLOYEE" , "ADMIN"],{
        message:"Valid role required"
    })
    role: 'INTERN' | 'EMPLOYEE' | 'ADMIN'

}