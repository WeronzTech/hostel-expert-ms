import { MESS_CLIENT } from '@app/common/token/token';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateKitchenDto, UpdateKitchenDto } from '../dto/kitchen.dto';
import { KITCHEN_PATTERN } from '@app/common/pattern/mess/kitchen.pattern';

@Injectable()
export class KitchenService {
  constructor(@Inject(MESS_CLIENT) private messClient: ClientProxy) {}

  createKitchen(data: CreateKitchenDto) {
    return this.messClient.send(KITCHEN_PATTERN.CREATE_KITCHEN, data);
  }

  updateKitchen(id: string, updateKitchenDto: UpdateKitchenDto) {
    return this.messClient.send(KITCHEN_PATTERN.UPDATE_KITCHEN, {
      id,
      updateKitchenDto,
    });
  }

  deleteKitchen(id: string) {
    return this.messClient.send(KITCHEN_PATTERN.DELETE_KITCHEN, { id });
  }
}
