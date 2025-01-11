import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../enums/group.enum";
import { Attendance } from "../../attendance/entities/attendance.entity";


@Entity()
export class Employee {
    
    constructor(name: string, email: string, password: string, group?: Group){
        this.name = name;
        this.email = email;
        this.password = password;
        this.group = group;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({type:'enum', enum:Group, default: Group.EMPLOYEE})
    group: Group


    @OneToMany((_employee) => Attendance, (attendance) => attendance.employee)
    attendance: Attendance[];


}
