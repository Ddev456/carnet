import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { requireAuthentication } from "../utils/requireAuthentication";

export default function Home () {
  const { data: session, status } = useSession()
  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Chargement...</main>
  }
  return (
        <main className="flex flex-col items-center">
            Dashboard
            {session && <p className="mb-4 text-center">Bienvenue {session.user?.name}</p>}
        </main>
  )
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  return requireAuthentication(context, ( session ) => {
    return {
      props: session
    }
  })
}

Home.requireAuth = true
