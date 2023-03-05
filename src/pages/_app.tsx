import { AppProps, type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import "../styles/globals.css";
import Head from "next/head";
import { NextComponentType } from "next";
import AuthGuard from "../components/AuthGuard";
import { Provider as RWBProvider } from "react-wrap-balancer";
import DashboardLayout from "../components/Layout/DashboardLayout";

export interface CustomAppProps extends AppProps {
  Component: NextComponentType & {requireAuth?: boolean} // add auth type
  pageProps: { session: Session | null }
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) => {


  return (
    <SessionProvider session={session}>

            <Head >
                <link rel="icon" href="favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
                <title>Carnet Potager</title>
            </Head>
       
              {Component.requireAuth ? (
                // <AuthGuard>
                    <DashboardLayout>
                        <Component {...pageProps}/>
                    </DashboardLayout>
              // </AuthGuard>
              ) : (
                <RWBProvider>
                    <Component {...pageProps} />
                </RWBProvider>
              ) }
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
