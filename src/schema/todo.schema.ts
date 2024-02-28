import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TodoPriority, TodoStatus } from 'src/enum/todo.enum';

@Schema()
export class Todo extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Date })
  dueDate: string;

  @Prop({ enum: TodoStatus, default: TodoStatus.NOT_STARTED })
  status: TodoStatus;

  @Prop({ enum: TodoPriority })
  priority: TodoPriority;

  @Prop()
  tags: string[];
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
