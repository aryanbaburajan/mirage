"use client";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function CreateProduct(props: { userId: string }) {
  const router = useRouter();

  const createProduct = async () => {
    const body = {
      userId: props.userId,
    };

    const response = await fetch("/api/product/create", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.success) router.push(`/dashboard/${data.product.id}`);
  };

  return (
    <Button size="sm" className="h-7 gap-1" onClick={createProduct}>
      <PlusCircle className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Create Product
      </span>
    </Button>
  );
}
