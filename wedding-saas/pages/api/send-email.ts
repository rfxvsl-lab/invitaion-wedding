import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
        console.error('Missing SMTP Credentials');
        return res.status(500).json({ message: 'Server configuration error: Missing SMTP credentials' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or use host/port for other providers
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        await transporter.sendMail({
            from: `"WeddingSaaS Support" <${emailUser}>`,
            to,
            subject,
            html,
        });

        return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error: any) {
        console.error('Email sending failed:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
