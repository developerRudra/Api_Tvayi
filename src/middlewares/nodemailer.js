const nodemailer = require("nodemailer");

exports.sendOtpInMail = (email, otp) => {
  async function main() {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rudrakumar8986576764@gmail.com",
        pass: "yuhcxzzwemtbavnw",
      },
    });

    // Generate a random OTP here
    // const otp = generateOTP();

    const info = {
      from: '"Your Brand" <rudrakumar8986576764@gmail.com>',
      to: `${email}`, //"developerrudra@yahoo.com",
      subject: "Your One-Time Password (OTP)",
      html: `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:100%;padding:20px 0;text-align:center;">
      <div style="border-bottom:1px solid #eee">
        <a href="https://example.com" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
      <img src="https://i.pinimg.com/originals/c7/4c/15/c74c15ac91ce4eb1631bfce895e79c1e.jpg" alt="Verification Image" style="max-width: 100%; height: auto; margin: 20px auto;">
      <h2 style="background: #00466a;width: max-content;padding: 0 50px;color: #fff;border-radius: 4px;display: inline-block;margin-bottom: 20px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Your Brand Inc</p>
        <p>1600 Amphitheatre Parkway</p>
        <p>California</p>
      </div>
    </div>
  </div>
      `,
    };

    try {
      let result = await transporter.sendMail(info);
      console.log("Email sent:", result);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  // Function to generate OTP
  // function generateOTP() {
  //   return Math.floor(100000 + Math.random() * 900000).toString();
  // }
  // Call the main function to send the email
  main();
};
