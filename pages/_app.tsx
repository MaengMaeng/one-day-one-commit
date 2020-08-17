import * as React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "styles/reset.css";
import { ThemeProvider } from "styled-components";

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

export default MyApp;
