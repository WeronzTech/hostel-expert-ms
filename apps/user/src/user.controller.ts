import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PATTERN } from '@app/common/pattern/pattern';
import { UserDto } from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @MessagePattern(PATTERN.USER.FIND_BY_EMAIL)
  findByEmail(@Payload() data: { email: string }) {
    return this.userService.findByEmail(data.email);
  }
  @MessagePattern(PATTERN.USER.CREATE_USER)
  createUser(@Payload() data: UserDto) {
    return this.userService.createUser(data);
  }
}
