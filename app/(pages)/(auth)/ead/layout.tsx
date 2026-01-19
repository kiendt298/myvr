import LoadingOrUnauthenticated from "@/app/(common)/_components/LoadingOrUnauthenticated";
import { CreatorRoleType, IUser } from "@/app/(server)/database/models/User";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

export default async function EADLayout({
  children,
}: {
  children: ReactNode[];
}) {
  const session = await getServerSession(options);
  if (
    !session ||
    !session.user ||
    (session.user as IUser).role !== CreatorRoleType.ADMIN
  )
    return <LoadingOrUnauthenticated status="unauthenticated" />;

  return <>{children}</>;
}
