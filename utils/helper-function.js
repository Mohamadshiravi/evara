import { toast } from "react-toastify";
import swal from "sweetalert";

export function ShowSwal(icon, title, buttons) {
  return swal({
    icon,
    title,
    buttons,
  });
}
export function newErrorToast(text) {
  return toast.error(text, { theme: "colored", position: "top-left" });
}
export function newToast(text) {
  return toast(text, { theme: "colored", position: "top-left" });
}
