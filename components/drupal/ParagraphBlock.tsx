import type { DrupalParagraph } from "next-drupal"
import { HeroBanner } from "@/components/drupal/HeroBanner"
import { FeaturedTextWithImage } from "@/components/drupal/FeaturedTextWithImage"
import { FeaturedCards } from "@/components/drupal/FeaturedCards"
import { RichText } from "@/components/drupal/RichText"
import { RecentArticles } from "@/components/drupal/RecentArticles"
import { Image } from "@/components/drupal/Image"
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
          imageUrl={paragraph.field_image.field_media_image.links.hero.href}
          buttons={paragraph.field_buttons.map(
            (btn: { field_link: { uri: string; title: string }; field_button_type: string }) => ({
              href: btn.field_link.uri,
              label: btn.field_link.title,
              buttonType: btn.field_button_type,
            })
          )}
        />
      )

    case "paragraph--featured_text_with_image":
      return (
        <FeaturedTextWithImage
          title={paragraph.field_title}
          body={paragraph.field_body}
          items={paragraph.field_feature_list}
          imageUrl={paragraph.field_image.field_media_image.links.hero.href}
          imageAlt={paragraph.field_image?.resourceIdObjMeta?.alt ?? ""}
        />
      )

    case "paragraph--featured_cards":
      return (
        <FeaturedCards
          title={paragraph.field_title}
          cards={paragraph.field_cards.map(
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
              imageAlt: card.field_image.field_media_image?.resourceIdObjMeta?.alt ?? "",
              cta: card.field_link
                ? { href: card.field_link.url, label: card.field_link.title }
                : undefined,
            })
          )}
        />
      )

    case "paragraph--rich_text":
      return <RichText body={paragraph.field_body.processed} />

    case "paragraph--recent_articles":
      return <RecentArticles />

    case "paragraph--image":
      return (
        <Image
          src={paragraph.field_image.field_media_image.links.hero.href}
          alt={paragraph.field_image?.resourceIdObjMeta?.alt ?? ""}
          caption={paragraph.field_subtitle}
        />
      )

    default:
      return null
  }
}
