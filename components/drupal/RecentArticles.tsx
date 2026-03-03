import Image from "next/image"
import { Link } from "@/components/navigation/Link"
import { drupal } from "@/lib/drupal"
import { formatDate } from "@/lib/utils"
import type { DrupalNode } from "next-drupal"

export async function RecentArticles() {
  const articles = await drupal.getResourceCollection<DrupalNode[]>(
    "node--article",
    {
      params: {
        "filter[status]": 1,
        "fields[node--article]":
          "title,path,created,uid,field_image",
        include: "field_image.field_media_image,uid",
        sort: "-created",
        "page[limit]": 3,
      },
      cache: "force-cache",
    }
  )

  if (!articles?.length) return null

  return (
    <section className="bg-scheme-1 flex flex-col items-center px-page-x py-section-lg w-full">
      <div className="flex flex-col gap-[80px] items-center w-full max-w-container">
        <h2
          className="font-fraunces font-semibold text-heading-3 tracking-[0.48px] text-neutral-darkest text-center max-w-content w-full"
          style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
        >
          Recent Articles
        </h2>

        <div className="flex flex-col gap-8 w-full">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex gap-8 items-center"
            >
              {article.field_image && (
                <Link href={article.path.alias} className="shrink-0">
                  <div className="relative w-[320px] aspect-[320/200] rounded-medium overflow-hidden">
                    <Image
                      src={article.field_image.field_media_image.links.hero.href}
                      alt={article.field_image.resourceIdObjMeta?.alt ?? ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              )}

              <div className="flex flex-col gap-4 flex-1 min-w-0">
                <div className="flex items-center gap-2 font-sans text-text-small text-neutral-darkest/60">
                  {article.uid?.display_name && (
                    <>
                      <span className="font-semibold text-neutral-darkest">
                        {article.uid.display_name}
                      </span>
                      <span aria-hidden="true">·</span>
                    </>
                  )}
                  <time dateTime={article.created}>
                    {formatDate(article.created)}
                  </time>
                </div>

                <Link href={article.path.alias} className="group">
                  <h3
                    className="font-fraunces font-semibold text-heading-5 tracking-[0.32px] text-neutral-darkest group-hover:opacity-70 transition-opacity"
                    style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
                  >
                    {article.title}
                  </h3>
                </Link>

                <Link
                  href={article.path.alias}
                  className="inline-flex items-center gap-2 font-sans font-medium text-text-regular text-neutral-darkest hover:opacity-70 transition-opacity"
                >
                  Read article
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
