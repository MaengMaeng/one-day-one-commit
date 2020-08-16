import * as React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "styles/reset.css";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    bg: "#0070f3",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ODOC👌</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
