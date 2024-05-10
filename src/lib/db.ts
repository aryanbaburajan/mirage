import "server-only";

import Product from "@/lib/product";
import { MongoClient, PushOperator, ServerApiVersion } from "mongodb";
import Subscriber from "./subscriber";

if (!process.env.MONGODB_URI) {
  throw new Error(
    ' db.ts: Invalid/Missing environment variable: "MONGODB_URI"'
  );
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
export let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function ping() {
  const client = await clientPromise;

  await client.db("admin").command({ ping: 1 });
  console.log(" ping: MongoDB is connected.");
}

export async function addReader(email: string, topics: string[]) {
  const client = await clientPromise;

  const database = client.db("subscriberListDB");
  const collection = database.collection("subscribers");

  const subscriberObject = { email: email, topics: topics };
  await collection.insertOne(subscriberObject);

  console.log(` addReader: Email ${email} subscribed to mailing list.`);
}

function generateProductId() {
  return new Date().getTime();
}

export async function createProduct(userId: string) {
  const client = await clientPromise;

  const database = client.db("productListDB");
  const collection = database.collection("user_products");

  let user: any = await collection.findOne({ userId: userId });

  if (!user) {
    user = {
      userId: userId,
      products: [],
    };
    await collection.insertOne(user);
  }

  const productId = generateProductId();

  const product: Product = {
    id: productId,
    name: "",
    link: "",
    description: "",
    twitter: "",
    topics: [],
    status: "draft",
    logoSrc: "",
    bannerSrc: "",
  };

  await collection.updateOne(
    { userId: userId },
    { $push: { products: product } as unknown as PushOperator<Document> }
  );

  console.log(
    `createProduct: Product created under user ${userId} with product ID ${productId}.`
  );
  return product;
}

export async function getProduct(userId: string, productId: number) {
  const client = await clientPromise;

  const database = client.db("productListDB");
  const collection = database.collection("user_products");

  const user = await collection.findOne({ userId: userId });

  if (user) {
    const product = user.products.find((p: Product) => {
      return p.id == productId;
    });

    if (product) {
      console.log(
        ` getProduct: Fetched product ${productId} for user ${userId}.`
      );
      return product;
    } else {
      console.log(
        ` getProduct: Product ${productId} not found for user ${userId}.`
      );
      return null;
    }
  } else {
    console.log(` getProduct: User ${userId} does not exist.`);
    return null;
  }
}

export async function setProduct(
  userId: string,
  productId: number,
  productData: Product
) {
  const client = await clientPromise;
  const database = client.db("productListDB");
  const collection = database.collection("user_products");

  const user = await collection.findOne({ userId: userId });
  if (user) {
    const existingProductIndex = user.products.findIndex(
      (p: Product) => p.id === productId
    );
    if (existingProductIndex !== -1) {
      user.products[existingProductIndex] = productData;
      await collection.updateOne(
        { userId: userId },
        { $set: { products: user.products } }
      );
      console.log(
        ` setProduct: Product ${productId} updated for user ${userId}.`
      );
      return true;
    } else {
      console.log(
        ` setProduct: Product ${productId} does not exist for user ${userId}.`
      );
      return false;
    }
  } else {
    console.log(` setProduct: User ${userId} does not exist.`);
    return false;
  }
}

export async function getUserProducts(userId: string) {
  const client = await clientPromise;
  const database = client.db("productListDB");
  const collection = database.collection("user_products");

  const user = await collection.findOne({ userId: userId });
  if (user) {
    console.log(` getUserProducts: Products retrieved for user ${userId}.`);
    return user.products;
  } else {
    console.log(` getUserProducts: User ${userId} does not exist.`);
    return null;
  }
}

export async function getProductCount(userId: string) {
  const client = await clientPromise;
  const database = client.db("productListDB");
  const collection = database.collection("user_products");

  const user = await collection.findOne({ userId: userId });
  if (user) {
    return user.products.length;
  } else {
    console.log(` getProductCount: User ${userId} does not exist.`);
    return 0;
  }
}

export async function deleteProduct(userId: string, productId: number) {
  const client = await clientPromise;
  const database = client.db("productListDB");
  const collection = database.collection("user_products");

  const user = await collection.findOne({ userId: userId });
  if (user) {
    const filteredProducts = user.products.filter((product: Product) => {
      return product.id != productId;
    });

    await collection.updateOne(
      { userId: userId },
      { $set: { products: filteredProducts } }
    );
    console.log(
      ` deleteProduct: Product ${productId} deleted from under user ${userId}.`
    );
    return true;
  } else {
    console.log(` deleteProduct: User ${userId} does not exist.`);
    return false;
  }
}

export async function isUserProductOwner(userId: string, productId: number) {
  const client = await clientPromise;
  const database = client.db("productListDB");
  const collection = database.collection("user_products");

  const user = await collection.findOne({ userId: userId });
  if (user) {
    return user.products.some((product: Product) => product.id === productId);
  } else {
    console.log(` isUserProductOwner: User ${userId} does not exist.`);
    return false;
  }
}

export async function getUserProductsAndSubscribers() {
  const client = await clientPromise;

  const productListDB = client.db("productListDB");
  const subscriberListDB = client.db("subscriberListDB");
  const productCollection = productListDB.collection("user_products");
  const subscriberCollection = subscriberListDB.collection("subscribers");
  const subscribers: Subscriber[] = (
    await subscriberCollection.find().toArray()
  ).map((doc) => {
    return { email: doc.email, topics: doc.topics, createdAt: doc.createdAt };
  });
  const products: Product[] = (
    await productCollection.find({ "products.status": "scheduled" }).toArray()
  ).flatMap((doc) => doc.products);

  return { subscribers, products };
}
