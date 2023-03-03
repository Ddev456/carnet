import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AuthGuard = ({ children }: {children: JSX.Element} ) : JSX.Element => {

  const router = useRouter()
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Chargement...</main>;
  }

  if(status === "unauthenticated") () => void router.push('/')


  return (<>{ children }</>)
}

export default AuthGuard
