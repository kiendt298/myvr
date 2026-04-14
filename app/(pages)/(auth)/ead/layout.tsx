import { CreatorRoleType, IUser } from "@/app/(server)/database/models/User";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
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
  ) {
    redirect("/dang-nhap");
  }

  return <>{children}</>;
}
