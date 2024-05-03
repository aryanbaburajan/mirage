import Navbar from "@/components/dashboard/navbar";
import Topbar from "@/components/dashboard/topbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/api/auth/login");
  const user = await getUser();

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <Navbar />
        <div className="h-screen flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Topbar userName={user!.email} />
          {children}
        </div>
      </div>
    </>
  );
}
