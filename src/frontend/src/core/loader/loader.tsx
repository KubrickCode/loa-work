import {
  Box,
  createListCollection,
  Flex,
  Spinner,
  Table,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";

import { SelectRoot, SelectTrigger, SelectValueText } from "~/core/chakra-components/ui/select";
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
  enableStaggered = true,
  rowCount = 5,
}: {
  columnCount?: number | { base?: number; lg?: number; md?: number };
  enableStaggered?: boolean;
  rowCount?: number;
}) => {
  const resolvedColumnCount = useBreakpointValue(
    typeof columnCount === "number"
      ? { base: columnCount, lg: columnCount, md: columnCount }
      : { base: columnCount.base ?? 3, lg: columnCount.lg ?? 8, md: columnCount.md ?? 6 }
  );

  const finalColumnCount = resolvedColumnCount ?? 4;

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
          {Array.from({ length: finalColumnCount }).map((_, index) => (
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
                    animation: `fadeInUp 0.6s ease-out ${rowIndex * 0.05}s both`,
                  }
                : undefined
            }
            key={rowIndex}
            minH={{ base: "52px", md: "auto" }}
          >
            {Array.from({ length: finalColumnCount }).map((_, colIndex) => (
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
                  width={colIndex === 0 ? "60%" : colIndex === finalColumnCount - 1 ? "80%" : "90%"}
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
  columnCount = 4,
  line,
  rowCount = 5,
}: {
  columnCount?: number;
  line?: number;
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
                  width={colIndex === 0 ? "60%" : colIndex === columnCount - 1 ? "80%" : "90%"}
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
