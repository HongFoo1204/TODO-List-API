import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './createTodo.dto';
import { IsOptional } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  name: string;
}
