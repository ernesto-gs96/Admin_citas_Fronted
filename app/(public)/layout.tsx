import { ReactNode } from "react";
import { SiteNavbar } from "@/components/site-navbar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNavbar />
      {children}
    </>
  );
}
