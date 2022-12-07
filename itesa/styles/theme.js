import { extendTheme } from "@chakra-ui/react";

import "@fontsource/quicksand";
import "@fontsource/poppins";

export const theme = extendTheme({
  fonts: {
    heading: "quicksand",
    body: "poppins",
  },

  components: {
    Input: {
      variants: {
        visible: {
          background: "white",
        },
      },
    },
    Button: {
      variants: {
        solid: {
          border: "2px solid white",
          background: "#9d39fe",
          borderRadius: "15px",
          color: "white",
          fontWeight: "bold",
        },
        outline: {
          border: "3px solid",
          borderColor: "#9d39fe",
          background: "black",
          borderRadius: "15px",
          color: "white",
          fontWeight: "bold",
          boxShadow: "2px 2px 7px #9d39fe",
        },
        login: {
          position: "absolute",
          marginLeft: "95%",
          border: "2px solid white",
          background: "#9d39fe",
          borderRadius: "15px",
          color: "white",
          fontWeight: "bold",
        },
        registro: {
          position: "absolute",
          marginLeft: "2%",
          border: "2px solid white",
          background: "#9d39fe",
          borderRadius: "15px",
          color: "white",
          fontWeight: "bold",
        },
      },
    },

    Toast: {
      variants: {
        subtle: {
          background: "#9d39fe",
        },
      },
    },
  },
});
