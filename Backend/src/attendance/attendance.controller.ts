import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Group as Role } from '../employee/enums/group.enum';
import { Roles } from '../auth/decorator/roles.decorator';


@Controller('attendance')
@Roles(Role.HR)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AttendanceController {

  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async addAttendance(@Body() createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    return this.attendanceService.addAttendance(createAttendanceDto);
  }

  @Get('/date')
  async getAttendanceByDate(date: string): Promise<Attendance>{
    return this.attendanceService.findAttendanceById(date);
  }


  @Get(':id')
  async getAttendanceById(@Param('id') id: string): Promise<Attendance>{
    return this.attendanceService.findAttendanceById(id);
  }

  @Put(':id')
  async updateAttendance(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.updateAttendance(id, updateAttendanceDto);
  }

  @Delete(':id')
  async deleteAttendance(@Param('id') id: string) {
    return this.attendanceService.deleteAttendance(id);
  }

}
