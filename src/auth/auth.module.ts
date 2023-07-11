import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schema/auth.entity';
import { USER_REPOSITORY_INJECTION_TOKEN as AUTH_REPOSITORY_INJECTION_TOKEN } from 'src/tasks/injection-tokens';
import { MongoAuthRepository } from './repository/auth.repository';

export const AUTH_MODELS: ModelDefinition[] = [
  {
    name: Auth.name,
    schema: AuthSchema,
  },
];
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AUTH_REPOSITORY_INJECTION_TOKEN,
      useClass: MongoAuthRepository,
    },
  ],
  imports: [MongooseModule.forFeature(AUTH_MODELS)],
})
export class AuthModule {}
