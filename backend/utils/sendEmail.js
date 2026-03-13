import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  //Transporter = postman , yeh decide karta hai konse email server or kaise authentication
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //gmail ka smtp server
    port: 465, //secure (ssl)
    secure: true, //SSL encryption ON, Data safe rahta hai
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, //yeh gmail password hai
    },
  });

  await transporter.sendMail({
    from: `"StudentMgt Portal" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

// import nodemailer from "nodemailer";

// export const sendEmail = async ({ to, subject, text }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: `"Student Portal" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//     });

//     console.log("Email sent:", info);
//   } catch (error) {
//     console.log("MAIL ERROR:", error);
//   }
// };
