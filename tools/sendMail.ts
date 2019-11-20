import Sendgrid from '@sendgrid/mail';
import { config } from "dotenv";
import { logger } from "../utility/loggers";

config({ path: ".env" });
Sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async (name: string, email: string, subject: string, content: string) => {
    const msg = {
        to: 'vitsaurav@gmail.com',
        cc: [],
        bcc: [],
        from: 'contactMe@sauravmh.me',
        replyTo: 'vitsaurav@gmail.com',
        substitutions: {
            name,
            email,
            subject,
            content
        },
        subject,
        content: [
            {
                type: 'text/plain',
                value: 'Sent by ' + name + '\n' + 'Content:' + content,
            },
            {
                type: 'text/html',
                value: '<p><b><h2>This was sent by</b></h2> <i><h4>' + name + '</h4></i><br>' + '<b><h2>Message:</h2></b></h2> <h4><i>' + content + '</h4></i><br>' + '<b><h2>E-mail:</b></h2> <h4><i>' + email + '</i></h4></p>',
            }
            
        ]
    }

    try {
        await Sendgrid.send(msg);
        logger.info('Mail sent successfully');
    } catch (err) {
        logger.info(err);
    }
};

export default sendMail;
