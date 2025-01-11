import { Group } from "../enums/group.enum";
import { Attendance } from "../../attendance/entities/attendance.entity";
export declare class Employee {
    constructor(name: string, email: string, password: string, group?: Group);
    id: string;
    name: string;
    email: string;
    password: string;
    group: Group;
    attendance: Attendance[];
}
