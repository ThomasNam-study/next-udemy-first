import type {Metadata} from "next";
import "./globals.css";
import MainHeader from "@/components/main-header/main-header";
import MainHeaderBackground from "@/components/main-header/main-header-background";

export const metadata: Metadata = {
    title: 'NextJS Course App',
    description: 'Your first NextJS app!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body>


      <MainHeader/>

      {children}
      </body>
      </html>
  );
}
