"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TopicSelect from "@/components/ui/topicselect";
import { emailRegex } from "@/lib/utils";
import { useReCaptcha } from "next-recaptcha-v3";
import { useState } from "react";

export default function Subscribe() {
  const { executeRecaptcha } = useReCaptcha();

  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [topics, setTopics] = useState<string[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setError("The given email is invalid.");
    } else {
      setError("");
    }

    const token = await executeRecaptcha("form_submit");
    const body = { email: email, token: token, topics: Array.from(topics) };

    const response = await fetch("/api/subscribe", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.success) setSubmitted(true);
  };

  return submitted ? (
    <main className="flex min-h-screen">
      <div className="w-1/4 h-1/4 m-auto">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
          Subscribed.
        </h1>
      </div>
    </main>
  ) : (
    <main className="flex min-h-screen">
      <div className="w-1/4 mx-auto mt-[20vh] mb-[5em]">
        <form onSubmit={handleSubmit}>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
            Subscribe to Mirage
          </h1>

          <h3 className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight">
            Email
          </h3>
          <Input
            placeholder="johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="my-1 text-[0.8rem] font-medium text-destructive">
            {error}
          </p>

          <h3 className="mt-6 mb-5 scroll-m-20 text-lg font-semibold tracking-tight">
            What kind of products are you interested in?
          </h3>
          <TopicSelect topicsHook={topics} setTopicsHook={setTopics} />
          <Button className="mt-3" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </main>
  );
}
