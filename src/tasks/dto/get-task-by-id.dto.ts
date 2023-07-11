import { IsMongoId } from 'class-validator';

export class GetTaskById {
  @IsMongoId()
  id: string;
}
