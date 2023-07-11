import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Auth {
  @Prop({ required: true, trim: true, index: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
}
export const AuthSchema = SchemaFactory.createForClass(Auth).loadClass(Auth);
