import { cookies } from "next/headers";

const webTokenGetter = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;
  return token ?? null;
};

export default webTokenGetter;
