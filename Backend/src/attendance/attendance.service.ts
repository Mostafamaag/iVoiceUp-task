import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AttendanceRepository } from './attendance.repository';
import { Attendance } from './entities/attendance.entity';
import { EmployeeRepository } from '../employee/employee.repository';

@Injectable()
export class AttendanceService {

  constructor(private readonly attendanceRepository: AttendanceRepository,
    private readonly employeeRepository: EmployeeRepository) {
  }

  async addAttendance(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {

    const { employeeId, date, status } = createAttendanceDto;
    const employee = await this.employeeRepository.findById(employeeId);

    if (!employee) {
      throw new NotFoundException("Employee not found!");
    }

    if (await this.attendanceRepository.findByEmployeeIdAndDate(employeeId, date)) {
      throw new ConflictException("Attendance already recorded");
    }

    const newAttendance = new Attendance(
      status,
      employee,
      date
    )
    await this.attendanceRepository.save(newAttendance);
    return newAttendance;
  }

  async findAttendanceByDate(date: Date) {
    return await this.attendanceRepository.findByDate(date);
  }

  async updateAttendance(id: string, updateAttendanceDto: UpdateAttendanceDto) {

    await this.attendanceRepository.update(id, updateAttendanceDto);
    return await this.attendanceRepository.findById(id);
  }

  async findAttendanceById(id: string): Promise<Attendance> {
    const existingAttendance = await this.attendanceRepository.findById(id);
    if (!existingAttendance) {
      throw new NotFoundException("Attendance not found");
    }
    return existingAttendance;
  }

  async deleteAttendance(id: string) {
    const attendanceToDelete = await this.findAttendanceById(id);
    return await this.attendanceRepository.delete(attendanceToDelete);
  }

}
