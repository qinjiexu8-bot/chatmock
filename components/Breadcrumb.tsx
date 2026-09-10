import Link from "next/link";

/**
 * 可见面包屑导航（与各页 JSON-LD BreadcrumbList 对应）。
 * 纯服务端组件，无交互。
 */
export default function Breadcrumb({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-[12.5px] text-black/60">
      <ol className="flex items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-1.5">
            {i > 0 ? (
              <span aria-hidden="true" className="text-black/25">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-black/60">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
