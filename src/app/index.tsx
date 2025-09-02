import { Redirect } from "expo-router";
import { useAuthStore } from "../store/useAuthStore";

export default function Index() {

  let authorization: boolean;

  const { user } = useAuthStore();

  if (user?.token) {
    authorization = true;
  } else {
    authorization = false;
  }

  return (
    authorization ? <Redirect href={"/(dashboard)/home"} /> : <Redirect href={"/auth/signIn"} />
  );

}
