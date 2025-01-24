import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Get()
    async sendVerificationCodeEmail() {
        return await this.mailService.sendPasswordReset('rafaprieto063@gmail.com')
    }

}
