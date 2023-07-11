import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../tasks.model';

export interface ITaskRepository {
  create(createTaskDto: CreateTaskDto): Promise<Task>;
  findAll(): Promise<Task[]>;
  getTaskById(taskId: string): Promise<Task>;
  deleteTask(taskId: string): Promise<Task>;
}
