const express = require('express');
const { configDotenv} = require('dotenv');
const send_email = require('./emails/email');


configDotenv()

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.post('/', async(req, res) => {
    try {
        const email_options = {
            to: process.env.EMAIL_USER,
            subject: 'Test Email',
            message: 'This is a test email',
            context: {
                name: 'John Doe', // Example variable for the template
            }
        }
        await send_email(email_options);
        res.status(200).json({
            success: true,
            message: 'Email sent successfully'

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack,
            name: error.name
        })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})