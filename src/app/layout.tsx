import type { Metadata } from "next";
import "./globals.css";
import { getSEOTags, SchemaTags } from "@/lib/seo";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = getSEOTags({ canonicalUrlRelative: "/" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <div>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
        </div>
        <Toaster />
        <SchemaTags />
      </body>
    </html>
  );
}
