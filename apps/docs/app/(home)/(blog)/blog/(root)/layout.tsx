import { HomeLayout } from "fumadocs-ui/layouts/home";
import Footer from "@/app/(home)/_components/footer";
import { baseOptions } from "@/app/layout.config";
import type { ReactNode } from "react";

export default function BlogLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): React.ReactElement {
  return (
    <HomeLayout {...baseOptions}>
      {children}
      <Footer className="absolute bottom-0 left-0 right-0" />
    </HomeLayout>
  );
}
