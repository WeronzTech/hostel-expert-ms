import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { KitchenService } from '../services/kitchen.service';
import { CreateKitchenDto, UpdateKitchenDto } from '../dto/kitchen.dto';

@Controller(`/api/${process.env.VERSION}/kitchen`)
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @Post()
  createKitchen(@Body() createKitchenDto: CreateKitchenDto) {
    return this.kitchenService.createKitchen(createKitchenDto);
  }

  @Put(':id')
  updateKitchen(
    @Param('id') id: string,
    @Body() updateKitchenDto: UpdateKitchenDto,
  ) {
    return this.kitchenService.updateKitchen(id, updateKitchenDto);
  }

  @Delete(':id')
  deleteKitchen(@Param('id') id: string) {
    return this.kitchenService.deleteKitchen(id);
  }
}
