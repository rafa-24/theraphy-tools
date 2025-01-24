import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Global()
@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
              host: 'smtp.gmail.com', // Proveedor SMTP
              port: 587,
              secure: false,
              auth: {
                user: 'susesoappsuport@gmail.com',
                pass: 'cayd nnqy bvgy xtgl',
              },
            },
            defaults: {
              from: '"No Reply" <noreply@example.com>',
            },
        }),
    ],
    providers:[MailService],
    exports: [MailService]
})
export class MailModule {}
