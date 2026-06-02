import { redirect } from 'next/navigation'
import { getProperty } from '@/lib/tokko'
import { slugify } from '@/lib/utils'

interface Props {
  params: Promise<{ id: string }>
}

export default async function FichaInfoRedirect({ params }: Props) {
  const { id } = await params

  // ficha.info manda el formato "3619333-prop" — extraemos solo el número
  const numericId = parseInt(id.replace(/-prop$/, '').replace(/\D/g, ''), 10)

  if (isNaN(numericId)) {
    redirect('/propiedades')
  }

  try {
    const property = await getProperty(numericId)

    if (!property?.publication_title) {
      redirect('/propiedades')
    }

    const slug = slugify(property.publication_title)
    redirect(`/propiedad/${numericId}/${slug}`)
  } catch {
    redirect('/propiedades')
  }
}

export async function generateMetadata() {
  return { robots: { index: false } }
}
