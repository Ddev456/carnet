import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AuthGuard = ({ children }: {children: JSX.Element} ) => {

  const router = useRouter()
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Chargement...</main>;
  }

  if(status === "unauthenticated") {
    router.push({pathname: '/login'})
  }

  return (<>{ children }</>)
}

export default AuthGuard
