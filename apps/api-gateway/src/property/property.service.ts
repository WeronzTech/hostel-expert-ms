import { Inject, Injectable } from '@nestjs/common';
import { PROPERTY_CLIENT } from '@app/common/token/token';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(@Inject(PROPERTY_CLIENT) private propertyClient: ClientProxy) {}
  create(createPropertyDto: CreatePropertyDto) {
    return 'This action adds a new property';
  }

  findAll() {
    return `This action returns all property`;
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
