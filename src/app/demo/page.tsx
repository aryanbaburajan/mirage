import ProductPreview from "../../components/dashboard/productpreview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const feed = [
  {
    "id": 1714137629357,
    "name": "CQ2",
    "link": "https://cq2.co/",
    "description":
      "Built for complex discussions. Unique sliding panes design with quote-level and n-level threads to help you hyper-focus on one thing at a time. No more losing context. No more copy-pasting quotes.",
    "twitter": "cq2_co",
    "topics": ["API", "SDK"],
    "status": "scheduled",
    "logoSrc": "https://github.com/cq2-co.png",
    "bannerSrc":
      "https://raw.githubusercontent.com/cq2-co/cq2/main/public/demo.png",
  },
  {
    "id": 5,
    "name": "",
    "link": "",
    "description": "",
    "twitter": "",
    "topics": ["Development", "Customer Communication", "Productivity", "API"],
    "status": "scheduled",
    "logoSrc": "",
    "bannerSrc": "",
    "score": 1,
    "createdAt": 0,
  },
  {
    "id": 12,
    "name": "",
    "link": "",
    "description": "",
    "twitter": "",
    "topics": ["Open Source", "Development", "Fundraising", "API"],
    "status": "scheduled",
    "logoSrc": "",
    "bannerSrc": "",
    "score": 1,
    "createdAt": 0,
  },
  {
    "id": 14,
    "name": "",
    "link": "",
    "description": "",
    "twitter": "",
    "topics": ["Productivity", "Development", "Bots", "Crowdfunding"],
    "status": "scheduled",
    "logoSrc": "",
    "bannerSrc": "",
    "score": 1,
    "createdAt": 0,
  },
];

// export default function FeedEmail(props: {
//   firstName: string;
//   feed: Product[];
// }) {

export default function Feed() {
  return (
    <div className="w-[600px]">
      <div className="m-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Hey!</CardTitle>
            <CardDescription>
              Here's your personalized product feed for the week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {feed.map((product) => {
              return (
                <div className="mt-16" key={product.id}>
                  <ProductPreview product={product} />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
