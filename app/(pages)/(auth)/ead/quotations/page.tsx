import LoadingOrUnauthenticated from '@/app/(common)/_components/LoadingOrUnauthenticated';
import QuotationsTable from '@/app/(common)/_components/Quotations/QuotationsTable';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

const QuotationsPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const session = await getServerSession(options);

  if (!session)
    return <LoadingOrUnauthenticated status='unauthenticated' />;

  return (
    <Suspense fallback={<LoadingOrUnauthenticated status='loading' />}>
      <QuotationsTable
        searchParams={searchParams}
      />
    </Suspense>
  );
};

export default QuotationsPage;
