import { Box, createListCollection, Flex, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

import { SelectRoot, SelectTrigger, SelectValueText } from "~/components/chakra/ui/select";

export const PageLoader = () => {
  return (
    <Flex alignItems="center" justifyContent="center" minHeight="70vh" width="100%">
      <Spinner />
    </Flex>
  );
};

export const SelectLoader = () => {
  const frameworks = createListCollection({
    items: [],
  });

  return (
    <SelectRoot collection={frameworks} disabled maxWidth="10rem" size="xs">
      <SelectTrigger loading>
        <SelectValueText placeholder="loading..." />
      </SelectTrigger>
    </SelectRoot>
  );
};

export const ProgressiveLoader = ({
  children,
  delay = 250,
  fadeTransition = true,
  isLoading,
  skeleton,
}: {
  children: React.ReactNode;
  delay?: number;
  fadeTransition?: boolean;
  isLoading: boolean;
  skeleton: React.ReactNode;
}) => {
  const [showSkeleton, setShowSkeleton] = React.useState(true);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        if (fadeTransition) {
          setIsTransitioning(true);
          setTimeout(() => {
            setShowSkeleton(false);
            setIsTransitioning(false);
          }, 150); // Quick fade transition
        } else {
          setShowSkeleton(false);
        }
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(true);
      setIsTransitioning(false);
    }
  }, [isLoading, delay, fadeTransition]);

  if (showSkeleton) {
    return (
      <Box
        css={
          isTransitioning && fadeTransition
            ? {
                opacity: 0.7,
                transition: "opacity 0.15s ease-out",
              }
            : undefined
        }
      >
        {skeleton}
      </Box>
    );
  }

  return (
    <Box
      css={
        fadeTransition
          ? {
              "@keyframes fadeInContent": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(5px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
              animation: "fadeInContent 0.3s ease-out",
            }
          : undefined
      }
    >
      {children}
    </Box>
  );
};

export const BlockLoader = () => {
  return (
    <VStack justifyContent="center" minHeight="sm">
      <Spinner />
    </VStack>
  );
};

export const TextLoader = ({ message = "데이터를 불러오는 중..." }: { message?: string }) => {
  return (
    <Flex
      alignItems="center"
      color="fg.muted"
      gap={3}
      justifyContent="center"
      minHeight="200px"
      py={8}
      width="100%"
    >
      <Spinner size="sm" />
      <Box fontSize="sm">{message}</Box>
    </Flex>
  );
};
