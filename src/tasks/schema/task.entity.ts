import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from '../tasks.model';
import { values } from 'lodash';
import { User } from 'src/auth/auth.model';
import mongoose, { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<TaskEntity>;

@Schema({ timestamps: true })
export class TaskEntity {
  @Prop({ default: () => 'No Description' })
  description: string;

  @Prop({ required: true })
  title: string;

  @Prop({
    type: String,
    required: true,
    enum: values<TaskStatus>(TaskStatus),
    default: TaskStatus.open,
  })
  status: TaskStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  getDescription() {
    return `you've yor description ${this.description}`;
  }
}

export const TaskSchema =
  SchemaFactory.createForClass(TaskEntity).loadClass(TaskEntity);

// type MyState = StateName | StateCoordinates;
// type StateName = 'Washington' | 'Detriot' | 'New Jersey';
// type StateCoordinates = {
//   x: number;
//   y: number;
// };
// type keys = 'birthState' | 'currentState' | 'age';
// type User = {
//   birthState: MyState;
//   currentState: MyState;
// };
// const user = {
//   birthState: 'Washington',
//   currentState: { x: 8, y: 7 },
//   age: 1,
// } satisfies Partial<Record<keys, number | MyState>>;

// user.birthState
// interface Book {
//   title: string;
//   author: string;
//   year: number;
// }
// const library = {
//   book1: { title: 'Things fall apart', author: 'Chinua Achebe', year: 1958 },
//   book2: { title: 'Lord of the flies', author: 'William Golding', year: 1993 },
//   book3: { title: 'Harry Potter', author: 'J.k Rowling', year: '1997' }, // Error
// } satisfies Record<string, Book>;
