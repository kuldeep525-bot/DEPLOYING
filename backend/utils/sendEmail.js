// // import nodemailer from "nodemailer";

// // export const sendEmail = async ({ to, subject, text }) => {
// //   //Transporter = postman , yeh decide karta hai konse email server or kaise authentication
// //   const transporter = nodemailer.createTransport({
// //     host: "smtp.gmail.com", //gmail ka smtp server
// //     port: 587, //secure (ssl)
// //     secure: false, //SSL encryption ON, Data safe rahta hai
// //     auth: {
// //       user: process.env.EMAIL_USER,
// //       pass: process.env.EMAIL_PASS, //yeh gmail password hai
// //     },
// //     tls: {
// //       rejectUnauthorized: false,
// //     },
// //     connectionTimeout: 20000,
// //   });

// //   await transporter.sendMail({
// //     from: `"StudentMgt Portal" <${process.env.EMAIL_USER}>`,
// //     to,
// //     subject,
// //     text,
// //   });
// // };

// // // import nodemailer from "nodemailer";

// // // export const sendEmail = async ({ to, subject, text }) => {
// // //   try {
// // //     const transporter = nodemailer.createTransport({
// // //       host: "smtp.gmail.com",
// // //       port: 465,
// // //       secure: true,
// // //       auth: {
// // //         user: process.env.EMAIL_USER,
// // //         pass: process.env.EMAIL_PASS,
// // //       },
// // //     });

// // //     const info = await transporter.sendMail({
// // //       from: `"Student Portal" <${process.env.EMAIL_USER}>`,
// // //       to,
// // //       subject,
// // //       text,
// // //     });

// // //     console.log("Email sent:", info);
// // //   } catch (error) {
// // //     console.log("MAIL ERROR:", error);
// // //   }
// // // }

export const sendEmail = async ({ to, subject, text }) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: "StudentMgt Portal", email: process.env.EMAIL_USER },
      to: [{ email: to }],
      subject,
      textContent: text,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Brevo error:", data);
    throw new Error(data.message || "Email send failed");
  }

  console.log("Email sent successfully:", data);
};
