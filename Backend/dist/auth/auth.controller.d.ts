import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { Employee } from '../employee/entities/employee.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(authCredentialsDto: AuthCredentialsDto): Promise<{
        token: string;
    }>;
    signUp(signUpDto: SignUpDto): Promise<Employee | null>;
}
