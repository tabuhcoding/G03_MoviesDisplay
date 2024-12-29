import {InitUser} from "@components/layout/initUser";
import { verifyToken } from "@/src/util/auth";

export default async function Template({ children }: { children: React.ReactNode }) {
  const {token} = await verifyToken();
  return (
    <>
      {children}
      <InitUser token={token}/>
    </>
  )
}