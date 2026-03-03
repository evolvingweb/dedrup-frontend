import Image from "next/image"
import Link from "next/link"

type CtaButton = {
  label: string
  href: string
  buttonType?: string
}

interface HeroBannerProps {
  title: string
  subtitle?: string
  imageUrl?: string
  imageAlt?: string
  buttons?: CtaButton[]
}

const buttonStyles: Record<string, string> = {
  primary:
    "bg-electric-violet border-electric-violet-dark border-t-[1.5px] border-r-[1.5px] border-b-4 border-l-[1.5px] border-solid text-white",
  secondary:
    "border-white/20 border-t-[1.5px] border-r-[1.5px] border-b-4 border-l-[1.5px] border-solid text-white",
}

const defaultButtonStyle = buttonStyles.secondary

export function HeroBanner({
  title,
  subtitle,
  imageUrl,
  imageAlt = "",
  buttons = [],
}: HeroBannerProps) {
  return (
    <section className="relative flex items-center justify-center h-[900px] px-page-x overflow-hidden bg-scheme-2">
      {/* Background image + overlay */}
      {imageUrl && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Content */}
      <div className="relative flex flex-col items-center w-full max-w-container">
        <div className="flex flex-col gap-8 items-center w-full max-w-content">
          <div className="flex flex-col gap-6 items-center text-white text-center w-full">
            <h1
              className="font-fraunces font-semibold text-heading-1 tracking-[0.84px] w-full"
            >
              {title}
            </h1>
            {subtitle && (
              <p className="font-sans font-normal text-text-medium w-full">
                {subtitle}
              </p>
            )}
          </div>
          {buttons.length > 0 && (
            <div className="flex gap-4 items-start">
              {buttons.map((button, index) => (
                <Link
                  key={index}
                  href={button.href}
                  className={`${buttonStyles[button.buttonType ?? ""] ?? defaultButtonStyle} font-medium text-text-regular px-6 py-[10px] rounded-button`}
                >
                  {button.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
