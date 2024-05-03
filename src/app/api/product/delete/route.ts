import { deleteProduct } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();

  const success = await deleteProduct(body.userId, body.productId);

  return Response.json({ success });
}
