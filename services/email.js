const sgMail = require("@sendgrid/mail");
const config = require("../config/email.json");
require("dotenv").config();

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

class EmailService {
  #sender = sgMail;
  constructor(env, link) {
    this.link = link;

    switch (env) {
      case "development":
        this.link = config.dev;
        break;
      case "production":
        this.link = config.prod;
        break;
      case "stage":
        this.link = config.stage;
        break;
      default:
        break;
    }
  }

  async sendEmail(verifyToken, email) {
    const name = "new User";
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "Vol.kor.93@gmail.com",
      subject: "Registration confirmation",
      dynamic_template_data: {
        buttonLink: `${this.link}/users/verify/${verifyToken}`,
        name,
      },
      template_id: process.env.SENDGRID_TEMPLATE_ID,
    };
    await this.#sender.send(msg);
  }
}
module.exports = EmailService;
