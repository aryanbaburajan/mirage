import { verifyToken } from "@/lib/captcha";
import { getProduct } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const productId = searchParams.get("productId");
  const token = searchParams.get("token");

  const captchaVerified = verifyToken(token!);
  if (!captchaVerified)
    return Response.json(
      { success: false },
      { status: 498, statusText: "Invalid reCAPTCHA token." }
    );

  const product = await getProduct(userId!, parseInt(productId!));

  if (product) {
    return Response.json(
      { success: true, product },
      { status: 302, statusText: "OK" }
    );
  } else {
    return Response.json(
      { success: true },
      { status: 404, statusText: "Product/User not found." }
    );
  }
}
