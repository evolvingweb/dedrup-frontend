import Image from "next/image"
import Link from "next/link"

interface Card {
  title: string
  body: string
  imageUrl: string
  imageAlt?: string
  cta?: { label: string; href: string }
}

interface FeaturedCardsProps {
  title: string
  cards: Card[]
}

function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="size-6 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export function FeaturedCards({ title, cards }: FeaturedCardsProps) {
  return (
    <section className="bg-scheme-1 flex flex-col items-center px-page-x py-section-lg w-full">
      <div className="flex flex-col gap-[80px] items-center w-full max-w-container">
        {/* Section heading */}
        <h2
          className="font-fraunces font-semibold text-heading-3 tracking-[0.48px] text-neutral-darkest text-center max-w-content"
          style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
        >
          {title}
        </h2>

        {/* Cards row */}
        <div className="flex gap-12 items-start justify-center w-full">
          {cards.map((card, i) => (
            <div key={i} className="flex flex-col gap-8 flex-1 min-w-0 overflow-hidden">
              {/* Image */}
              <div className="relative aspect-[394/240] w-full rounded-medium overflow-hidden shrink-0">
                <Image
                  src={card.imageUrl}
                  alt={card.imageAlt ?? ""}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-8 items-center w-full">
                <div className="flex flex-col gap-4 text-neutral-darkest text-center w-full">
                  <h3
                    className="font-fraunces font-semibold text-heading-5 tracking-[0.32px]"
                    style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
                  >
                    {card.title}
                  </h3>
                  <p className="font-sans font-normal text-text-regular leading-[1.6]">
                    {card.body}
                  </p>
                </div>

                {card.cta && (
                  <Link
                    href={card.cta.href}
                    className="flex gap-2 items-center justify-center font-sans font-medium text-text-regular text-neutral-darkest hover:opacity-70 transition-opacity"
                  >
                    {card.cta.label}
                    <ChevronRight />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
