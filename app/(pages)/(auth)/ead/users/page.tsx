import LoadingOrUnauthenticated from "@/app/(common)/_components/LoadingOrUnauthenticated";
import UsersTable from "@/app/(common)/_components/Users/UsersTable";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function UsersPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const session = await getServerSession(options);

  if (!session)
    return <LoadingOrUnauthenticated status="unauthenticated" />

  return (
    <Suspense fallback={<LoadingOrUnauthenticated status="loading" />}>
      < UsersTable searchParams={searchParams} />
    </Suspense>
  );
}
