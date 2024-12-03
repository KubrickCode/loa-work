import { Box, Flex, Button } from "@chakra-ui/react";
import _ from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { navigationData } from "./navigation-data";
import { IoIosMenu } from "react-icons/io";
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerBackdrop,
} from "~/chakra-components/ui/drawer";
import { useState } from "react";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigate = (url: string) => {
    navigate(url);
    setOpen(false);
  };

  return (
    <Box as="nav">
      {/* 데스크톱 네비게이션 */}
      <Flex gap={1} display={{ base: "none", md: "flex" }}>
        {navigationData.map(({ label, url }) => (
          <Button
            key={label + url}
            onClick={() => navigate(url)}
            variant={location.pathname === url ? "solid" : "ghost"}
          >
            {label}
          </Button>
        ))}
      </Flex>
      {/* 모바일 네비게이션 */}
      <Box display={{ base: "block", md: "none" }}>
        <DrawerRoot
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          placement="start"
        >
          <DrawerBackdrop />
          <DrawerTrigger asChild>
            <Button variant="ghost">
              <IoIosMenu />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerBody py={10}>
              <Flex direction="column" gap={2} pt={4}>
                {navigationData.map(({ label, url }) => (
                  <Button
                    key={label + url}
                    justifyContent="flex-start"
                    onClick={() => handleNavigate(url)}
                    size="lg"
                    variant={location.pathname === url ? "solid" : "ghost"}
                  >
                    {label}
                  </Button>
                ))}
              </Flex>
            </DrawerBody>
            <DrawerCloseTrigger />
          </DrawerContent>
        </DrawerRoot>
      </Box>
    </Box>
  );
};
