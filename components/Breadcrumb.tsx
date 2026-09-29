/**
 * 可见面包屑导航（与各页 JSON-LD BreadcrumbList 对应）。
 * 纯服务端组件，无交互。
 *
 * prefetch={false}：面包屑在**每个页面的初始视口内**，默认预取会让每条上层链接
 * 每 PV 各发一次 `?_rsc=`（`max-age=0, must-revalidate`，缓存省不掉）。它属于
 * "页面 chrome"，不是正文里的转化入口，故与 header 同一策略关掉视口预取。
 * hover / touchstart 的预取不受影响（见 link.js：onMouseEnter 无条件 prefetch），
 * 鼠标点击的即时性不变。规则：chrome 关，正文 CTA（如首页 hero）留。
 */
import Link from "next/link";

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
              <Link href={item.href} prefetch={false} className="hover:text-primary transition">
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
