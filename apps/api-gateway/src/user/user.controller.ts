import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  UploadedFiles,
  ParseFilePipeBuilder,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findByEmail(@Query('email') email: string) {
    console.log('Email', email);
    return this.userService.findByEmail(email);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 1, { storage: memoryStorage() }))
  createUser(
    @Body() data: CreateUserDto,
    @Req() req: any,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })
        .addMaxSizeValidator({
          maxSize: 1000 * 500,
          message: 'File size must be below 500KB',
        })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    return this.userService.createUser(data, 123, file);
  }
}
