import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorator/roles.decorator';
import { Group as Role } from './enums/group.enum';
import { RolesGuard } from '../auth/guards/roles.guard';


@Controller('employee')
@Roles(Role.HR)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Get(':date')
    async getAllEmployees(@Param('date') date: string) {
        return this.employeeService.findAllEmployeesByDate(date);
    }

    @Get(':id')
    async getEmployeeById(@Param('id') id: string) {
        return this.employeeService.findEmployeeById(id);
    }

    @Post()
    async addEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        return this.employeeService.addEmployee(createEmployeeDto);
    }

    @Put(':id')
    async updateEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        return this.employeeService.updateEmployee(id, updateEmployeeDto);
    }

    @Delete(':id')
    async deleteEmployee(@Param('id') id: string) {
        return this.employeeService.deleteEmployee(id);
    }
}
