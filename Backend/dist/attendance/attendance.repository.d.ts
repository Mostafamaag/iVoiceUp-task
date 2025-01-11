import { Repository } from "typeorm";
import { Attendance } from "./entities/attendance.entity";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";
export declare class AttendanceRepository {
    private readonly attendanceRepository;
    constructor(attendanceRepository: Repository<Attendance>);
    findByEmployeeIdAndDate(employeeId: string, date: Date): Promise<Attendance>;
    findByDate(date: Date): Promise<Attendance[]>;
    findById(id: string): Promise<Attendance>;
    findAll(): Promise<Attendance[]>;
    save(attendance: Attendance): Promise<Attendance>;
    update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<void>;
    delete(attendance: Attendance): Promise<void>;
}
