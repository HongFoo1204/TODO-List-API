import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TodoStatus, TodoPriority } from 'src/enum/todo.enum';

export class CreateTodoDto {
  @IsNotEmpty()
  name: string;

  description?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @IsEnum(TodoStatus)
  @IsOptional()
  status: TodoStatus;

  @IsEnum(TodoPriority)
  @IsOptional()
  priority?: TodoPriority;

  tags?: string[];
}
