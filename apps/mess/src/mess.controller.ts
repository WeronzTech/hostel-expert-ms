import { Controller, Get } from '@nestjs/common';
import { MessService } from './mess.service';

@Controller()
export class MessController {
  constructor(private readonly messService: MessService) {}

  @Get()
  getHello(): string {
    return this.messService.getHello();
  }
}
