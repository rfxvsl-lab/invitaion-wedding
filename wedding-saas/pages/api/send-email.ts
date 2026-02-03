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

    const emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
    const emailPort = Number(process.env.EMAIL_PORT) || 465;
    const emailSecure = process.env.EMAIL_SECURE === 'true'; // true for 465, false for 587

    try {
        const transporter = nodemailer.createTransport({
            host: emailHost,
            port: emailPort,
            secure: emailSecure, // true for 465, false for other ports
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
