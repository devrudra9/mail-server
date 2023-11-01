const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Configure Nodemailer to use SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    auth: {
        user: 'username',
        pass: 'password'
    }
});

const sendEmail = async (from, to, subject, body) => {
    const mailOptions = {
        from,
        to,
        subject,
        body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.log(error);
    }
};


app.post('/send-email', async (req, res) => {
    const from = req.body.from;
    const to = req.body.to;
    const subject = req.body.subject;
    const body = req.body.body;

    try {
        await sendEmail(from, to, subject, body);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const receiveEmail = async (req, res) => {
    const email = req.body;

    // Save the email to a database or do something else with it

    res.sendStatus(200);
};

app.post('/receive-email', async (req, res) => {
    await receiveEmail(req, res);
});



const port = 3000;

app.listen(port, () => {
    console.log(`Mail server listening on port ${port}`);
});





/*

// Define a route for sending emails
app.post('/send-email', async (req, res) => {
    const { sender, recipient, subject, body } = req.body;

    // Validate the request
    if (!sender || !recipient || !subject || !body) {
        return res.status(400).send('Invalid request');
    }

    // Send the email
    try {
        await transporter.sendMail({
            from: sender,
            to: recipient,
            subject: subject,
            text: body
        });

        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send email');
    }
});

// Start the Express server
app.listen(3000, () => {
    console.log('Mail server listening on port 3000');
});

*/