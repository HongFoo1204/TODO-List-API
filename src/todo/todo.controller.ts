import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '../schema/todo.schema';
import { CreateTodoDto } from 'src/todo/dto/createTodo.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateTodoDto } from './dto/updateTodo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('dueDate') dueDate?: string,
    @Query('sortBy') sortBy?: string,
  ) {
    return this.todoService.findAll(status, dueDate, sortBy);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
