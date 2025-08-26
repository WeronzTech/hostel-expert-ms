import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    console.log('Email12', email);
    return user;
  }

  async createUser(data: UserDto) {
    const newUser = await this.userModel.create({ ...data, role: 'user' });
    return newUser;
  }
}
