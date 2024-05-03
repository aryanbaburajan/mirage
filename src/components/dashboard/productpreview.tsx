import Product, { getProductDisplayName } from "@/lib/product";
import Image from "next/image";

export default function ProductPreview(props: { product: Product }) {
  return (
    <div>
      <div className="flex justify-between min-w-0">
        <div className="break-words word-wrap">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {getProductDisplayName(props.product.name)}
          </h3>
          <p className="pt-3 pr-3">{props.product.description}</p>
        </div>
        <Image
          alt="Product logo"
          height={1}
          width={1}
          src={
            props.product.logoSrc != ""
              ? props.product.logoSrc
              : "https://yt3.googleusercontent.com/vY3uYs71A_JwVcigyd2tVRHwuj05_cYktQSuzRCxta-9VFxHFtKjGrwG9WFi8ijXITBL3CwPQQ=s900-c-k-c0x00ffffff-no-rj"
          }
          className="border-solid border-black border-[1px] rounded-lg object-cover flex-none w-32 h-32"
        />
      </div>
      <Image
        alt="Product banner"
        src={
          props.product.bannerSrc != ""
            ? props.product.bannerSrc
            : "https://storage.googleapis.com/support-kms-prod/Sgi3TOs7XqRes0fQx5S5RtX4dG6Po21fR5kL"
        }
        width={1}
        height={1}
        className="aspect-video rounded-md object-cover w-full mt-3 border-solid border-black border-[1px] rounded-lg"
      />
    </div>
  );
}

// aspect-square rounded-md object-cover
