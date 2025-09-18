import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const data = await req.formData()
  const artist = data.get("artist")
  const firstName = data.get("firstName")
  const lastName = data.get("lastName")
  const email = data.get("email")
  const company = data.get("company")
  const event = data.get("event")
  const location = data.get("location")
  const date = data.get("date")
  const capacity = data.get("capacity")
  const message = data.get("message")

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT!),
    secure: false,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!
    }
  })

  await transporter.sendMail({
    from: `"Booking Form" <${process.env.SMTP_USER}>`,
    to: "suzi@blutonium.de",
    subject: `Booking Request: ${artist}`,
    text: `
Artist: ${artist}
From: ${firstName} ${lastName}
Email: ${email}
Company: ${company}

Event: ${event}
Location: ${location}
Date: ${date}
Capacity: ${capacity}

Message:
${message}
    `
  })

  return NextResponse.json({ ok: true })
}
