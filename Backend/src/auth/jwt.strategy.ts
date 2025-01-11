
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { DataSource } from "typeorm";
import { JwtPayload } from "jsonwebtoken"
import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Employee } from "../employee/entities/employee.entity";
import { Group } from "../employee/enums/group.enum";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor
        (
            private readonly dataSource: DataSource,
            private readonly configService :ConfigService
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    async validate(payload: JwtPayload): Promise<Employee> {
        const { employeeId } = payload;
        console.log("Employee");
        const user = await this.dataSource.getRepository(Employee).findOne({ where: { id: employeeId } });
        if (!user) {
            throw new UnauthorizedException("Invalid token");
        }
        if (user.group != Group.HR) {
            throw new ForbiddenException("You can't access this resource");
        }
        console.log(user);
        return user;
    }

}