import {
  Box,
  createListCollection,
  Flex,
  HStack,
  Spinner,
  Stack,
  Table,
  VStack,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";

import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "~/core/chakra-components/ui/select";
import { Skeleton, SkeletonText } from "~/core/chakra-components/ui/skeleton";

const modernShimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const EnhancedTableSkeleton = ({
  columnCount = 4,
  rowCount = 5,
  enableStaggered = true,
}: {
  columnCount?: number;
  rowCount?: number;
  enableStaggered?: boolean;
}) => {
  return (
    <Table.Root
      bg="bg.surface"
      borderColor="border.default"
      borderRadius="md"
      overflow="hidden"
      showColumnBorder
      width="100%"
    >
      <Table.Header>
        <Table.Row bg="bg.muted">
          {Array.from({ length: columnCount }).map((_, index) => (
            <Table.ColumnHeader key={index} px={{ base: 2, md: 3 }} py={3}>
              <Skeleton
                borderRadius="sm"
                css={{
                  animation: `${modernShimmer} 2s infinite linear`,
                  background:
                    "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent)",
                  backgroundSize: "1000px 100%",
                }}
                height="20px"
              />
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array.from({ length: rowCount }).map((_, rowIndex) => (
          <Table.Row
            css={
              enableStaggered
                ? {
                    animation: `fadeInUp 0.6s ease-out ${rowIndex * 0.05}s both`,
                    "@keyframes fadeInUp": {
                      "0%": {
                        opacity: 0,
                        transform: "translateY(10px)",
                      },
                      "100%": {
                        opacity: 1,
                        transform: "translateY(0)",
                      },
                    },
                  }
                : undefined
            }
            key={rowIndex}
            minH={{ base: "52px", md: "auto" }}
          >
            {Array.from({ length: columnCount }).map((_, colIndex) => (
              <Table.Cell
                key={colIndex}
                minH={{ base: "44px", md: "auto" }}
                px={{ base: 2, md: 3 }}
                py={{ base: 3, md: 2 }}
              >
                <Skeleton
                  borderRadius="sm"
                  css={{
                    animation: `${modernShimmer} 2.5s infinite linear ${colIndex * 0.1}s`,
                    background:
                      "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.15), transparent)",
                    backgroundSize: "1000px 100%",
                  }}
                  height="16px"
                  width={
                    colIndex === 0
                      ? "60%"
                      : colIndex === columnCount - 1
                        ? "80%"
                        : "90%"
                  }
                />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export const TableSkeleton = ({
  line,
  columnCount = 4,
  rowCount = 5,
}: {
  line?: number;
  columnCount?: number;
  rowCount?: number;
}) => {
  if (line !== undefined) {
    return <SkeletonText gap="4" noOfLines={line} p={4} />;
  }

  return (
    <Table.Root
      bg="bg.surface"
      borderColor="border.default"
      borderRadius="md"
      overflow="hidden"
      showColumnBorder
      width="100%"
    >
      <Table.Header>
        <Table.Row bg="bg.muted">
          {Array.from({ length: columnCount }).map((_, index) => (
            <Table.ColumnHeader key={index} px={{ base: 2, md: 3 }} py={3}>
              <Skeleton
                borderRadius="sm"
                css={{
                  animation: `${modernShimmer} 2s infinite linear`,
                  background:
                    "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent)",
                  backgroundSize: "1000px 100%",
                }}
                height="20px"
              />
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array.from({ length: rowCount }).map((_, rowIndex) => (
          <Table.Row key={rowIndex} minH={{ base: "52px", md: "auto" }}>
            {Array.from({ length: columnCount }).map((_, colIndex) => (
              <Table.Cell
                key={colIndex}
                minH={{ base: "44px", md: "auto" }}
                px={{ base: 2, md: 3 }}
                py={{ base: 3, md: 2 }}
              >
                <Skeleton
                  borderRadius="sm"
                  height="16px"
                  width={
                    colIndex === 0
                      ? "60%"
                      : colIndex === columnCount - 1
                        ? "80%"
                        : "90%"
                  }
                />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export const PageLoader = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      width="100%"
    >
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

export const ChartSkeleton = ({ height = "300px" }: { height?: string }) => {
  return (
    <Box
      bg="bg.surface"
      borderColor="border.default"
      borderRadius="lg"
      borderWidth="1px"
      p={6}
      shadow="sm"
    >
      <Stack gap={4}>
        <HStack justify="space-between">
          <Skeleton height="24px" width="200px" />
          <Skeleton height="32px" width="100px" />
        </HStack>
        <Box
          bg="bg.muted"
          borderRadius="md"
          height={height}
          overflow="hidden"
          position="relative"
        >
          <Box
            bottom={0}
            css={{
              animation: `${modernShimmer} 3s infinite linear`,
              background:
                "linear-gradient(180deg, transparent, var(--colors-neutral-100))",
            }}
            height="60%"
            left="10%"
            position="absolute"
            right="10%"
          />
          <HStack
            bottom={4}
            justify="space-between"
            left={4}
            position="absolute"
            right={4}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton height="12px" key={index} width="40px" />
            ))}
          </HStack>
        </Box>
      </Stack>
    </Box>
  );
};

export const ProgressiveLoader = ({
  children,
  isLoading,
  skeleton,
  delay = 250,
  fadeTransition = true,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  skeleton: React.ReactNode;
  delay?: number;
  fadeTransition?: boolean;
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
              animation: "fadeInContent 0.3s ease-out",
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
