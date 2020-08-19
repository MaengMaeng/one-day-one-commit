import * as React from "react";
import Head from "next/head";
import App, { AppProps, AppContext } from "next/app";
import "styles/reset.css";
import { ThemeProvider } from "styled-components";

export interface IDefaultProps {
  isAuthenticated: boolean;
  user: IUser;
}

interface IUser {
  username: string;
  email: string;
  avatarUrl: string;
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ODOC👌</title>
      </Head>
      <ThemeProvider theme={themes.light}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const user: IUser = (appContext.ctx.req as any)?.user;

  appProps.pageProps = {
    isAuthenticated: user ? true : false,
    user,
  };

  return { ...appProps };
};

export default MyApp;
