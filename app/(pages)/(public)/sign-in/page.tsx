import SignIn from "@/app/(common)/_components/SignIn";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession(options);
  if (session && session.user) redirect("/");

  return <SignIn />;
}
