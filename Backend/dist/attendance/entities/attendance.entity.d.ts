import { Employee } from "../../employee/entities/employee.entity";
import { Status } from "../enums/status.enum";
export declare class Attendance {
    constructor(status: Status, employee: Employee, date?: Date);
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: Status;
    employee: Employee;
}
