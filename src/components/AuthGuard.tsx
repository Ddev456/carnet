import { useSession } from "next-auth/react";

const AuthGuard = ({ children }: {children: JSX.Element} ) => {

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Chargement...</main>;
  }

  if(status === "unauthenticated") {
    return <p>Accès refusé</p>
  }

  return (<>{ children }</>)
}

export default AuthGuard
