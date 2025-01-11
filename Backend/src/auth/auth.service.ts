import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { Employee } from '../employee/entities/employee.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { EmployeeRepository } from '../employee/employee.repository';
import { JwtService  } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    
    constructor(
        private readonly employeeRepository: EmployeeRepository,
        private readonly jwtService: JwtService
    ){
    }

    async signUp(signUpDto : SignUpDto){

        const {password, email, name, group}  = signUpDto;

        if(await this.employeeRepository.findByEmail(email)){
            throw new ConflictException("This email is already user, try another one!");
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newEmployee = new Employee(
            name,
            email,
            hashedPassword,
            group
        );

        await this.employeeRepository.save(newEmployee);
        return newEmployee;

    }

    async login(authCredentialsDto: AuthCredentialsDto){
        const {email, password} = authCredentialsDto;

        const employee = await this.employeeRepository.findByEmail(email);
        if(!employee){
            throw new NotFoundException("Employee not found!");
        }
        if(employee.group !== "HR"){
            throw new UnauthorizedException("Only HRs can login");
        }
        
        const isMatch = await bcrypt.compare(password, employee.password);
        if(!isMatch){
            throw new UnauthorizedException("Wrong email or password");
        }
         
        const payload = {employeeId: employee.id};
        const token = await this.jwtService.signAsync(payload);
        return { token };
    }

}
