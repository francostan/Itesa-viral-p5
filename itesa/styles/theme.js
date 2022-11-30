import { extendTheme } from "@chakra-ui/react";

import "@fontsource/quicksand";
import "@fontsource/poppins";

export const theme = extendTheme({
  fonts: {
    heading: "quicksand",
    body: "poppins",
  },

  components: {
    Button: {
      variants: {
        solid: {
          border: "3px solid white",
          background: "#9d39fe",
          borderRadius: "15px",
          color: "white",
          fontWeight: "bold",
          boxShadow: " 0px 5px 10px 2px #9d39fe",
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
