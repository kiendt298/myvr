import LoadingOrUnauthenticated from "@/app/(common)/_components/LoadingOrUnauthenticated";
import PostForm from "@/app/(common)/_components/Posts/PostForm";
import { getPostDetailById } from "@/app/(server)/services/postService";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function CreatePostPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(options);

  if (!session) return <LoadingOrUnauthenticated status="unauthenticated" />;

  let postDetail;
  const { id } = searchParams;

  if (id) {
    try {
      postDetail = await getPostDetailById(id as string);
      if (!postDetail) return <></>;
    } catch (error) {
      return <></>;
    }
  }

  return <PostForm postDetail={postDetail} />;
}
