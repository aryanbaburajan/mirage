import { createProduct } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();

  const product = await createProduct(body.userId);

  return Response.json({ success: product != null, product });
}
