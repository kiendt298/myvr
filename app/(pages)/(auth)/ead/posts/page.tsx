import LoadingOrUnauthenticated from '@/app/(common)/_components/LoadingOrUnauthenticated';
import PostTable from '@/app/(common)/_components/Posts/PostTable';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

const PostPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const session = await getServerSession(options);

  if (!session)
    return <LoadingOrUnauthenticated status='unauthenticated' />;

  return (
    <Suspense fallback={<LoadingOrUnauthenticated status='loading' />}>
      <PostTable
        searchParams={searchParams}
      />
    </Suspense>
  );
};

export default PostPage;

