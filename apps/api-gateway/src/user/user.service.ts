import { PATTERN } from '@app/common/pattern/pattern';
import { USER_CLIENT } from '@app/common/token/token';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject(USER_CLIENT) private userClient: ClientProxy) {}
  findByEmail(email: string) {
    return this.userClient.send(PATTERN.USER.FIND_BY_EMAIL, { email });
  }

  createUser(data: CreateUserDto, userId: number, file: Express.Multer.File) {
    return this.userClient.send(PATTERN.USER.CREATE_USER, { ...data, userId });
  }
}
