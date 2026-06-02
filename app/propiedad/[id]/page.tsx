import { redirect } from 'next/navigation'
import { getProperty } from '@/lib/tokko'
import { slugify } from '@/lib/utils'

interface Props {
  params: Promise<{ id: string }>
}

export default async function PropertyRedirect({ params }: Props) {
  const { id } = await params
  const propertyId = parseInt(id, 10)

  if (isNaN(propertyId)) {
    redirect('/propiedades')
  }

  try {
    const property = await getProperty(propertyId)

    if (!property?.publication_title) {
      redirect('/propiedades')
    }

    const slug = slugify(property.publication_title)
    redirect(`/propiedad/${propertyId}/${slug}`)
  } catch {
    redirect('/propiedades')
  }
}

export async function generateMetadata({ params }: Props) {
  return { robots: { index: false } }
}
