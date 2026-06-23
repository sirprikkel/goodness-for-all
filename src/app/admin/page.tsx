import type { Metadata } from "next";
import Script from "next/script";
import { getSiteContent } from "@/lib/content";

const site = getSiteContent();

export const metadata: Metadata = {
  title: site.settings.cmsTitle,
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <main id="sveltia-cms-root" className="min-h-screen">
      <Script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js" strategy="afterInteractive" />
    </main>
  );
}
