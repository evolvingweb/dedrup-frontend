interface RichTextProps {
  body: string
}

export function RichText({ body }: RichTextProps) {
  return (
    <section className="flex flex-col items-center px-page-x py-10 w-full">
      <div
        dangerouslySetInnerHTML={{ __html: body }}
        className="prose max-w-container w-full"
      />
    </section>
  )
}
