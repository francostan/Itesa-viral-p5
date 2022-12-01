import React from "react";
import { Button } from "@chakra-ui/react";
import Link from "next/link";


const AdminButton = () => {
  return (
    <div>
      <Link href="/adminMilestone">
        <Button
          ml="25%"
          mt="100%"
          colorScheme=""
          variant="solid"
          w={["50%", "auto"]}
        >
          ADMINISTRADOR
        </Button>
      </Link>
    </div>
  );
};

export default AdminButton;
