import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import { ChakraProvider, CssReset } from "@chakra-ui/react";
import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {" "}
      <ChakraProvider resetCSS theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
