import { Module } from '@nestjs/common';
import { AuthController } from './view/auth.controller';
import { AuthService } from './controller/auth.service';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: '12345678',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
