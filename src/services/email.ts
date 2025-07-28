
'use server';

import nodemailer from 'nodemailer';

interface MailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: {
    filename: string;
    content: string;
    encoding: 'base64';
    contentType: string;
  }[];
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendMail({ to, subject, html, attachments }: MailOptions) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    // In a real app, you might want more robust error handling, e.g., using a monitoring service.
    throw new Error('Could not send email.');
  }
}

interface VisaApplicationEmailProps {
    applicantName: string;
    applicantEmail: string;
    attachments: {
        filename: string;
        content: string;
        encoding: 'base64';
        contentType: string;
    }[];
}

export async function sendVisaApplicationEmail({ applicantName, applicantEmail, attachments }: VisaApplicationEmailProps) {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    if (!adminEmail) {
        console.error("No admin email address configured. Cannot send visa application email.");
        return;
    }

    const subject = `New Visa Application from ${applicantName}`;
    const html = `
        <h1>New Visa Application Received</h1>
        <p>A new visa application has been submitted through the website.</p>
        <p><strong>Applicant Name:</strong> ${applicantName}</p>
        <p><strong>Applicant Email:</strong> ${applicantEmail}</p>
        <p>The applicant's passport copy and photo are attached to this email.</p>
        <p>Please review the documents and follow up with the applicant directly.</p>
    `;

    await sendMail({
        to: adminEmail,
        subject,
        html,
        attachments
    });
}
