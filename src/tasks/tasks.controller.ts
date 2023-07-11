import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
// import { TaskStatus } from './tasks.model';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { GetTaskById } from './dto/get-task-by-id.dto';
import { HttpExceptionFilter } from 'src/exceptions/exception.filter';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto) {
    // if (Object.keys(filterDto).length) {
    //   return this.tasksService.getTasksWithFilter(filterDto);
    // }
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  getTaskById(@Param() { id }: GetTaskById) {
    return this.tasksService.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
  // @Patch(':id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status') status: TaskStatus,
  // ) {
  //   return this.tasksService.updateTask(id, status);
  // }
}
