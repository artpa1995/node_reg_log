import nodemailer from 'nodemailer';

class MailServiceController {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            service:'gmail',
            auth: {
               
                Username: process.env.SMTP_USER,
                Password: process.env.SMTP_PASSWORD,
                type: "OAUTH2",
                // clientId: process.env.OAUTH_CLIENT_ID,
                // clientSecret: process.env.OAUTH_CLIENT_SECRET,
                // refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                // accessToken: process.env.OAUTH_ACCESS_TOKEN,
                // expires: 3599
            }
        })
    }
   
    async sendActivationMail(to, link) {
        return link;

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Confirm account" + process.env.API_URL,
            text : '',
            html:
            `<div>
                <h1>clik on link for activated your account</h1>
                <a href="${link}">"${link}"</a>
            </div> `
        })
    }
}

export default new MailServiceController()