"use server"

import { EmailContent, NotificationType, SearchResult } from '@/types';
import nodemailer from 'nodemailer';

export async function generateEmailBody(
  product: SearchResult[],
  type: NotificationType
  ) {

  let subject = "";
  let body = "";

  subject = 'New cars found';
      body = `
        <div>
          <h2>Found cars</h2>     
          ${product.map((item) => (
            `<p>${item.manufacturer}</p>
             <p>${item.model}</p>
             <p>${item.carLink}</p>
             <hr>
            `
          ))}
        </div>
      `;

  return { subject, body };
}

const transporter = nodemailer.createTransport({
  pool: true,
  service: 'hotmail',
  port: 2525,
  auth: {
    user: 'carsearcherapp@outlook.com',
    pass: process.env.EMAIL_PASSWORD,
  },
  maxConnections: 1
})

export const sendEmail = async (emailContent: EmailContent, sendTo: string[]) => {

  const mailOptions = {
    from: 'carsearcherapp@outlook.com',
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  }

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if(error) return console.log(error);
  })
}