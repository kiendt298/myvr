"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { searchParamsTransform } from "../_helpers/transform";

export default function MonthSelect({
  children,
  param,
}: {
  children: ReactNode;
  param: string;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const searchParamsHook = useSearchParams();

  return (
    <select
      className="text-base text-black p-4"
      defaultValue={param}
      onChange={(e) => {
        router.push(
          `${pathName}?${searchParamsTransform(searchParamsHook, {
            month: e.target.value,
          }).toString()}`,
          { scroll: false },
        );
      }}
    >
      {children}
    </select>
  );
}
