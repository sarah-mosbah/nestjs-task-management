import { Inject, Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { MongoTaskRepository } from './repository/task.repository';
import { TASK_REPOSITORY_INJECTION_TOKEN } from './injection-tokens';
@Injectable()
export class TasksService {
  // private tasks: Task[] = [];
  constructor(
    @Inject<symbol>(TASK_REPOSITORY_INJECTION_TOKEN)
    private readonly taskRepository: MongoTaskRepository,
  ) {}
  // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     const lowerCaseSearch = search.toLowerCase();
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.toLowerCase().includes(lowerCaseSearch) ||
  //         task.description.toLowerCase().includes(lowerCaseSearch),
  //     );
  //   }

  //   return tasks;
  // }
  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }
  getTaskById(id: string): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }
  async deleteTask(id: string): Promise<Task> {
    return this.taskRepository.deleteTask(id);
  }

  // updateTask(id: string, status: TaskStatus): Task {
  //   const task = this.tasks.find((task) => task.id === id);
  //   if (!task) throw new Error();
  //   task.status = status;
  //   return tgask;
  // }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task: Task = await this.taskRepository.create(createTaskDto);
    return task;
  }
}
