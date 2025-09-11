import { Redirect } from "expo-router";
import { useAuthStore } from "../store/useAuthStore";


export default function Index() {
  let authorization: boolean;
  const { user } = useAuthStore();

  user ? authorization = true : authorization = false;

  return (
    authorization ? <Redirect href={"/(dashboard)/home"} /> : <Redirect href={"/auth/signIn"} />
  );

}
