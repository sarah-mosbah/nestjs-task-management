import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { TaskEntity, TaskSchema } from './schema/task.entity';
import { TASK_REPOSITORY_INJECTION_TOKEN } from './injection-tokens';
import { MongoTaskRepository } from './repository/task.repository';
import { ConfigModule } from '@nestjs/config';

const entity: ModelDefinition = {
  name: TaskEntity.name,
  schema: TaskSchema,
};

@Module({
  imports: [MongooseModule.forFeature([entity]), ConfigModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: TASK_REPOSITORY_INJECTION_TOKEN,
      useClass: MongoTaskRepository,
    },
  ],
})
export class TasksModule {}
