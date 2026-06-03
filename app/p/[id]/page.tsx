import { redirect } from 'next/navigation'
import { getProperty } from '@/lib/tokko'
import { slugify } from '@/lib/utils'

interface Props {
  params: Promise<{ id: string }>
}

export default async function FichaInfoRedirect({ params }: Props) {
  const { id } = await params

  const numericId = parseInt(id.replace(/-prop$/, '').replace(/\D/g, ''), 10)

  if (isNaN(numericId)) {
    redirect('/propiedades')
  }

  // Solo el fetch va dentro del try/catch — nunca los redirect()
  let property
  try {
    property = await getProperty(numericId)
  } catch {
    redirect('/propiedades')
  }

  if (!property?.publication_title) {
    redirect('/propiedades')
  }

  const slug = slugify(property.publication_title)
  redirect(`/propiedad/${numericId}/${slug}`)
}

export async function generateMetadata() {
  return { robots: { index: false } }
}
