import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Employee } from "./entities/employee.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Group } from "./enums/group.enum";


@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) { }


  async findAll() {
    return this.employeeRepository.find({
      where : {group: Group.EMPLOYEE},
      relations:["attendance"]
    });
  }

  async findByEmail(email: string): Promise<Employee | null> {
    return this.employeeRepository.findOne({ where: { email } });
  }

  async save(employeeData: Partial<Employee>): Promise<Employee> {
    return this.employeeRepository.save(employeeData);
  }

  async findById(id: string): Promise<Employee> {
    return this.employeeRepository.findOne({ where: { id } });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    this.employeeRepository.update(id, updateEmployeeDto);
  }

  async delete(employee: Employee) {
    this.employeeRepository.remove(employee);
  }
}