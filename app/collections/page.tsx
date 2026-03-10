import { redirect } from "next/navigation";

// /collections has no standalone page — redirect to the women's collection
export default function CollectionsIndexPage() {
  redirect("/collections/women");
}
