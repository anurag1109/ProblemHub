const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const encryptPassword = (password, salt) => {
  const encodedPassword = crypto.pbkdf2Sync(
    password,
    salt,
    10000,
    64,
    "sha512"
  );
  return Buffer.from(encodedPassword, "binary").toString("hex");
};
module.exports.encryptPassword = encryptPassword;

module.exports.salt = () => {
  return crypto.randomBytes(32).toString("hex");
};
module.exports.checkPassword = (password, hashedPassword, salt) => {
  if (encryptPassword(password, salt) === hashedPassword) {
    return true;
  }
  return false;
};

module.exports.access_token_generator = (data) => {
  return jwt.sign(data, process.env.TOKEN_KEY, {algorithm: 'HS256', expiresIn: '7h' });
};
module.exports.refresh_token_generator=(data)=>{
  return jwt.sign(data, process.env.TOKEN_KEY+"REFRESH", {algorithm: 'HS256', expiresIn: '7h' });
}




module.exports.sendEmail = (email, varificationCode) => {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: "Varification",
      text: `varification code is ${varificationCode} `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // resolve({err:error,status:false})
        reject(new Error("email is not send"));
      } else {
        resolve({
          info: info.response,
          status: true,
          varificationCode: varificationCode,
        });
      }
    });
  });
};

module.exports.generateVarificatioCode = () => {
  let min = 111111;
  let max = 999999;
  return Math.floor(Math.random() * (max - min)) + min;
};
