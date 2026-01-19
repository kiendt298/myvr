"use client";

import { useEffect } from "react";
import { useIsMobile } from "../../_hooks/use-mobile";

export default function DangerouslyInnerHtmlWrapper({
  htmlContent,
  ...restProps
}: {
  htmlContent?: string;
  [key: string]: string | any;
}) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      const iframeElements = document.getElementsByTagName("iframe");
      if (!iframeElements || !iframeElements.length) return;

      for (const element of Array.from(iframeElements)) {
        element.setAttribute("width", "auto");
      }
    }
  }, [isMobile]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: htmlContent || "",
      }}
      {...restProps}
    ></div>
  );
}
