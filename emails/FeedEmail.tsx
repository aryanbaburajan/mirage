import Font from "@/components/email/font";
// import {
// 	Card,
// 	CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { Head, Html, Preview, Tailwind } from "@react-email/components";

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
    "createdAt": 0,
  },
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
    "bannerSrc": "",
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
    "createdAt": 0,
  },
];

export default function FeedEmail() {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZNhiI2B.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your weekly feed.</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                orange: "#ed7d31",
                brown: "#6c5f5b",
                dark: "#4f4a45",
                bright: "#f6f1ee",
                background: "#f6f1ee",
                foreground: "#000000",
                card: "#f6f1ee",
                cardForeground: "#000000",
                popover: "#f6f1ee",
                popoverForeground: "#000000",
                primary: "#ed7d31",
                primaryForeground: "#000000",
                secondary: "#ed7d31",
                secondaryForeground: "#000000",
                muted: "#ed7d31",
                mutedForeground: "#4f4a45",
                accent: "#ed7d31",
                accentForeground: "#000000",
                destructive: "#EF4444",
                destructiveForeground: "#F8FAFC",
                border: "#4f4a45",
                input: "#E2E8F0",
                ring: "#020817",
                radius: "0.5rem",
              },
            },
          },
        }}
      >
        <div className="max-w-[600px] m-auto"></div>
      </Tailwind>
    </Html>
  );
}
