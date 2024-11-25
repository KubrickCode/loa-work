import { Box, Flex, Button } from "@chakra-ui/react";
import _ from "lodash";
import { useLocation, useNavigate } from "react-router-dom";

import { navigationData } from "./navigation-data";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box as="nav">
      <Flex gap={1}>
        {_.map(navigationData, ({ label, url }) => (
          <Button
            key={label + url}
            onClick={() => navigate(url)}
            variant={location.pathname === url ? "solid" : "ghost"}
          >
            {label}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};
