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

  try {
    const property = await getProperty(id);
    if (property && property.status === 2) {
      const propertySlug = slugify(property.publication_title);
      redirect(`/propiedad/${id}/${propertySlug}`);
    }
  } catch {
    // property not found or fetch error
  }

  redirect("/propiedades");
}
