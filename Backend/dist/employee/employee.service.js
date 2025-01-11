"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const employee_repository_1 = require("./employee.repository");
const employee_entity_1 = require("./entities/employee.entity");
const bcrypt = require("bcrypt");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    async addEmployee(createEmployeeDto) {
        const { name, password, email } = createEmployeeDto;
        if (await this.employeeRepository.findByEmail(email)) {
            throw new common_1.ConflictException('This email is already used, try another one!');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newEmployee = new employee_entity_1.Employee(name, email, hashedPassword);
        await this.employeeRepository.save(newEmployee);
        return newEmployee;
    }
    async findAllEmployeesByDate(date) {
        const employees = await this.employeeRepository.findAll();
        console.log(employees);
        const employeesWithAttendance = employees.map((employee) => {
            console.log(employee.attendance, date);
            const attendance = employee.attendance.find((attendance) => attendance.createdAt.toString() === date);
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
    async findEmployeeById(id) {
        const existingEmployee = await this.employeeRepository.findById(id);
        if (!existingEmployee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        return existingEmployee;
    }
    async updateEmployee(id, updateEmployeeDto) {
        console.log(id, updateEmployeeDto);
        await this.employeeRepository.update(id, updateEmployeeDto);
        return await this.findEmployeeById(id);
    }
    async deleteEmployee(id) {
        const existingEmployee = await this.employeeRepository.findById(id);
        await this.employeeRepository.delete(existingEmployee);
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_repository_1.EmployeeRepository])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map