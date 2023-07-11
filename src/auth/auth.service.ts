import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { USER_REPOSITORY_INJECTION_TOKEN } from 'src/tasks/injection-tokens';

import { IAuthRepository } from './repository/IAuth.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { compare } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @Inject<symbol>(USER_REPOSITORY_INJECTION_TOKEN)
    private readonly authRepository: IAuthRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authRepository.createUser(authCredentialsDto);
  }
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const user = await this.authRepository.getUserByName(
      authCredentialsDto.username,
    );
    if (user && (await compare(authCredentialsDto.password, user.password))) {
      return 'user';
    }
    throw new UnauthorizedException();
  }
}
