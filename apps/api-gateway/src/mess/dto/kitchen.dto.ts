import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateKitchenDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  location: string;
  @IsMongoId()
  @IsNotEmpty()
  incharge: string;
  @IsMongoId()
  @IsNotEmpty()
  propertyId: string;
}

export class UpdateKitchenDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  location: string;
  @IsMongoId()
  @IsOptional()
  incharge: string;
  @IsMongoId()
  @IsOptional()
  propertyId: string;
}
