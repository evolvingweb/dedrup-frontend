import Image from "next/image"
import { formatDate } from "@/lib/utils"
import type { DrupalNode, DrupalParagraph } from "next-drupal"
import { ParagraphBlock } from "@/components/drupal/ParagraphBlock"

interface ArticleProps {
  node: DrupalNode
}

export function Article({ node }: ArticleProps) {
  return (
    <article className="flex flex-col items-center w-full">
      {/* Hero image */}
      {node.field_image && (
        <div className="relative w-full aspect-[1440/560] overflow-hidden">
          <Image
            src={node.field_image.field_media_image.links.hero.href}
            alt={node.field_image.resourceIdObjMeta.alt || ""}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col items-center px-page-x pt-section-md pb-8 w-full">
        <div className="flex flex-col gap-8 w-full">
          {/* Meta */}
          <div className="flex items-center gap-2 font-sans text-text-small text-neutral-darkest/60">
            {node.uid?.display_name && (
              <>
                <span className="font-semibold text-neutral-darkest">
                  {node.uid.display_name}
                </span>
                <span aria-hidden="true">·</span>
              </>
            )}
            <time dateTime={node.created}>{formatDate(node.created)}</time>
          </div>

          {/* Title */}
          <h1 className="font-fraunces font-semibold text-heading-2 tracking-[0.6px] text-neutral-darkest">
            {node.title}
          </h1>
        </div>
      </div>
      {/* Body */}
      {node.field_content?.map((paragraph: DrupalParagraph) => (
        <ParagraphBlock key={paragraph.id} paragraph={paragraph} />
      ))}
    </article>
  )
}
