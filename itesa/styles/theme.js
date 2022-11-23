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
          border: "3px solid white", // change the appearance of the border
          background: "#9d39fe",
          borderRadius: "15px",

          fontWeight: "bold", // change the font weight}
        },
      },
    },
  },
});
