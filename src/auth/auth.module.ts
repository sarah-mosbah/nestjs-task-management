import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schema/auth.entity';

export const AUTH_MODELS: ModelDefinition[] = [
  {
    name: 'auth',
    schema: AuthSchema,
  },
];
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [MongooseModule.forFeature()],
})
export class AuthModule {}
