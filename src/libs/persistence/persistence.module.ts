import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './mongodb/config/db-config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => ({
        uri: configService.db,
      }),
      inject: [dbConfig.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class PersistenceModule {}
