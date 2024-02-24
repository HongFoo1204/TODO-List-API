import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Status = 'Not Started' | 'In Progress' | 'Completed';

@Schema()
export class Todo extends Document {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  dueDate?: string;

  @Prop()
  status: Status;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
