import { EmployeeRepository } from './employee.repository';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
export declare class EmployeeService {
    private readonly employeeRepository;
    constructor(employeeRepository: EmployeeRepository);
    addEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    findAllEmployeesByDate(date: string): Promise<{
        id: string;
        name: string;
        email: string;
        group: import("./enums/group.enum").Group;
        attendanceStatus: string;
    }[]>;
    findEmployeeById(id: string): Promise<Employee>;
    updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    deleteEmployee(id: string): Promise<void>;
}
