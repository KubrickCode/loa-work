import { Box, Flex } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

import { Toaster } from "~/core/chakra-components/ui/toaster";

import { Footer } from "./footer";
import { Header } from "./header";

const MotionBox = motion.create(Box);

export const Layout = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  return (
    <Flex
      _before={{
        bg: {
          _dark:
            "linear-gradient(180deg, var(--chakra-colors-neutral-950) 0%, rgba(26, 26, 28, 0.8) 100%)",
          _light:
            "linear-gradient(180deg, var(--chakra-colors-bg-canvas) 0%, var(--chakra-colors-bg-surface) 100%)",
        },
        content: '""',
        height: "40vh",
        left: 0,
        pointerEvents: "none",
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: -1,
      }}
      bg="bg.canvas"
      direction="column"
      minH="100dvh"
    >
      <Header />
      <AnimatePresence initial={false} mode="wait">
        <MotionBox
          animate={{
            opacity: 1,
          }}
          aria-label="메인 콘텐츠"
          as="main"
          exit={{
            opacity: 0,
          }}
          flex="1"
          initial={{
            opacity: 0,
          }}
          key={location.pathname}
          pb={{ base: 20, md: 24 }}
          pt={{ base: 4, md: 6 }}
          px={{ base: 4, md: 8 }}
          role="main"
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        >
          {children}
        </MotionBox>
      </AnimatePresence>
      <Footer />
      <Toaster />
    </Flex>
  );
};
