import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskEntity } from '../schema/task.entity';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../tasks.model';

@Injectable()
export class MongoTaskRepository {
  constructor(@InjectModel(TaskEntity.name) readonly taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }
}
