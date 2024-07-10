import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('welcome')
  async signup(@Body() body: { name: string; email: string }) {
    const { name, email } = body;
    const subject = 'Thank You For Subscribing!';
    const text = `Hello, Thank you for registering! We are excited to have you affiliated.`;
    const html = this.getWelcomeEmailHtml(name, email);

    return await this.sendEmail(email, subject, text, html);
  }

  @Post('tips')
  async tipoftheday(
    @Body()
    body: {
      name: string;
      email: string;
      link: string;
      img_url: string;
      tipsToStore: string;
    },
  ) {
    const { name, email, link, img_url, tipsToStore } = body;
    const subject = 'Your Tip of the Day!';
    const text = 'Your tip of the day, Congratulations!';
    const html = this.getTipOfTheDayEmailHtml(
      name,
      email,
      link,
      img_url,
      tipsToStore,
    );

    return await this.sendEmail(email, subject, text, html);
  }

  private async sendEmail(
    email: string,
    subject: string,
    text: string,
    html: string,
  ) {
    try {
      await this.mailService.sendEmail(email, subject, text, html);
      return { message: 'Email sent successfully!' };
    } catch (error) {
      console.error('Error sending email:', error);
      return { message: 'Failed to send email.' };
    }
  }

  private getWelcomeEmailHtml(name: string, email: string): string {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You For Subscribing</title>
        <style>
          body { margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; }
          table { border-collapse: collapse; width: 100%; max-width: 600px; margin: 0 auto; }
          img { max-width: 100%; height: auto; display: block; }
          .container { padding: 20px; }
          .content { padding: 20px; text-align: center; }
          .content h1 { font-size: 24px; line-height: 1.25; }
          .content p { font-size: 16px; line-height: 1.5; }
          .footer { font-size: 12px; line-height: 1.4; text-align: left; }
          @media only screen and (max-width: 600px) {
            .content h1 { font-size: 20px; }
            .content p { font-size: 14px; }
            .container { padding: 10px; }
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
              <img src="https://lh3.googleusercontent.com/pw/AP1GczNKz6R2ABUGXHoy3UCZPuuXPpyUqNwslJWNjVVY7cSUA4fAnW12Zld3NJVOZ6rnDdl116o9Srbys04Knm4C7v_5RTUo5CGjAPNvNjJ18KrR_5597rj4U-WMaKiqP2GxholKYxEU2o0EsM5nqVrHyHrqPA=w1280-h360-s-no-gm?authuser=0" alt="" width="200px" height="auto">
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; word-break: break-word;" valign="top" align="left">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tbody>
                  <tr>
                    <td class="footer" align="left">
                      <span>Este mensaje fue enviado a ${email}</span>
                      <br> Cl. 16 #55-129 - Guayabal - 3° Piso - RIWI
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
  }

  private getTipOfTheDayEmailHtml(
    name: string,
    email: string,
    link: string,
    img_url: string,
    tipsToStore: string,
  ): string {
    return `<!doctype html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tip of the day</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', Helvetica, sans-serif;
            background-color: #f4f4f4;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            max-width: 600px;
            margin: 40px auto;
          }
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
          .container {
            padding: 20px;
            background-color: white;
            border-radius: 10px;
          }
          .container2 {
            position: relative;
            padding: 40px 20px 20px 20px;
            background-image: url('${img_url}');
            background-size: cover;
            background-position: center;
            text-align: center;
            border-radius: 10px;
          }
          .container2::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 10px;
            pointer-events: none;
          }
          .custom-box {
            display: block;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            padding-left: 0;
            padding-right: 0;
          }
          .content {
            padding: 20px;
            text-align: center;
            font-family: 'Merriweather', sans-serif;
          }
          .content h1 {
            font-size: 24px;
            line-height: 1.25;
            font-family: 'Roboto', sans-serif;
          }
          .content p {
            font-size: 16px;
            line-height: 1.5;
          }
          .footer {
            font-size: 12px;
            line-height: 1.4;
            text-align: left;
            padding: 20px;
            word-break: break-word;
          }
          @media only screen and (max-width: 600px) {
            .content h1 {
              font-size: 20px;
            }
            .content p {
              font-size: 14px;
            }
            .container,
            .container2 {
              padding: 10px;
            }
          }
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&family=Merriweather&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <table align="center" class="container">
          <tr>
            <td align="center" >
              <img
                src="https://lh3.googleusercontent.com/pw/AP1GczO9xA1DnT9ytwA9IcfgCKxPqae7jw3CIHE21JqKPozBaJHEYcrkC2upwuoiiFS35CwVuKtMQpnasJtXvkP6022qIMFBInI1Xk-OU4GzEZmwpBnLDt1oq6c4OAtgyL1lpP3SdDWj_t7-nfvsppk3K4TbDw=w528-h528-s-no-gm?authuser=0"
                width="130px"
                height="auto"
              />
            </td>
          </tr>
          <tr>
            <td align="center">
              <div class="container2">
                <div class="custom-box">
                  <h3
                    style="
                    font-weight: 600;
                      padding: 10px;
                      background-color: #034158;
                      border-radius: 30px;
                      color: #ffffff;
                      text-decoration: none;
                      
                    "
                  >
                    ${tipsToStore}
                  </h3>
                  <p
                    style="
                    width:100%;
                    font-weight: 600;
                    margin: 0px;
                    font-size: 16px;
                    line-height: 1.5;
                    "
                  >
                    ${name}, Escribe código limpio y legible
                  </p>
    
                </div>
                <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #000000; border-radius: 30px; color: #ffffff; text-decoration: none; text-align: center; position: relative;">
                  Más Información, Click aqui.
                  <br>
                </a>
                
              </div>
            </td>
          </tr>
          <tr>
            <td class="footer" align="left">
              <span>Este mensaje fue enviado a ${email}</span>
              <br />
              Cl. 16 #55-129 - Guayabal - 3° Piso - RIWI <br /><br />
            </td>
          </tr>
        </table>
      </body>
    </html> `;
  }
}
