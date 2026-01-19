import VideosManagement from "@/app/(common)/_components/Videos/VideosManagement";
import { IUser } from "@/app/(server)/database/models/User";
import { getAllVRtubeVideosById } from "@/app/(server)/services/userService";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(options);
  if (!session || !session.user) redirect("/");

  const videos = await getAllVRtubeVideosById((session.user as IUser).id);
  return <VideosManagement videos={videos} />;
}
