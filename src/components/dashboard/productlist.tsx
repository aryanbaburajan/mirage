import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { getUserProducts } from "@/lib/db";
import Product from "@/lib/product";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ProductElement from "./productelement";

function FilteredProductList(props: { products: Product[]; status: string }) {
  return (
    <TabsContent value={props.status}>
      <Card>
        <CardHeader>
          <CardTitle className="text-orange font-bold">Products</CardTitle>
          <CardDescription>
            Manage your products and view their performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell"></TableHead>
                <TableHead className="text-orange font-bold">Name</TableHead>
                <TableHead className="text-orange font-bold">Status</TableHead>
                <TableHead className="hidden md:table-cell text-orange font-bold">
                  Total Clicks
                </TableHead>
                <TableHead className="hidden md:table-cell text-orange font-bold">
                  Launch Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.products.flatMap((product) => {
                return product.status == props.status || props.status == "all"
                  ? [<ProductElement product={product} key={product.id} />]
                  : [];
              })}
            </TableBody>
          </Table>
        </CardContent>
        {/* <CardFooter>
      <div className="text-xs text-muted-foreground">
        Showing <strong>1-10</strong> of <strong>32</strong> products
      </div>
    </CardFooter> */}
      </Card>
    </TabsContent>
  );
}

export default async function ProductList() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const products = await getUserProducts(user!.id);

  return (
    <>
      <FilteredProductList products={products} status="all" />
      <FilteredProductList products={products} status="scheduled" />
      <FilteredProductList products={products} status="draft" />
      <FilteredProductList products={products} status="launched" />
    </>
  );
}
