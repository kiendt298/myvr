"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastProps } from "../../_utils/constant";

export default function ToastContainerWrapper(props: Record<string, any>) {
  const toastProps = {
    ...ToastProps,
    ...props,
  };
  return <ToastContainer {...toastProps} />;
}
