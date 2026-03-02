import Link from "next/link"
import { drupal } from "@/lib/drupal"

export async function Header() {
  const { items } = await drupal.getMenu("main")

  return (
    <header className="bg-scheme-2 flex items-center justify-center h-[72px] px-page-x w-full shrink-0">
      <div className="flex items-center gap-8 w-full max-w-container">
        {/* Left: nav links */}
        <nav className="flex flex-1 items-center gap-8">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="text-white text-text-regular leading-[1.6] hover:opacity-80 transition-opacity"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Center: logo */}
        <Link href="/" className="shrink-0">
          <span className="text-white font-semibold text-xl italic tracking-wide">Logo</span>
        </Link>

        {/* Right: CTA button */}
        <div className="flex flex-1 justify-end">
          <button className="bg-electric-violet border-electric-violet-dark border-t-[1.5px] border-r-[1.5px] border-b-4 border-l-[1.5px] border-solid text-white text-text-regular font-medium px-5 py-2 rounded-button">
            Button
          </button>
        </div>
      </div>
    </header>
  )
}
