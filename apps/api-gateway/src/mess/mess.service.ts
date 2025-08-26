import { Injectable } from '@nestjs/common';
import { CreateMessDto } from './dto/create-mess.dto';
import { UpdateMessDto } from './dto/update-mess.dto';

@Injectable()
export class MessService {
  create(createMessDto: CreateMessDto) {
    return 'This action adds a new mess';
  }

  findAll() {
    return `This action returns all mess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mess`;
  }

  update(id: number, updateMessDto: UpdateMessDto) {
    return `This action updates a #${id} mess`;
  }

  remove(id: number) {
    return `This action removes a #${id} mess`;
  }
}
