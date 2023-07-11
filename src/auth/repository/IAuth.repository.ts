import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { Auth } from '../schema/auth.entity';

export interface IAuthRepository {
  createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
  getUserByName(username: string): Promise<Auth>;
}
