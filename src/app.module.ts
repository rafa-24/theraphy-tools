import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './context/users/user.module';
import { MysqlDatabaseModule } from './config/mysql-database/mysql-database/mysql-database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './context/auth/auth.module';


@Module({
  imports: [
    MysqlDatabaseModule,
    UserModule,
    EventEmitterModule.forRoot(),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
