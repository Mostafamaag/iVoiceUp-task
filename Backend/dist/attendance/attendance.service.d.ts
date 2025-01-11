import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AttendanceRepository } from './attendance.repository';
import { Attendance } from './entities/attendance.entity';
import { EmployeeRepository } from '../employee/employee.repository';
export declare class AttendanceService {
    private readonly attendanceRepository;
    private readonly employeeRepository;
    constructor(attendanceRepository: AttendanceRepository, employeeRepository: EmployeeRepository);
    addAttendance(createAttendanceDto: CreateAttendanceDto): Promise<Attendance>;
    findAttendanceByDate(date: Date): Promise<Attendance[]>;
    updateAttendance(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance>;
    findAttendanceById(id: string): Promise<Attendance>;
    deleteAttendance(id: string): Promise<void>;
}
