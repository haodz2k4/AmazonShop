import nodemailer from "nodemailer"
import config from "../config/config"
import fs from "fs"
import path from "path"
const transporter = nodemailer.createTransport(config.mail.nodemailer)

interface MailOptions {
    html?: string
    text?: string 
}

export const sendMail = async (to: string, subject: string,content: MailOptions )  => {
    await transporter.sendMail({
        from: config.mail.from,
        to,
        subject,
        text: content.text,
        html: content.html 
    })
}

export const sendOtpEmail = async (to: string, otp: string) => {
    const subject = `LẤY LẠI MẬT KHẨU`

    const filePath = path.join(__dirname,"../templates/sendOtp.html")
    
    const currentYear = new Date().getFullYear()
    const htmlContent = fs.readFileSync(filePath,"utf8")
        .replace('{{otp}}', otp)
        .replace('{{year}}',currentYear.toString())

    htmlContent.replace("{{year}}", currentYear.toString())
    await sendMail(to, subject,{html: htmlContent})
}

