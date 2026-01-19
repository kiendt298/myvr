import ContactsTable from "@/app/(common)/_components/Contacts/ContactsTable";
import LoadingOrUnauthenticated from "@/app/(common)/_components/LoadingOrUnauthenticated";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { faHomeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Suspense } from "react";

const ContactsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(options);

  if (!session) return <LoadingOrUnauthenticated status="unauthenticated" />;

  return (
    <Suspense fallback={<LoadingOrUnauthenticated status="loading" />}>
      <h1 className="text-4xl font-extrabold text-[#96694f] uppercase font-sans text-shadow-light text-center mt-8 mb-4">
        WELCOME ADMIN!
      </h1>
      <div className="flex items-center mb-4" id="modals">
        <Link
          href="/ead/home"
          className="text-gray-600 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 transition-colors mr-4 py-2 px-3"
        >
          <FontAwesomeIcon icon={faHomeAlt} className="w-4 h-4" />
        </Link>
        <h2 className="text-3xl font-extrabold text-gray-600 uppercase font-sans">
          DANH SÁCH YÊU CẦU LIÊN HỆ
        </h2>
      </div>
      <ContactsTable searchParams={searchParams}></ContactsTable>
    </Suspense>
  );
};

export default ContactsPage;
