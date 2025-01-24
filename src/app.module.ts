import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './context/users/user.module';
import { MysqlDatabaseModule } from './config/mysql-database/mysql-database/mysql-database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './context/auth/auth.module';
import { MailModule } from './context/mail/mail.module';
import { MailService } from './context/mail/mail.service';
import { MailController } from './context/mail/mail.controller';


@Module({
  imports: [
    MysqlDatabaseModule,
    UserModule,
    EventEmitterModule.forRoot(),
    AuthModule,
    MailModule
  ],
  controllers: [AppController, MailController],
  providers: [AppService, MailService],
})
export class AppModule {}
