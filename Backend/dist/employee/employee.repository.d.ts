import { Repository } from "typeorm";
import { Employee } from "./entities/employee.entity";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
export declare class EmployeeRepository {
    private readonly employeeRepository;
    constructor(employeeRepository: Repository<Employee>);
    findAll(): Promise<Employee[]>;
    findByEmail(email: string): Promise<Employee | null>;
    save(employeeData: Partial<Employee>): Promise<Employee>;
    findById(id: string): Promise<Employee>;
    update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<void>;
    delete(employee: Employee): Promise<void>;
}
