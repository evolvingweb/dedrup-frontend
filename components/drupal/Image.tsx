import NextImage from "next/image"

interface ImageProps {
  src: string
  alt?: string
  caption?: string
}

export function Image({ src, alt = "", caption }: ImageProps) {
  return (
    <figure className="flex flex-col items-center px-page-x py-10 w-full">
      <div className="relative w-full max-w-container overflow-hidden rounded-large">
        <NextImage
          src={src}
          alt={alt}
          width={1280}
          height={720}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 font-sans text-text-small text-neutral-darkest/60 text-center max-w-content">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
