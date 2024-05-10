import { z } from "zod";

export const SubscriberSchema = z.object({
  email: z.string().max(30, { message: "Name cannot exceed 30 characters." }),
  topics: z.array(z.string()),
  createdAt: z.number(),
});

type Subscriber = z.infer<typeof SubscriberSchema>;
export default Subscriber;

export function validateProductData(subscriber: Subscriber) {
  const parse = SubscriberSchema.safeParse(subscriber);
  return { valid: parse.success, error: parse.error };
}
