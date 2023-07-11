import { ConflictException, Injectable } from '@nestjs/common';
import { Auth } from '../schema/auth.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAuthRepository } from './IAuth.repository';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { genSalt, hash } from 'bcrypt';
@Injectable()
export class MongoAuthRepository implements IAuthRepository {
  constructor(@InjectModel(Auth.name) readonly authModel: Model<Auth>) {}
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      const { username, password } = authCredentialsDto;
      const salt = await genSalt();
      const hashedPassword = await hash(password, salt);

      const auth = new this.authModel({ username, password: hashedPassword });
      await auth.save();
    } catch (error) {
      if (error.code === 11000) throw new ConflictException();
      throw error;
    }
  }

  async getUserByName(username: string): Promise<Auth> {
    return this.authModel.findOne({ username });
  }
}
