import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '../schemas/todo.schema';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() todo: Todo) {
    return this.todoService.create(todo);
  }

  @Get()
  findAll(@Query('status') status?: string, @Query('sortBy') sortBy?: string) {
    return this.todoService.findAll(status, sortBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: Todo) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
