import { Redirect } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from "../store/useAuthStore";

export default function Index() {

  let authorization: boolean;

  const { user } = useAuthStore();

  if (!SecureStore.getItemAsync("auth")) {
    authorization = false;
  } else {
    authorization = true;
  }

  return (
    authorization ? <Redirect href={"/(dashboard)/home"} /> : <Redirect href={"/auth/signIn"} />
  );

}
