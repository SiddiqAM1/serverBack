"use strict";
const nodemailer = require("nodemailer");
const { config } = require("nodemon");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 	587,
  secure:false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'ahmedmuhammadsiddiq@gmail.com',
    pass: 'mzvk ibxx quyz nfup'
  }
});

function sendMail(req,res){
    const {sender,message,fname,lname,contact} = req.body
    main(sender,"ahmedmuhammadsiddiq@gmail.com",message,fname,lname,contact).catch(console.error)
    res.status(200).json({message:"sent succesfully"})
    
}

// async..await is not allowed in global scope, must use a wrapper
async function main(sender , reciever , message,fname,lname,contact) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"${fname+lname}" <${sender}>`, // sender address
    to: "Humayunhussain18@gmail.com,ayazhussain273@gmail.com,exclusive.dubai.01@gmail.com", // list of receivers
    subject: "Enquiry", // Subject line
    text: message, // plain text body
    html: `<b>${message}</b><div>${contactr}</div>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

module.exports=sendMail


