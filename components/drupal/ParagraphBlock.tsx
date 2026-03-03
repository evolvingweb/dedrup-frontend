import type { DrupalParagraph } from "next-drupal"
import { HeroBanner } from "@/components/drupal/HeroBanner"
import { FeaturedTextWithImage } from "@/components/drupal/FeaturedTextWithImage"
import { FeaturedCardsParagraph } from "@/components/drupal/FeaturedCardsParagraph"
import { RichText } from "@/components/drupal/RichText"
import { RecentArticles } from "@/components/drupal/RecentArticles"
import { Image } from "@/components/drupal/Image"

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
          body={paragraph.field_subtitle}
          items={paragraph.field_feature_list}
          imageUrl={paragraph.field_image.field_media_image.links.hero.href}
          imageAlt={paragraph.field_image?.resourceIdObjMeta?.alt ?? ""}
        />
      )

    case "paragraph--featured_cards":
      return <FeaturedCardsParagraph paragraph={paragraph} />

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
