import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { Group } from "../../employee/enums/group.enum"

export class SignUpDto {
    
    @IsNotEmpty()
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(3, {message: 'Password is too short'})
    @MaxLength(10, {message: 'Password is too long'})
    password: string

    @IsEnum(Group)
    group?: Group

}