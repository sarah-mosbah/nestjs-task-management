import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    const host = this.configService.getOrThrow('DATABASE_HOST', {
      infer: true,
    });
    const port = this.configService.getOrThrow('DATABASE_PORT', {
      infer: true,
    });
    const databaseName = this.configService.getOrThrow('DATABASE_NAME', {
      infer: true,
    });
    const uri = `mongodb://${host}:${port}/${databaseName}`;
    const options: MongooseModuleOptions = { uri };
    return options;
  }
}
