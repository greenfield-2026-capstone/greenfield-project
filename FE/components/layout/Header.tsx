import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        Histour
      </Link>
    </header>
  );
}
