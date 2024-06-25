
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const templates = require('../views/welcome');
const path = require('path');

const send_email = async (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const hbs_options = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: path.resolve('./src/views/partials/'),
            // layoutsDir: './emails/layouts',
            defaultLayout: false
        },
        viewPath: path.resolve('./src/views/'),
        extName: '.handlebars',
    };
    

    transporter.use('compile', hbs(hbs_options));
    // define email options
    const email_options = {
        from: process.env.EMAIL_USER,
        to: options.to,
        subject: options.subject,
        text: options.message,
        template: 'welcome',
        context: options.context
    };

    await transporter.sendMail(email_options);
};

module.exports = send_email;