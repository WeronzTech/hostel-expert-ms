import { Controller } from '@nestjs/common';
import { KitchenService } from '../services/kitchen.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KITCHEN_PATTERN } from '@app/common/pattern/mess/kitchen.pattern';
import { KitchenDto } from '../dto/kitchen.dto';

@Controller()
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @MessagePattern(KITCHEN_PATTERN.CREATE_KITCHEN)
  createKitchen(@Payload() data: KitchenDto) {
    return this.kitchenService.createKitchen(data);
  }

  @MessagePattern(KITCHEN_PATTERN.UPDATE_KITCHEN)
  updateKitchen(@Payload() data: { updateKitchenDto: KitchenDto; id: string }) {
    return this.kitchenService.updateKitchen(data.id, data.updateKitchenDto);
  }

  @MessagePattern(KITCHEN_PATTERN.DELETE_KITCHEN)
  deleteKitchen(@Payload() data: { id: string }) {
    return this.kitchenService.deleteKitchen(data.id);
  }
}
