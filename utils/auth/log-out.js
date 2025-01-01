import axios from "axios";
import { ShowSwal } from "../helper-function";

export default async function LogOutUser() {
  const isOk = await ShowSwal("warning", "ایا از خروج مطمعن هستید؟؟", [
    "خیر",
    "بله",
  ]);
  if (isOk) {
    await axios.post("/api/auth/logout");
    location.reload();
  }
}
