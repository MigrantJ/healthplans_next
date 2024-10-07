import React from "react";

import { Providers } from "./providers";
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: "HealthPlansNext",
  description: "Find the right health plan for your needs",
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
