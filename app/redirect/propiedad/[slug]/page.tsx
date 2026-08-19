import { redirect } from "next/navigation";
import { getProperty } from "@/lib/tokko";
import { slugify } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300;

export default async function PropertyRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  const id = slug.split("-")[0];

  // Solo el fetch va dentro del try/catch: redirect() funciona lanzando una
  // excepción, así que un catch alrededor se la come y nunca llegamos a la ficha.
  let property;
  try {
    property = await getProperty(id);
  } catch (error) {
    console.error("[redirect] no se pudo traer la propiedad", id, error);
  }

  if (property?.publication_title) {
    redirect(`/propiedad/${id}/${slugify(property.publication_title)}`);
  }

  redirect("/propiedades");
}
