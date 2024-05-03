import { isUserProductOwner } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { productId: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!(await isUserProductOwner(user!.id, parseInt(params.productId))))
    redirect("/dashboard");

  return children;
}
