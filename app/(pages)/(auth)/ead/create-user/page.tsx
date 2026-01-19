import LoadingOrUnauthenticated from "@/app/(common)/_components/LoadingOrUnauthenticated";
import UserForm from "@/app/(common)/_components/Users/UserForm";
import { getUserDetailById } from "@/app/(server)/services/userService";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function UserFormPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(options);

  let userDetail;
  const { id } = searchParams;
  try {
    if (id) userDetail = await getUserDetailById(id as string);
  } catch (error) {
    console.log(error);
    return <></>;
  }

  if (!session)
    return <LoadingOrUnauthenticated status="unauthenticated" />

  return <UserForm userDetail={userDetail} />;
}
