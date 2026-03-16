// import nodemailer from "nodemailer";

// export const sendEmail = async ({ to, subject, text }) => {
//   //Transporter = postman , yeh decide karta hai konse email server or kaise authentication
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com", //gmail ka smtp server
//     port: 587, //secure (ssl)
//     secure: false, //SSL encryption ON, Data safe rahta hai
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS, //yeh gmail password hai
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//     connectionTimeout: 20000,
//   });

//   await transporter.sendMail({
//     from: `"StudentMgt Portal" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     text,
//   });
// };

// // import nodemailer from "nodemailer";

// // export const sendEmail = async ({ to, subject, text }) => {
// //   try {
// //     const transporter = nodemailer.createTransport({
// //       host: "smtp.gmail.com",
// //       port: 465,
// //       secure: true,
// //       auth: {
// //         user: process.env.EMAIL_USER,
// //         pass: process.env.EMAIL_PASS,
// //       },
// //     });

// //     const info = await transporter.sendMail({
// //       from: `"Student Portal" <${process.env.EMAIL_USER}>`,
// //       to,
// //       subject,
// //       text,
// //     });

// //     console.log("Email sent:", info);
// //   } catch (error) {
// //     console.log("MAIL ERROR:", error);
// //   }
// // }

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "StudentMgt Portal <onboarding@resend.dev>",
      to,
      subject,
      text,
    });

    if (error) {
      console.log("Email error:", error);
      throw new Error(error.message);
    }

    console.log("Email sent successfully:", data);
  } catch (error) {
    console.log("sendEmail error:", error);
    throw error;
  }
};
