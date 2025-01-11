import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Group as Role } from './enums/group.enum';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    getAllEmployees(date: string): Promise<{
        id: string;
        name: string;
        email: string;
        group: Role;
        attendanceStatus: string;
    }[]>;
    getEmployeeById(id: string): Promise<Employee>;
    addEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    deleteEmployee(id: string): Promise<void>;
}
