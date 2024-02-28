import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from '../schema/todo.schema';
import { CreateTodoDto } from 'src/todo/dto/createTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async findAll(
    status?: string,
    dueDate?: string,
    sortBy?: string,
  ): Promise<Todo[]> {
    let query = {};
    if (status) {
      query = { ...query, status: status, dueDate: dueDate };
    }
    let sortQuery = {};
    if (sortBy) {
      switch (sortBy) {
        case 'dueDate':
          sortQuery = { dueDate: 1 };
          break;
        case 'status':
          sortQuery = { status: 1 };
          break;
        case 'name':
          sortQuery = { name: 1 };
          break;
        default:
          sortQuery = {};
          break;
      }
    }
    return this.todoModel.find(query).sort(sortQuery).exec();
  }

  async findOne(id: string): Promise<Todo> {
    return this.todoModel.findById(id).exec();
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    return createdTodo.save();
  }

  async update(id: string, todo: UpdateTodoDto): Promise<Todo> {
    return this.todoModel.findByIdAndUpdate(id, todo, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.todoModel.findByIdAndDelete(id).exec();
  }
}
