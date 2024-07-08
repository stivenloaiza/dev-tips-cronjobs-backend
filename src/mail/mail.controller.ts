import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('signup')
  async signup(@Body() body: { name: string; email: string }) {
    const { name, email } = body;

    const subject = 'Thanks You For Subscribing!';
    const text = `Hi ,\n\nThank you for signing up! We're excited to have you on board.`;
    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, Helvetica, sans-serif;
            }
            table {
                border-collapse: collapse;
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
            }
            img {
                max-width: 100%;
                height: auto;
                display: block;
            }
            .container {
                padding: 20px;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content h1 {
                font-size: 24px;
                line-height: 1.25;
            }
            .content p {
                font-size: 16px;
                line-height: 1.5;
            }
            .footer {
                font-size: 12px;
                line-height: 1.4;
                text-align: left;
            }
            @media only screen and (max-width: 600px) {
                .content h1 {
                    font-size: 20px;
                }
                .content p {
                    font-size: 14px;
                }
                .container {
                    padding: 10px;
                }
            }
        </style>
    </head>
    <body>
        <table align="center" class="container">
            <tr>
                <td align="center">
                    <img src="https://lh3.googleusercontent.com/pw/AP1GczO9xA1DnT9ytwA9IcfgCKxPqae7jw3CIHE21JqKPozBaJHEYcrkC2upwuoiiFS35CwVuKtMQpnasJtXvkP6022qIMFBInI1Xk-OU4GzEZmwpBnLDt1oq6c4OAtgyL1lpP3SdDWj_t7-nfvsppk3K4TbDw=w528-h528-s-no-gm?authuser=0" alt="" width="200px" height="auto">
                </td>
            </tr>
            <tr>
                <td align="center">
                    <img src="https://lh3.googleusercontent.com/pw/AP1GczMktmvpZu4hprRlo3UrGLMVpqQgTWLHLRg-gf1qsKKcmEmOCBpHZp1cvCG1F_Eg3HbZu6Vy9utT9olsZfXfET2P3IZR_TQuFtQZAHswn80EB7zsNA9O6EijSi1ot24ogxL8Tna_Tsv7lLPolyF4Eyfx4g=w844-h633-s-no-gm?authuser=0" alt="" width="400px" height="auto"> 
                </td>
            </tr>
            <tr>
                <td valign="top" class="content">
                    <h1>¡Gracias ${name} por unirte a nuestra comunidad de tips para desarrolladores!</h1>
                </td>
            </tr>
            <tr>
                <td valign="top" class="content">
                    <p>Estamos encantados de darte la bienvenida a la familia de DevTips. Aquí encontrarás tips para potenciar tus habilidades como desarrollador y mantener tu pasión por la programación siempre en alza.</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 30px 20px 10px;">
                    <table class="tblLine" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-top: 0px solid rgb(225, 225, 225); min-width: 1px;">
                        <tbody>
                            <tr><td><span></span></td></tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table class="tblLine" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-top: 3px solid rgb(127, 127, 127); min-width: 1px; border-right-color: rgb(127, 127, 127); border-bottom-color: rgb(127, 127, 127); border-left-color: rgb(127, 127, 127);">
                        <tbody>
                            <tr><td><span></span></td></tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px 20px 30px;">
                    <table class="tblLine" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-top: 0px solid rgb(225, 225, 225); min-width: 1px;">
                        <tbody>
                            <tr><td><span></span></td></tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <img src="https://lh3.googleusercontent.com/pw/AP1GczNT-iR6Nv8zU0E8UuPXZeDZ0O4fsZUI6msY9rKFk0JtfvFwno9vTUMKWkt8xdSSgx0dpxtQ-99hvKEKejh3EPlgvIyFNUo2TOX8yRNZqY9eUBVttaxuR_2bLqc9bWZkZs1oIDm3jEFIs2pZzbc7FaSF0g=w1366-h385-s-no-gm?authuser=0" alt="" width="200px" height="auto">
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; word-break: break-word;" valign="top" align="left">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tbody>
                            <tr>
                                <td class="footer" align="left">
                                    <span>Este mensaje fue enviado a ${email}</span>
                                    <br> Cl. 16 #55-129 - Guayabal - 3° Piso
                                    <br><br>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

    try {
      await this.mailService.sendEmail(email, subject, text, html);
      return { message: 'Welcome email sent successfully!' };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { message: 'Failed to send welcome email.' };
    }
  }
}
