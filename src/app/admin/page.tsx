import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Goodness for All CMS",
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
