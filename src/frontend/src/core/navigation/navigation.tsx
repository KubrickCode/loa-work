import { Box, Flex, Button } from "@chakra-ui/react";
import _ from "lodash";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

import {
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerBackdrop,
} from "~/chakra-components/ui/drawer";

import { Manual } from "./manual";
import { navigationData } from "./navigation-data";
import { useAuth, UserRole } from "../auth";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleNavigate = (url: string) => {
    navigate(url);
    setOpen(false);
  };

  const adminNavigationData =
    user?.role === UserRole.OWNER || user?.role === UserRole.ADMIN
      ? [
          {
            label: "관리자 페이지",
            url: "/admin",
          },
        ]
      : [];

  return (
    <Box as="nav">
      {/* 데스크톱 네비게이션 */}
      <Flex display={{ base: "none", md: "flex" }} gap={2}>
        {[...navigationData, ...adminNavigationData].map(({ label, url }) => (
          <Button
            key={label + url}
            onClick={() => navigate(url)}
            variant={location.pathname === url ? "solid" : "ghost"}
          >
            {label}
          </Button>
        ))}
        <Manual />
      </Flex>
      {/* 모바일 네비게이션 */}
      <Box display={{ base: "block", md: "none" }}>
        <DrawerRoot
          modal={false}
          onOpenChange={(e) => setOpen(e.open)}
          open={open}
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
                    justifyContent="flex-start"
                    key={label + url}
                    onClick={() => handleNavigate(url)}
                    size="lg"
                    variant={location.pathname === url ? "solid" : "ghost"}
                  >
                    {label}
                  </Button>
                ))}
                <Manual />
              </Flex>
            </DrawerBody>
            <DrawerCloseTrigger />
          </DrawerContent>
        </DrawerRoot>
      </Box>
    </Box>
  );
};
