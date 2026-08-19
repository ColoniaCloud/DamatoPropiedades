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

  // Solo el fetch va dentro del try/catch: redirect() funciona lanzando una
  // excepción, así que un catch alrededor se la come y nunca llegamos a la ficha.
  let property
  try {
    property = await getProperty(propertyId)
  } catch {
    redirect('/propiedades')
  }

  if (!property?.publication_title) {
    redirect('/propiedades')
  }

  redirect(`/propiedad/${propertyId}/${slugify(property.publication_title)}`)
}

export async function generateMetadata() {
  return { robots: { index: false } }
}
