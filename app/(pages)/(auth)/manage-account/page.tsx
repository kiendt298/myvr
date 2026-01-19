import LoadingOrUnauthenticated from "@/app/(common)/_components/LoadingOrUnauthenticated";
import UserManageAccountForm from "@/app/(common)/_components/Users/UserManageAccount";
import { IUser } from "@/app/(server)/database/models/User";
import { getUserDetailById } from "@/app/(server)/services/userService";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function UserManageAccountPage() {
  const session = await getServerSession(options);
  const data = session?.user as IUser;

  if (!data) return <LoadingOrUnauthenticated status="unauthenticated" />;
  const userDetail = await getUserDetailById(data.id);

  return <UserManageAccountForm userDetail={userDetail} />;
}
