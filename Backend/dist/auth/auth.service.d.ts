import { SignUpDto } from './dto/sign-up.dto';
import { Employee } from '../employee/entities/employee.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { EmployeeRepository } from '../employee/employee.repository';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly employeeRepository;
    private readonly jwtService;
    constructor(employeeRepository: EmployeeRepository, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<Employee>;
    login(authCredentialsDto: AuthCredentialsDto): Promise<{
        token: string;
    }>;
}
