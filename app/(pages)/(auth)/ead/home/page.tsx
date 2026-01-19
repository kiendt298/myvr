import AdminPage from "@/app/(common)/_components/EadHome";

export default async function EadHomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <AdminPage searchParams={searchParams} />;
}
