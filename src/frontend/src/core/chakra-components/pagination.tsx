"use client";

import type { ButtonProps, TextProps } from "@chakra-ui/react";
import {
  Button,
  Pagination as ChakraPagination,
  IconButton,
  Text,
  createContext,
  usePaginationContext,
} from "@chakra-ui/react";
import * as React from "react";
import { HiChevronLeft, HiChevronRight, HiMiniEllipsisHorizontal } from "react-icons/hi2";

import { LinkButton } from "./link-button";

type ButtonVariantMap = {
  current: ButtonProps["variant"];
  default: ButtonProps["variant"];
  ellipsis: ButtonProps["variant"];
};

type PaginationVariant = "outline" | "solid" | "subtle";

type ButtonVariantContext = {
  getHref?: (page: number) => string;
  size: ButtonProps["size"];
  variantMap: ButtonVariantMap;
};

const [RootPropsProvider, useRootProps] = createContext<ButtonVariantContext>({
  name: "RootPropsProvider",
});

export type PaginationRootProps = {
  getHref?: (page: number) => string;
  size?: ButtonProps["size"];
  variant?: PaginationVariant;
} & Omit<ChakraPagination.RootProps, "type">;

const variantMap: Record<PaginationVariant, ButtonVariantMap> = {
  outline: { current: "outline", default: "ghost", ellipsis: "plain" },
  solid: { current: "solid", default: "outline", ellipsis: "outline" },
  subtle: { current: "subtle", default: "ghost", ellipsis: "plain" },
};

export const PaginationRoot = React.forwardRef<HTMLDivElement, PaginationRootProps>(
  function PaginationRoot(props, ref) {
    const { getHref, size = "sm", variant = "outline", ...rest } = props;
    return (
      <RootPropsProvider value={{ getHref, size, variantMap: variantMap[variant] }}>
        <ChakraPagination.Root ref={ref} type={getHref ? "link" : "button"} {...rest} />
      </RootPropsProvider>
    );
  }
);

export const PaginationEllipsis = React.forwardRef<HTMLDivElement, ChakraPagination.EllipsisProps>(
  function PaginationEllipsis(props, ref) {
    const { size, variantMap } = useRootProps();
    return (
      <ChakraPagination.Ellipsis ref={ref} {...props} asChild>
        <Button as="span" size={size} variant={variantMap.ellipsis}>
          <HiMiniEllipsisHorizontal />
        </Button>
      </ChakraPagination.Ellipsis>
    );
  }
);

export const PaginationItem = React.forwardRef<HTMLButtonElement, ChakraPagination.ItemProps>(
  function PaginationItem(props, ref) {
    const { page } = usePaginationContext();
    const { getHref, size, variantMap } = useRootProps();

    const current = page === props.value;
    const variant = current ? variantMap.current : variantMap.default;

    if (getHref) {
      return (
        <LinkButton href={getHref(props.value)} size={size} variant={variant}>
          {props.value}
        </LinkButton>
      );
    }

    return (
      <ChakraPagination.Item ref={ref} {...props} asChild>
        <Button size={size} variant={variant}>
          {props.value}
        </Button>
      </ChakraPagination.Item>
    );
  }
);

export const PaginationPrevTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraPagination.PrevTriggerProps
>(function PaginationPrevTrigger(props, ref) {
  const { getHref, size, variantMap } = useRootProps();
  const { previousPage } = usePaginationContext();

  if (getHref) {
    return (
      <LinkButton
        href={previousPage != null ? getHref(previousPage) : undefined}
        size={size}
        variant={variantMap.default}
      >
        <HiChevronLeft />
      </LinkButton>
    );
  }

  return (
    <ChakraPagination.PrevTrigger asChild ref={ref} {...props}>
      <IconButton size={size} variant={variantMap.default}>
        <HiChevronLeft />
      </IconButton>
    </ChakraPagination.PrevTrigger>
  );
});

export const PaginationNextTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraPagination.NextTriggerProps
>(function PaginationNextTrigger(props, ref) {
  const { getHref, size, variantMap } = useRootProps();
  const { nextPage } = usePaginationContext();

  if (getHref) {
    return (
      <LinkButton
        href={nextPage != null ? getHref(nextPage) : undefined}
        size={size}
        variant={variantMap.default}
      >
        <HiChevronRight />
      </LinkButton>
    );
  }

  return (
    <ChakraPagination.NextTrigger asChild ref={ref} {...props}>
      <IconButton size={size} variant={variantMap.default}>
        <HiChevronRight />
      </IconButton>
    </ChakraPagination.NextTrigger>
  );
});

export const PaginationItems = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <ChakraPagination.Context>
      {({ pages }) =>
        pages.map((page, index) => {
          return page.type === "ellipsis" ? (
            <PaginationEllipsis index={index} key={index} {...props} />
          ) : (
            <PaginationItem key={index} type="page" value={page.value} {...props} />
          );
        })
      }
    </ChakraPagination.Context>
  );
};

type PageTextProps = {
  format?: "short" | "compact" | "long";
} & TextProps;

export const PaginationPageText = React.forwardRef<HTMLParagraphElement, PageTextProps>(
  function PaginationPageText(props, ref) {
    const { format = "compact", ...rest } = props;
    const { count, page, pageRange, totalPages } = usePaginationContext();
    const content = React.useMemo(() => {
      if (format === "short") return `${page} / ${totalPages}`;
      if (format === "compact") return `${page} of ${totalPages}`;
      return `${pageRange.start + 1} - ${Math.min(pageRange.end, count)} of ${count}`;
    }, [format, page, totalPages, pageRange, count]);

    return (
      <Text fontWeight="medium" ref={ref} {...rest}>
        {content}
      </Text>
    );
  }
);
