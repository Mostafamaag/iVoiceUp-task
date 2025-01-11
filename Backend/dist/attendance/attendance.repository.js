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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceRepository = void 0;
const typeorm_1 = require("typeorm");
const attendance_entity_1 = require("./entities/attendance.entity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const group_enum_1 = require("../employee/enums/group.enum");
let AttendanceRepository = class AttendanceRepository {
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }
    async findByEmployeeIdAndDate(employeeId, date) {
        return this.attendanceRepository.findOneBy({
            employee: { id: employeeId, group: group_enum_1.Group.EMPLOYEE },
            createdAt: date
        });
    }
    async findByDate(date) {
        return this.attendanceRepository.findBy({
            createdAt: date
        });
    }
    async findById(id) {
        return this.attendanceRepository.findOneBy({ id });
    }
    async findAll() {
        return this.attendanceRepository.find();
    }
    async save(attendance) {
        return this.attendanceRepository.save(attendance);
    }
    async update(id, updateAttendanceDto) {
        this.attendanceRepository.update(id, updateAttendanceDto);
    }
    async delete(attendance) {
        this.attendanceRepository.remove(attendance);
    }
};
exports.AttendanceRepository = AttendanceRepository;
exports.AttendanceRepository = AttendanceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(attendance_entity_1.Attendance)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AttendanceRepository);
//# sourceMappingURL=attendance.repository.js.map