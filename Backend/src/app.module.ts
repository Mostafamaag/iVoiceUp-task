import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee/entities/employee.entity';
import { Attendance } from './attendance/entities/attendance.entity';
import { AttendanceModule } from './attendance/attendance.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        type: 'postgres',
        port: configService.get('DB_PORT'),
        host:configService.get('DB_HOST'),
        database: configService.get('DB_DATABASE'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        entities: [Employee, Attendance],
        autoLoadEntities: true,
        synchronize: true,
        // ssl: {
        //   rejectUnauthorized: false,  // allow self-signed SSL certificates
        // },
      }
    }
  }),

  AuthModule, EmployeeModule, AttendanceModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
