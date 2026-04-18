export default function NotesLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "250px" }}>
        {sidebar}
      </aside>

      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}