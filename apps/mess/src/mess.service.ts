import { Injectable } from '@nestjs/common';

@Injectable()
export class MessService {
  getHello(): string {
    return 'Hello World!';
  }
}
