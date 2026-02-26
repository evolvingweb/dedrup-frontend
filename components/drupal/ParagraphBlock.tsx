import type { DrupalParagraph } from "next-drupal"
import { HeroBanner } from "@/components/drupal/HeroBanner"
import { FeaturedTextWithImage } from "@/components/drupal/FeaturedTextWithImage"
import { FeaturedCards } from "@/components/drupal/FeaturedCards"
import { absoluteUrl } from "@/lib/utils"

interface ParagraphBlockProps {
  paragraph: DrupalParagraph
}

export function ParagraphBlock({ paragraph }: ParagraphBlockProps) {
  switch (paragraph.type) {
    case "paragraph--hero_banner":
      return (
        <HeroBanner
          title={paragraph.field_title}
          subtitle={paragraph.field_subtitle}
          imageUrl={absoluteUrl(paragraph.field_background_image.uri.url)}
          primaryCta={{
            href: paragraph.field_buttons[0].field_link.uri,
            label: paragraph.field_buttons[0].field_link.title,
          }}
          secondaryCta={{
            href: paragraph.field_buttons[1].field_link.uri,
            label: paragraph.field_buttons[1].field_link.title,
          }}
        />
      )

    case "paragraph--featured_text_with_image":
      return (
        <FeaturedTextWithImage
          title={paragraph.field_title}
          body={paragraph.field_body}
          items={paragraph.field_feature_list}
          imageUrl={absoluteUrl(paragraph.field_image.uri.url)}
          imageAlt={paragraph.field_image?.resourceIdObjMeta?.alt ?? ""}
        />
      )

    case "paragraph--featured_cards":
      return (
        <FeaturedCards
          title={paragraph.field_title}
          cards={paragraph.field_cards.map((card: {
            field_title: string
            field_body: string
            field_image: { uri: { url: string }; resourceIdObjMeta?: { alt?: string } }
            field_link?: { uri: string; title: string }
          }) => ({
            title: card.field_title,
            body: card.field_body,
            imageUrl: absoluteUrl(card.field_image.uri.url),
            imageAlt: card.field_image?.resourceIdObjMeta?.alt ?? "",
            cta: card.field_link
              ? { href: card.field_link.uri, label: card.field_link.title }
              : undefined,
          }))}
        />
      )

    default:
      return null
  }
}
