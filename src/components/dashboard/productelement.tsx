"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import Product, { getProductDisplayName } from "@/lib/product";
import { capitalizeFirstLetter, getNextSundayDate } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

export default function ProductElement(props: { product: Product }) {
  const router = useRouter();

  return (
    <TableRow
      onClick={() => {
        router.push(`/dashboard/${props.product.id}`);
      }}
      className="cursor-pointer"
    >
      <TableCell className="hidden sm:table-cell">
        {props.product.logoSrc != "" ? (
          <Image
            alt="Product logo"
            className="aspect-square rounded-md object-cover"
            height="64"
            width="64"
            src={props.product.logoSrc}
          />
        ) : (
          <ImageIcon size="64" className="stroke-brown stroke-2" />
        )}
      </TableCell>
      <TableCell className="font-medium">
        {getProductDisplayName(props.product.name)}
      </TableCell>
      <TableCell>
        <Badge variant="outline">
          {capitalizeFirstLetter(props.product.status)}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">-</TableCell>
      <TableCell className="hidden md:table-cell">
        {props.product.status == "scheduled" ? getNextSundayDate() : "-"}
      </TableCell>
    </TableRow>
  );
}
