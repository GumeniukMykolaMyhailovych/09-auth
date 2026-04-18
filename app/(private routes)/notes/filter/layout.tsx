import { ReactNode } from "react";

export default function Layout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}