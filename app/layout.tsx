import React from "react";

import { Providers } from "./providers";
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: "HealthPlansNext",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
