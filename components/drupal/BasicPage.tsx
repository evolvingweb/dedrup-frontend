import type { DrupalNode, DrupalParagraph } from "next-drupal"
import { ParagraphBlock } from "@/components/drupal/ParagraphBlock"

interface BasicPageProps {
  node: DrupalNode
}

export function BasicPage({ node, ...props }: BasicPageProps) {
  return (
    <article {...props}>
      {node.field_content?.map((paragraph: DrupalParagraph) => (
        <ParagraphBlock key={paragraph.id} paragraph={paragraph} />
      ))}
    </article>
  )
}
