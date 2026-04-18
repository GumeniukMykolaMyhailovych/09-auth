import css from "./SidebarNotes.module.css";
import Link from "next/link";

export default function SidebarNotes() {
  const tags = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];

  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag === "All" ? "all" : tag}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}