import { setProduct } from "@/lib/db";
import { ProductSchema } from "@/lib/product";

export async function POST(request: Request) {
  const body = await request.json();

  const userId = body.userId;
  const productId = body.productId;
  const productData = body.productData;

  let result = false;
  const valid = ProductSchema.safeParse(productData).success;
  if (valid) result = await setProduct(userId, productId, productData);

  if (result) {
    return Response.json({
      success: true,
    });
  } else {
    return Response.json({ success: false });
  }
}
