import { Redirect } from "expo-router";

export default function Index() {

  const authorization = false;

  return (
    authorization ? <Redirect href={"/(dashboard)/home"} /> : <Redirect href={"/auth/signIn"} />
  );

}
