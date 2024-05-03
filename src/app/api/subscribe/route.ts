import { addReader } from "@/lib/db";
import { verifyToken } from "@/lib/captcha";
import { emailRegex } from "@/lib/utils";
import { sendMail } from "@/lib/sendmail";

export async function POST(request: Request) {
  const body = await request.json();

  const captchaVerified = verifyToken(body.token);

  if (!captchaVerified)
    return Response.json(
      { success: false },
      { status: 498, statusText: "Invalid reCAPTCHA token." }
    );

  if (!emailRegex.test(body.email))
    return Response.json(
      { success: false },
      { status: 406, statusText: "Invalid email." }
    );

  await addReader(body.email, body.topics);
  await sendMail(body.email, "Subscribed!", "Thanks for subscribing!");

  return Response.json({ success: true }, { status: 202, statusText: "OK" });
}
