"use client";

import Link from "next/link";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <ul className={css.list}>
            <div style={{ display: "flex", alignItems: "center" }}>
    <li>
      <Link href="/" className={css.link}>Home</Link>
    </li>

    <li>
      <Link href="/notes/filter/all" className={css.link}>Notes</Link>
    </li>
  </div>

  <div style={{ display: "flex", alignItems: "center" }}>
    <AuthNavigation />
  </div>
</ul>
      </nav>
    </header>
  );
}