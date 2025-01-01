import axios from "axios";

export default async function IsUserLogedIn() {
  try {
    const res = await axios.get("/api/auth/me");
    return res.data.data;
  } catch (error) {
    return false;
  }
}
