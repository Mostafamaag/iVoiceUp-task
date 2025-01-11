import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "../../employee/entities/employee.entity";
import { Status } from "../enums/status.enum";


@Entity()
export class Attendance {

    constructor(status: Status, employee: Employee, date?: Date) {
        this.createdAt = date;
        this.status = status;
        this.employee = employee;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({
        type: 'date', 
    })
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ type: 'enum', enum: Status, default: Status.PRESENT })
    status: Status

    @ManyToOne((_attendance) => Employee, (employee) => employee.attendance, { nullable: false })
    employee: Employee

}
