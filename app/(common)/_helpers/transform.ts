import clsx from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";


export interface ISearchParams {
  page?: number | string;
  size?: number | string;
  search?: string;
  sortBy?: string;
  sortDirection?: string;
}

export function searchParamsTransform(
  searchParams: ReadonlyURLSearchParams,
  desiredSearchParams: Record<string, string> | ISearchParams,
) {
  const params = new URLSearchParams(
    Object.fromEntries(searchParams.entries()),
  );

  Object.entries(desiredSearchParams).forEach((entry) => {
    const [key, value] = entry;

    if (!value) params.delete(key);
    else params.set(key, value);
  });

  return params;
}

export function toDateString(dateString: Date | string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VI", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function slugifyTransform(str: string) {
  if (!str && !str.length) return "";

  return slugify(str.toLowerCase().trim(), {
    strict: true,
    lower: true,
    trim: true,
    locale: "vi",
  });
}

