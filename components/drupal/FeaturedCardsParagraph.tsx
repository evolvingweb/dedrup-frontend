import type { DrupalParagraph } from "next-drupal"
import { FeaturedCards } from "@/components/drupal/FeaturedCards"

interface FeaturedCardsParagraphProps {
  paragraph: DrupalParagraph
}

export function FeaturedCardsParagraph({ paragraph }: FeaturedCardsParagraphProps) {
  const cards = paragraph.field_cards.map(
    (card: {
      field_title: string
      field_body: string
      field_image: {
        field_media_image: {
          uri: { url: string }
          resourceIdObjMeta?: { alt?: string }
          links: { [key: string]: { href: string } }
        }
      }
      field_link?: { url: string; title: string }
    }) => ({
      title: card.field_title,
      body: card.field_body,
      imageUrl: card.field_image.field_media_image.links.hero.href,
      imageAlt:
        card.field_image.field_media_image?.resourceIdObjMeta?.alt ?? "",
      cta: card.field_link
        ? { href: card.field_link.url, label: card.field_link.title }
        : undefined,
    })
  )
  return (
    <FeaturedCards
      title={paragraph.field_title}
      cards={cards}
    />
  )
}
