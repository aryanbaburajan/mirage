import CreateProduct from "@/components/dashboard/createproduct";
import ProductList from "@/components/dashboard/productlist";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/api/auth/login");
  const user = await getUser();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList className="border-black border-[1px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="launched">Launched</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <CreateProduct userId={user!.id} />
          </div>
        </div>
        <ProductList />
      </Tabs>
    </main>
  );
}
