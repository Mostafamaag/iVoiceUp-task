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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const employee_entity_1 = require("../employee/entities/employee.entity");
const employee_repository_1 = require("../employee/employee.repository");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(employeeRepository, jwtService) {
        this.employeeRepository = employeeRepository;
        this.jwtService = jwtService;
    }
    async signUp(signUpDto) {
        const { password, email, name, group } = signUpDto;
        if (await this.employeeRepository.findByEmail(email)) {
            throw new common_1.ConflictException("This email is already user, try another one!");
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newEmployee = new employee_entity_1.Employee(name, email, hashedPassword, group);
        await this.employeeRepository.save(newEmployee);
        return newEmployee;
    }
    async login(authCredentialsDto) {
        const { email, password } = authCredentialsDto;
        const employee = await this.employeeRepository.findByEmail(email);
        if (!employee) {
            throw new common_1.NotFoundException("Employee not found!");
        }
        if (employee.group !== "HR") {
            throw new common_1.UnauthorizedException("Only HRs can login");
        }
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException("Wrong email or password");
        }
        const payload = { employeeId: employee.id };
        const token = await this.jwtService.signAsync(payload);
        return { token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_repository_1.EmployeeRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map