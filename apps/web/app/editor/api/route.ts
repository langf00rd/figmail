import { createTransport } from "nodemailer";

export async function POST(request: Request): Promise<Response> {
  const { html, receipient } = (await request.json()) as {
    html: string;
    receipient: string;
  };
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "langfordquarshie21@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: "langfordquarshie21@gmail.com",
    to: receipient,
    subject: "This is a test email",
    html,
  });

  return new Response(`${JSON.stringify(info)}`);
}
