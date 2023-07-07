import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum TaskStatus {
  open,
  inprogress,
  done,
}
export class Task {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @IsString()
  @IsNotEmpty()
  owner: string;
}
