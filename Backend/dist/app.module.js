"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const employee_module_1 = require("./employee/employee.module");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("./employee/entities/employee.entity");
const attendance_entity_1 = require("./attendance/entities/attendance.entity");
const attendance_module_1 = require("./attendance/attendance.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: [`.env`],
                isGlobal: true
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    return {
                        type: 'postgres',
                        port: configService.get('DB_PORT'),
                        host: configService.get('DB_HOST'),
                        database: configService.get('DB_DATABASE'),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PASSWORD'),
                        entities: [employee_entity_1.Employee, attendance_entity_1.Attendance],
                        autoLoadEntities: true,
                        synchronize: true,
                    };
                }
            }),
            auth_module_1.AuthModule, employee_module_1.EmployeeModule, attendance_module_1.AttendanceModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map