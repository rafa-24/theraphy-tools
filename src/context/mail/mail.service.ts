import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { generateVerificationCode } from 'src/common/helpers/generate-verification-code';

@Injectable()
export class MailService {
    constructor (private readonly mailService: MailerService) {}

    async sendPasswordReset(email: string): Promise<string> {
        try {
            const code: string = generateVerificationCode();
            const urlResetPassword = `${process.env.HOSTFRONTEND}/reset-password?email=${email}`;

            // Enviar el correo
            await this.mailService.sendMail({
                to: email,
                subject: 'Reinicio de contraseña - therapyTools',
                html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reestablecer contraseña</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #007bff;
            padding: 10px;
            color: white;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content a {
            color: #007bff;
            text-decoration: none;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>TherapyTools</h1>
        </div>
        <div class="content">
            <p>Hola</p>
            <p>Se ha solicitado el reinicio de la contraseña para su cuenta en <strong>TherapyTools</strong>. Por favor, haga click en el siguiente enlace para reiniciarla:</p>
            <p><a href="${urlResetPassword}" >Reiniciar Contraseña</a></p>
            <p>Este es su codigo de verificacion: ${code}</p>
            <p>Si no solicitó este cambio, puede ignorar este correo.</p>
        </div>
        <div class="footer">
            <p>Saludos,<br>Equipo de TherapyTools</p>
        </div>
    </div>
</body>
</html>
`
            });
            return code;
        }
        catch (error) {
            return error;
        }
    }

}
