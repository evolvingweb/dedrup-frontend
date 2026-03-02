import Link from "next/link"
import { drupal } from "@/lib/drupal"

export async function Footer() {
  const [{ items: footerItems }, { items: legalItems }] = await Promise.all([
    drupal.getMenu("footer"),
    drupal.getMenu("legal"),
  ])

  return (
    <footer className="bg-scheme-2 flex items-center justify-center px-page-x py-section-md w-full">
      <div className="flex flex-col gap-[80px] items-start max-w-container w-full">
        {/* Top row: Logo + nav links | Subscribe */}
        <div className="flex items-start justify-between w-full">
          {/* Left column */}
          <div className="flex flex-1 flex-col gap-8 min-w-0">
            <Link href="/" className="shrink-0">
              <span className="text-white font-semibold text-xl italic tracking-wide">
                Logo
              </span>
            </Link>
            <nav className="flex flex-wrap gap-8 items-start max-w-[480px]">
              {footerItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="text-white text-text-small font-semibold leading-[1.6] hover:opacity-80 transition-opacity"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right column: Subscribe */}
          <div className="flex flex-col gap-4 w-[400px] shrink-0">
            <p className="text-white text-text-regular font-semibold leading-[1.6]">
              Subscribe
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-4 h-12 items-stretch">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-transparent border border-white/20 px-3 py-2 rounded-button text-white text-text-regular placeholder:text-white/60 outline-none focus:border-white/40 transition-colors"
                />
                <button className="bg-transparent border-white/20 border-t-[1.5px] border-r-[1.5px] border-b-4 border-l-[1.5px] border-solid text-white text-text-regular font-medium px-6 rounded-button shrink-0 hover:opacity-80 transition-opacity whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-white/60 text-text-tiny leading-[1.6]">
                By subscribing, you agree to our{" "}
                <Link
                  href="/privacy"
                  className="underline text-white hover:opacity-80 transition-opacity"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: divider + legal links + copyright */}
        <div className="flex flex-col gap-8 items-center w-full">
          <div className="h-px w-full bg-white/20" />
          <div className="flex items-start justify-between w-full text-white text-text-small leading-[1.6]">
            <div className="flex gap-6">
              {legalItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="underline hover:opacity-80 transition-opacity"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <p>© 2023 Acme. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
