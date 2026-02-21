/**
 * JSON-LD structured data component for SEO.
 * Uses dangerouslySetInnerHTML which is safe here because the data
 * is generated server-side from our own schema functions (not user input).
 * This is the standard Next.js pattern for injecting JSON-LD.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const schemas = Array.isArray(data) ? data : [data]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

export default JsonLd
