import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './schema/employee.schema';
import {
  DatabaseCounter,
  DatabaseCounterSchema,
} from './schema/databaseCounter.schema';
import { Manager, ManagerSchema } from './schema/manager.schema';
import {
  SalaryHistory,
  SalaryHistorySchema,
} from './schema/salaryHistory.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.EMPLOYEES_MONGO_URL!),
    MongooseModule.forFeature([
      { name: Manager.name, schema: ManagerSchema },
      { name: Employee.name, schema: EmployeeSchema },
      { name: DatabaseCounter.name, schema: DatabaseCounterSchema },
      { name: SalaryHistory.name, schema: SalaryHistorySchema },
    ]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
