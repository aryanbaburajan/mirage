"use client";

import Product, { getProductDisplayName } from "@/lib/product";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function SidebarLink({
  product,
  href,
  ...props
}: {
  product: Product;
  href: string;
}) {
  const currentProductId = parseInt(useSelectedLayoutSegment() ?? "0");

  return (
    <Link
      className={
        product.id == currentProductId
          ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
          : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      }
      href={href}
      {...props}
    >
      {getProductDisplayName(product.name)}
    </Link>
  );
}
