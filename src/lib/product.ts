import { z } from "zod";

export function getProductDisplayName(productName: string) {
  return productName === "" ? "Untitled" : productName;
}

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string().max(30, { message: "Name cannot exceed 30 characters." }),
  link: z
    .string()
    .url({ message: "Link is not a valid url." })
    .max(40, { message: "Link cannot exceed 40 characters." }),
  description: z.string().max(200, {
    message: "Description cannot exceed 200 letters (for better formatting).",
  }),
  twitter: z
    .string()
    .max(15, { message: "Twitter handle cannot exceed 15 characters." }),
  topics: z.array(z.string()),
  status: z
    .string()
    .regex(/^(draft|scheduled|launched)$/, { message: "Invalid status." }),
  logoSrc: z
    .string()
    .url({ message: "Logo is not a valid url." })
    .max(250, { message: "Banner url cannot exceed 250 letters." }),
  bannerSrc: z
    .string()
    .url({ message: "Banner is not a valid url." })
    .max(250, { message: "Banner url cannot exceed 250 letters." }),
});

type Product = z.infer<typeof ProductSchema>;
export default Product;

export function validateProductData(product: Product) {
  const parse = ProductSchema.safeParse(product);
  return { valid: parse.success, error: parse.error };
}
