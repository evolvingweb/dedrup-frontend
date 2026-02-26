import Image from "next/image"

interface FeaturedTextWithImageProps {
  title: string
  body: string
  items?: string[]
  imageUrl: string
  imageAlt?: string
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="shrink-0 size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function FeaturedTextWithImage({
  title,
  body,
  items,
  imageUrl,
  imageAlt = "",
}: FeaturedTextWithImageProps) {
  return (
    <section className="bg-scheme-2 flex flex-col items-center px-page-x py-section-lg w-full">
      <div className="flex gap-[80px] items-center w-full max-w-container">
        {/* Left: text content */}
        <div className="flex flex-col gap-8 flex-1 min-w-0">
          <div className="flex flex-col gap-6 text-white">
            <h2
              className="font-fraunces font-semibold text-heading-3 tracking-[0.48px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              {title}
            </h2>
            <p className="font-sans font-normal text-text-medium leading-[1.6]">
              {body}
            </p>
          </div>
          {items && items.length > 0 && (
            <ul className="flex flex-col gap-4 py-2">
              {items.map((item, i) => (
                <li key={i} className="flex gap-4 items-center text-white">
                  <CheckIcon />
                  <span className="font-sans font-normal text-text-regular leading-[1.6]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: image */}
        <div className="relative flex-1 min-w-0 aspect-[600/640] rounded-large overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
