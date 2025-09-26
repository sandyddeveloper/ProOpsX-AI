// showToast.ts
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type ToastType = "success" | "error" | "info" | "warning"; 

export const showToast = (
  message: string,
  type: ToastType = "info",
  options?: ToastOptions
) => {
  const defaultOptions: ToastOptions = { autoClose: type === "success" ? 2000 : 3000, ...options };

  switch (type) {
    case "success":
      toast.success(message, defaultOptions);
      break;
    case "error":
      toast.error(message, defaultOptions);
      break;
    case "warning":
      toast.warning(message, defaultOptions);
      break;
    case "info":
    default:
      toast.info(message, defaultOptions);
      break;
  }
};
