import { IsDate, IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { Status } from "../enums/status.enum";

export class CreateAttendanceDto {

    @IsNotEmpty()
    @IsUUID()
    employeeId: string

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status


    @IsNotEmpty()
    date: Date

}
