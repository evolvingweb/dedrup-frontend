import type { DrupalNode } from "next-drupal"
import { HeroBanner } from "@/components/drupal/HeroBanner"
import { FeaturedTextWithImage } from "@/components/drupal/FeaturedTextWithImage"
import { FeaturedCards } from "@/components/drupal/FeaturedCards"
import { absoluteUrl } from "@/lib/utils"

interface BasicPageProps {
  node: DrupalNode
}

export function BasicPage({ node, ...props }: BasicPageProps) {
  const hero = node.field_content[0]
  const featured = node.field_content[1]
  const cards = node.field_content[2]
  return (
    <article {...props}>
      <HeroBanner
        title={hero.field_title}
        subtitle={hero.field_subtitle}
        imageUrl={absoluteUrl(hero.field_background_image.uri.url)}
        primaryCta={{
          href: hero.field_buttons[0].field_link.uri,
          label: hero.field_buttons[0].field_link.title,
        }}
        secondaryCta={{
          href: hero.field_buttons[1].field_link.uri,
          label: hero.field_buttons[1].field_link.title,
        }}
      />
      {featured && (
        <FeaturedTextWithImage
          title={featured.field_title}
          body={featured.field_body}
          items={featured.field_feature_list}
          imageUrl={absoluteUrl(featured.field_image.uri.url)}
          imageAlt={featured.field_image?.resourceIdObjMeta?.alt ?? ""}
        />
      )}
      {cards && (
        <FeaturedCards
          title={cards.field_title}
          cards={cards.field_cards.map((card: {
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
      )}
    </article>
  )
}
