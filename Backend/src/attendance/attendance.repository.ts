import { Repository } from "typeorm";
import { Attendance } from "./entities/attendance.entity";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "../employee/enums/group.enum";
@Injectable()
export class AttendanceRepository {

    constructor(@InjectRepository(Attendance) private readonly attendanceRepository: Repository<Attendance>) {
    }

    async findByEmployeeIdAndDate(employeeId: string, date: Date){
        return this.attendanceRepository.findOneBy({ 
            employee: { id: employeeId, group: Group.EMPLOYEE  },
            createdAt: date
        });
    }

    async findByDate(date: Date){
        return this.attendanceRepository.findBy({ 
            createdAt: date
        });
    }

    async findById(id: string): Promise<Attendance> {
        return this.attendanceRepository.findOneBy({ id });
    }

    async findAll() {
        return this.attendanceRepository.find();
    }

    async save(attendance: Attendance): Promise<Attendance> {
        return this.attendanceRepository.save(attendance);
    }

    async update(id: string, updateAttendanceDto: UpdateAttendanceDto) {
        this.attendanceRepository.update(id, updateAttendanceDto);
    }

    async delete(attendance: Attendance) {
        this.attendanceRepository.remove(attendance);
    }
}