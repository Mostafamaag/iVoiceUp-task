import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    addAttendance(createAttendanceDto: CreateAttendanceDto): Promise<Attendance>;
    getAttendanceByDate(date: string): Promise<Attendance>;
    getAttendanceById(id: string): Promise<Attendance>;
    updateAttendance(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance>;
    deleteAttendance(id: string): Promise<void>;
}
