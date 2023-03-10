import { AppProps, type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import "../styles/globals.css";
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import PageLayout from "../components/PageLayout";
import Head from "next/head";
import { NextComponentType } from "next";
import AuthGuard from "../components/AuthGuard";
import { useLocalStorage } from "@mantine/hooks";
import { Provider as RWBProvider } from "react-wrap-balancer";
// type CustomAppProps = AppProps & {
//   Component: NextComponentType & {requireAuth?: boolean} // add auth type
// }

export interface CustomAppProps extends AppProps {
  Component: NextComponentType & {requireAuth?: boolean} // add auth type
  pageProps: { session: Session | null }
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) => {

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) => { setColorScheme(value || (colorScheme === "dark" ? "light" : "dark")) }

  return (
    <SessionProvider session={session}>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <Head >
                <link rel="icon" href="favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
                <title>Carnet Potager</title>
            </Head>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: colorScheme,
              fontFamily: "Montserrat, sans-serif"
            }}
          >
              {Component.requireAuth ? (
                <AuthGuard>
                    <PageLayout>
                        <Component {...pageProps}/>
                    </PageLayout>
              </AuthGuard>
              ) : (
                <RWBProvider>
                    <Component {...pageProps} />
                </RWBProvider>
              ) }
          </MantineProvider>
      </ColorSchemeProvider>

    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
