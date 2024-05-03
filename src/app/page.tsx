import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen text-center">
      <div className="w-1/5 h-1/5 m-auto">
        <Button asChild>
          <Link href="/subscribe">Subscribe</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">Launch</Link>
        </Button>
      </div>
    </main>
  );
}
