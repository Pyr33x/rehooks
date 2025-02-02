import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";
import Footer from "@/components/layout/footer";
import { Grid } from "@rehooks/ui/components";
import type { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): React.ReactElement {
  return (
    <HomeLayout {...baseOptions}>
      {children}
      <Grid
        width={46}
        height={46}
        x={-1}
        y={-1}
        strokeDasharray={"2 4"}
        className="-z-50 [mask-image:radial-gradient(350px_circle_at_center,white,#ffffff50)] dark:[mask-image:radial-gradient(350px_circle_at_center,white,#ffffff01)]"
      />
      <Footer />
    </HomeLayout>
  );
}
