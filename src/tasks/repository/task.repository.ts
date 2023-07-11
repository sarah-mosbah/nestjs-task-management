import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskEntity } from '../schema/task.entity';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../tasks.model';
import { ITaskRepository } from './ITask.repository';

@Injectable()
export class MongoTaskRepository implements ITaskRepository {
  constructor(@InjectModel(TaskEntity.name) readonly taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getTaskById(taskId: string): Promise<Task> {
    return this.taskModel.findById(taskId);
  }
  async deleteTask(taskId: string): Promise<Task> {
    return this.taskModel.findByIdAndRemove(taskId);
  }
}
