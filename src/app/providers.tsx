"use client";

import { ReCaptchaProvider } from "next-recaptcha-v3";

const Providers = ({ children }: any) => (
  <ReCaptchaProvider
    useEnterprise
    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
  >
    {children}
  </ReCaptchaProvider>
);

export default Providers;
