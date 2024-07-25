import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { HttpModule } from '@nestjs/axios';
import { LogModule } from 'src/libs/log/log.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
    LogModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
