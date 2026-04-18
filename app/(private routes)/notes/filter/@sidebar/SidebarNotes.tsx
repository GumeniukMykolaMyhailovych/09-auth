"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./SidebarNotes.module.css";

const tags = ["All", "Work", "Personal", "Important"];

export default function SidebarNotes() {
  const pathname = usePathname();

  return (
    <ul className={css.menuList}>
      {tags.map((tag) => {
        const isAll = tag === "All";

        const href = isAll
          ? "/notes/filter/all"
          : `/notes/filter/${tag}`;

        return (
          <li key={tag} className={css.menuItem}>
            <Link
              href={href}
              className={`${css.menuLink} ${
                pathname === href ? css.active : ""
              }`}
            >
              {isAll ? "All notes" : tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}