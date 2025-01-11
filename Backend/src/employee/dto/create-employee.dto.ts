import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { Group } from "src/employee/enums/group.enum"

export class CreateEmployeeDto {
    
    @IsNotEmpty()
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(3, {message: 'Password is too short'})
    @MaxLength(10, {message: 'Password is too long'})
    password: string

}