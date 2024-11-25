import { Box, Flex } from "@chakra-ui/react";
import _ from "lodash";
import { Link } from "react-router-dom";

import { navigationData } from "./navigation-data";

export const Navigation = () => {
  return (
    <Box as="nav">
      <Flex>
        {_.map(navigationData, ({ label, url }) => (
          <Link key={label + url} to={url}>
            {label}
          </Link>
        ))}
      </Flex>
    </Box>
  );
};
