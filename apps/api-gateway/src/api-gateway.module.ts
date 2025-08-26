import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { UserModule } from './user/user.module';
import { PropertyModule } from './property/property.module';
import { NotificationModule } from './notification/notification.module';
import { SocketModule } from './socket/socket.module';
import { MessModule } from './mess/mess.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    UserModule,
    PropertyModule,
    NotificationModule,
    SocketModule,
    MessModule,
    MaintenanceModule,
    EmployeesModule,
    AuthModule,
    AccountsModule,
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
