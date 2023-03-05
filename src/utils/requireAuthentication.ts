import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getServerSession } from "next-auth"
import { getServerAuthSession } from "../server/auth"
import { type Session } from "next-auth";

export const requireAuthentication = async (context: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
  }, cb: (session: Session) => { props: Session}) => {
    const session = await  getServerAuthSession(context)

    if(!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    if (context.req.url === '/admin' && session?.user.role !== 'ADMIN') {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return cb( session )
}