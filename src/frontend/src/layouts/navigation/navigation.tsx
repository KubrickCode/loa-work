import { Box, Flex, Button } from "@chakra-ui/react";
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
} from "~/components/chakra/ui/drawer";
import { useAuth, UserRole } from "~/libs/auth";

import { Manual } from "./manual";
import { navigationData } from "./navigation-data";

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
        {[...navigationData, ...adminNavigationData].map(({ label, url }) => {
          const isActive = location.pathname === url;
          return (
            <Button
              _hover={{
                bg: "bg.hover",
                borderBottomColor: isActive ? "gold.500" : "border.emphasis",
                color: "text.primary",
              }}
              bg="transparent"
              borderBottom="2px solid"
              borderBottomColor={isActive ? "gold.500" : "transparent"}
              borderRadius="none"
              color={isActive ? "text.primary" : "text.secondary"}
              fontWeight={isActive ? "semibold" : "normal"}
              key={label + url}
              onClick={() => navigate(url)}
              px={3}
              transition="all 0.2s ease-in-out"
              variant="ghost"
            >
              {label}
            </Button>
          );
        })}
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
                {navigationData.map(({ label, url }) => {
                  const isActive = location.pathname === url;
                  return (
                    <Button
                      _hover={{
                        bg: "bg.hover",
                        borderLeftColor: isActive ? "gold.500" : "border.emphasis",
                        color: "text.primary",
                      }}
                      bg="transparent"
                      borderLeft="3px solid"
                      borderLeftColor={isActive ? "gold.500" : "transparent"}
                      borderRadius="none"
                      color={isActive ? "text.primary" : "text.secondary"}
                      fontWeight={isActive ? "semibold" : "normal"}
                      justifyContent="flex-start"
                      key={label + url}
                      onClick={() => handleNavigate(url)}
                      pl={4}
                      size="lg"
                      transition="all 0.2s ease-in-out"
                      variant="ghost"
                    >
                      {label}
                    </Button>
                  );
                })}
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
