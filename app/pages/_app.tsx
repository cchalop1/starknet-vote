import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import {
  getInstalledInjectedConnectors,
  StarknetProvider,
} from "@starknet-react/core";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  const connectors = getInstalledInjectedConnectors();

  return (
    <StarknetProvider autoConnect connectors={connectors}>
      <NextHead>
        <title>StarkNet Vote</title>
      </NextHead>
      <Header />
      <Component {...pageProps} />
    </StarknetProvider>
  );
}

export default MyApp;
