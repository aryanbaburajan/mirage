"use client";

import ProductPreview from "@/components/dashboard/productpreview";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loadingspinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import TopicSelect from "@/components/ui/topicselect";
import { useToast } from "@/components/ui/use-toast";
import Product, {
  getProductDisplayName,
  validateProductData,
} from "@/lib/product";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const router = useRouter();
  const { toast } = useToast();

  const { user, isLoading, isAuthenticated } = useKindeBrowserClient();
  if (!isLoading && !isAuthenticated) router.push("/api/auth/login");

  const [productData, setProductData] = useState<Product>();
  const setTopics = (topics: string[]) => {
    if (productData) {
      setProductData({
        ...productData,
        topics: topics,
      });
    }
  };

  const updateProduct = async () => {
    const { valid, error } = validateProductData(productData!);

    if (!valid) {
      toast({ title: error?.errors[0].message });
      return;
    }

    const body = {
      userId: user!.id,
      productId: parseInt(params.productId),
      productData,
    };

    const response = await fetch("/api/product/set", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.success) toast({ title: "Saved." });
  };

  const deleteProduct = async () => {
    const body = {
      userId: user!.id,
      productId: params.productId,
    };

    const response = await fetch("/api/product/delete", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (data.success) router.refresh();
  };

  useEffect(() => {
    async function fetchProductData() {
      const response = await fetch(
        `/api/product/get?userId=${user!.id}&productId=${params.productId}`,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      setProductData(data.product);
    }

    if (!isLoading) fetchProductData();
  }, [isLoading]);

  return productData != null ? (
    <main
      className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-3"
      style={{ wordBreak: "break-word" }}
    >
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/dashboard">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {getProductDisplayName(productData.name)}
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            Published
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">Discard</Link>
            </Button>
            <Button size="sm" onClick={updateProduct}>
              Save Product
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-[repeat(3,minmax(0,1fr))] lg:gap-8">
          <div className="grid items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 word-wrap">
                  <div className="grid gap-3">
                    <Label>Name</Label>
                    <Input
                      type="text"
                      className="w-full"
                      placeholder="Google"
                      value={productData.name}
                      onChange={(e) =>
                        setProductData({ ...productData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Link</Label>
                    <Input
                      type="text"
                      className="w-full"
                      placeholder="https://google.com"
                      value={productData.link}
                      onChange={(e) =>
                        setProductData({ ...productData, link: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Description</Label>
                    <Textarea
                      className="min-h-32"
                      placeholder="Search the world's information, including webpages, images, videos and more. Google helps you find exactly what you're looking for."
                      value={productData.description}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>twitter.com/</Label>
                    <Input
                      type="text"
                      className="w-full"
                      placeholder="google"
                      value={productData.twitter}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          twitter: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <TopicSelect
                  topicsHook={productData.topics}
                  setTopicsHook={setTopics}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductPreview product={productData} />
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label>Status</Label>
                    <Select
                      value={productData.status}
                      onValueChange={(status) =>
                        setProductData({ ...productData, status })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Product Image URLs</CardTitle>
                <CardDescription>Links to your product images.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label>Logo</Label>
                    <Input
                      type="text"
                      className="w-full"
                      placeholder="https://google.com/logo.png"
                      value={productData.logoSrc}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          logoSrc: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Banner</Label>
                    <Input
                      type="text"
                      className="w-full"
                      placeholder="https://google.com/screenshot.png"
                      value={productData.bannerSrc}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          bannerSrc: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Delete Product</CardTitle>
                <CardDescription>
                  Delete this product from your profile.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button size="sm" variant="secondary">
                      Delete Product
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this product from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteProduct}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            <Link href="/dashboard">Discard</Link>
          </Button>
          <Button size="sm" onClick={updateProduct}>
            Save Product
          </Button>
        </div>
      </div>
    </main>
  ) : (
    <LoadingSpinner />
  );
}
