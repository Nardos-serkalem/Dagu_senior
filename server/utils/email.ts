import nodemailer from 'nodemailer';
import { AppError } from './errorHandler';

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '2525'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      html: options.message
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
    throw new AppError('Error sending email', 500);
  }
};

export const sendWelcomeEmail = async (name: string, email: string): Promise<void> => {
  const message = `
    <h1>Welcome to Dagu Travel, ${name}!</h1>
    <p>Thank you for joining our community. We're excited to help you explore Ethiopia's wonders.</p>
    <p>If you have any questions, feel free to contact our support team.</p>
  `;

  await sendEmail({
    email,
    subject: 'Welcome to Dagu Travel',
    message
  });
};

export const sendBookingConfirmation = async (
  email: string,
  bookingDetails: any
): Promise<void> => {
  const message = `
    <h1>Booking Confirmation</h1>
    <p>Your booking for ${bookingDetails.package.title} has been confirmed.</p>
    <p>Details:</p>
    <ul>
      <li>Start Date: ${new Date(bookingDetails.startDate).toLocaleDateString()}</li>
      <li>Duration: ${bookingDetails.package.duration} days</li>
      <li>Number of People: ${bookingDetails.numberOfPeople}</li>
      <li>Total Price: $${bookingDetails.totalPrice}</li>
    </ul>
  `;

  await sendEmail({
    email,
    subject: 'Booking Confirmation - Dagu Travel',
    message
  });
};

export default {
  sendWelcomeEmail,
  sendBookingConfirmation
};