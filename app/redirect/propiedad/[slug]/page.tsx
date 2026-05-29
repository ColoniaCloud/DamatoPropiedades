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
    console.log("[redirect] property id:", id, "status:", property?.status, "has publication_title:", !!property?.publication_title);
    if (property?.publication_title) {
      const propertySlug = slugify(property.publication_title);
      redirect(`/propiedad/${id}/${propertySlug}`);
    }
  } catch (error) {
    console.error("[redirect] error fetching property:", id, error);
  }

  redirect("/propiedades");
}
