import { getUserProductsAndSubscribers } from "@/lib/db";
import Product from "@/lib/product";
import { getFormattedDate } from "@/lib/utils";
import type { NextRequest } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log("Sending the weekly.");

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    const { subscribers, products } = await getUserProductsAndSubscribers();
    const date = getFormattedDate();
    let data: any[] = [];

    for (const subscriber of subscribers) {
      let filteredProducts = products
        .slice()
        .filter((product) =>
          product.launchedAt != undefined
            ? subscriber.createdAt > product.launchedAt
            : true
        );

      for (const product of filteredProducts) {
        const score = calculateScore(product, subscriber.topics);
        (product as any).score = score;
      }

      filteredProducts.sort((a, b) => (b as any).score - (a as any).score);
      filteredProducts = filteredProducts.filter(
        (product) => (product as any).score != 0
      );

      let feed = filteredProducts.slice(0, 7);
      feed.push(
        ...filteredProducts
          .slice(7)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
      );

      const email = emailTemplate.replace(
        "{product}",
        feed
          .map((product) => {
            return productTemplate
              .replace("{name}", product.name)
              .replace("{description}", product.description)
              .replace("{link}", product.link)
              .replace("{logoSrc}", product.logoSrc)
              .replace("{bannerSrc}", product.bannerSrc);
          })
          .join("\n")
      );

      // console.log(email);

      data.push(
        await resend.emails.send({
          from: "Mirage <onboarding@resend.dev>",
          to: [subscriber.email],
          subject: `Your weekly for ${date}.`,
          html: email,
        })
      );

      // data.push({
      //   subscriber,
      //   feed: filteredProducts.map((product) => {
      //     return { id: product.id, topics: product.topics };
      //   }),
      // });
    }

    // data.push(
    //   await resend.emails.send({
    //     from: "Mirage <onboarding@resend.dev>",
    //     to: ["aryanbaburajan2007@gmail.com"],
    //     subject: "The weekly should have been sent.",
    //     text: `Hey Aryan, this is a reminder that the weekly email has been sent for ${products.length} products to ${subscribers.length} users.`,
    //   })
    // );

    // set launch dates of all products

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}

function calculateScore(product: Product, userTopics: string[]): number {
  let score = 0;
  for (const topic of product.topics) {
    if (userTopics.includes(topic)) {
      score++;
    }
  }
  return score;
}
