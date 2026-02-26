import Image from "next/image"
import { absoluteUrl, formatDate } from "@/lib/utils"
import type { DrupalNode } from "next-drupal"

interface ArticleProps {
  node: DrupalNode
}

export function Article({ node, ...props }: ArticleProps) {
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
      <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>
            Posted by{" "}
            <span className="font-semibold">{node.uid?.display_name}</span>
          </span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div>
      {node.field_image && (
        <figure>
          <Image
            src={node.field_image.field_media_image.links.hero.href}
            width={1024}
            height={680}
            alt={node.field_image.resourceIdObjMeta.alt || ""}
            priority
          />
          {node.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: node.components[0].field_body }}
        className="mt-6 font-serif text-xl leading-loose prose"
      />
    </article>
  )
}
