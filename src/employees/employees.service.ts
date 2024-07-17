import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) { }
  create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    // return 'This action adds a new employee';
    return this.databaseService.employee.create({
      data: createEmployeeDto
    })
  }

  findAll(role?: "INTERN" | "EMPLOYEE" | "ADMIN") {
    // return `This action returns all employees`;
    if(role) return this.databaseService.employee.findMany({
      where:{
        role,
      }
    })
    return this.databaseService.employee.findMany()
  }

  findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where:{
        id
      }
    })
    // return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    // return `This action updates a #${id} employee`;
    return this.databaseService.employee.update({
      where:{
        id
      },data:updateEmployeeDto
    })
  }

  remove(id: number) {
    return this.databaseService.employee.delete({
      where:{
        id
      }
    })
  }
}
