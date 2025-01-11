import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import * as bcrypt from 'bcrypt';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
    constructor(
        private readonly employeeRepository: EmployeeRepository,
    ) { }

    async addEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        const { name, password, email } = createEmployeeDto;

        if (await this.employeeRepository.findByEmail(email)) {
            throw new ConflictException(
                'This email is already used, try another one!',
            );
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newEmployee = new Employee(
            name,
            email,
            hashedPassword,
        );

        await this.employeeRepository.save(newEmployee);
        return newEmployee;
    }

    async findAllEmployeesByDate(date: string) {
        const employees: Employee[] =  await this.employeeRepository.findAll();
        console.log(employees);
        const employeesWithAttendance = employees.map((employee) => {
            console.log(employee.attendance, date);
            const attendance = employee.attendance.find(
              (attendance) => attendance.createdAt.toString() === date,
            );
            
            return {
              id: employee.id,
              name: employee.name,
              email: employee.email,
              group: employee.group,
              attendanceStatus: attendance ? attendance.status : 'NO_STATUS'
            };
        });
        console.log(employeesWithAttendance);
        return employeesWithAttendance;
    }


    async findEmployeeById(id: string): Promise<Employee> {

        const existingEmployee = await this.employeeRepository.findById(id);

        if (!existingEmployee) {
            throw new NotFoundException('Employee not found');
        }
        return existingEmployee;
    }

    async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        console.log(id, updateEmployeeDto)
        await this.employeeRepository.update(id, updateEmployeeDto);
        return await this.findEmployeeById(id);
    }

    async deleteEmployee(id: string): Promise<void> {
        const existingEmployee = await this.employeeRepository.findById(id);
        await this.employeeRepository.delete(existingEmployee);
    }
}
