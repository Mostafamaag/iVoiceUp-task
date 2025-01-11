import { DataSource } from "typeorm";
import { JwtPayload } from "jsonwebtoken";
import { Employee } from "../employee/entities/employee.entity";
import { ConfigService } from "@nestjs/config";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly dataSource;
    private readonly configService;
    constructor(dataSource: DataSource, configService: ConfigService);
    validate(payload: JwtPayload): Promise<Employee>;
}
export {};
