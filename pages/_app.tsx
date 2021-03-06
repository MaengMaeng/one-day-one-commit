import * as React from "react";
import Head from "next/head";
import App, { AppProps, AppContext } from "next/app";
import "styles/reset.css";
import { ThemeProvider } from "styled-components";

interface IUserContext {
  isAuthenticated: boolean;
  user?: IUser;
}

interface IUser {
  username: string;
  email: string;
  avatarUrl: string;
  rank: number;
}

const themes = {
  light: {
    colors: {
      bg: "#3498db",
      btn: "#2ecc71",
      btn_hover: "#27ae60",
    },
  },
  dark: {
    colors: {
      bg: "#34495e",
    },
  },
};

export const UserContext = React.createContext<IUserContext>({
  isAuthenticated: false,
  user: undefined,
});

function MyApp({ Component, pageProps }: AppProps) {
  const currentUser: IUserContext = {
    isAuthenticated: pageProps.isAuthenticated ?? false,
    user: pageProps.user ?? undefined,
  };

  return (
    <>
      <Head>
        <title>ODOC👌</title>
      </Head>
      <ThemeProvider theme={themes.light}>
        <UserContext.Provider value={currentUser}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const user: IUser = (appContext.ctx.req as any)?.user;

  const componentProps = await appContext.Component.getInitialProps?.(
    appContext.ctx,
  );
  appProps.pageProps = {
    isAuthenticated: user ? true : false,
    user,
    ...componentProps,
  };

  return { ...appProps };
};

export default MyApp;
