"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ShadcnComponents/button";
import { Loader2 } from "lucide-react";

export default function SubmitButtonWrapper({
  children,
  ...props
}: {
  children: ReactNode | string;
  [key: string]: string | any;
}) {
  const { pending } = useFormStatus();
  const { disabled, ...restOfProps } = props;

  return (
    <Button
      type="submit"
      disabled={props?.disabled || pending}
      {...restOfProps}
    >
      {pending && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  );
}
