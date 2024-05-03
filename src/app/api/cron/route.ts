import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  console.log("hey");
  try {
    const data = await resend.emails.send({
      from: "Mirage <onboarding@resend.dev>",
      to: ["aryanbaburajan2007@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    });
    console.log(data);
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
