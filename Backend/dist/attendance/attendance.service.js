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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const attendance_repository_1 = require("./attendance.repository");
const attendance_entity_1 = require("./entities/attendance.entity");
const employee_repository_1 = require("../employee/employee.repository");
let AttendanceService = class AttendanceService {
    constructor(attendanceRepository, employeeRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }
    async addAttendance(createAttendanceDto) {
        const { employeeId, date, status } = createAttendanceDto;
        const employee = await this.employeeRepository.findById(employeeId);
        if (!employee) {
            throw new common_1.NotFoundException("Employee not found!");
        }
        if (await this.attendanceRepository.findByEmployeeIdAndDate(employeeId, date)) {
            throw new common_1.ConflictException("Attendance already recorded");
        }
        const newAttendance = new attendance_entity_1.Attendance(status, employee, date);
        await this.attendanceRepository.save(newAttendance);
        return newAttendance;
    }
    async findAttendanceByDate(date) {
        return await this.attendanceRepository.findByDate(date);
    }
    async updateAttendance(id, updateAttendanceDto) {
        await this.attendanceRepository.update(id, updateAttendanceDto);
        return await this.attendanceRepository.findById(id);
    }
    async findAttendanceById(id) {
        const existingAttendance = await this.attendanceRepository.findById(id);
        if (!existingAttendance) {
            throw new common_1.NotFoundException("Attendance not found");
        }
        return existingAttendance;
    }
    async deleteAttendance(id) {
        const attendanceToDelete = await this.findAttendanceById(id);
        return await this.attendanceRepository.delete(attendanceToDelete);
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [attendance_repository_1.AttendanceRepository,
        employee_repository_1.EmployeeRepository])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map