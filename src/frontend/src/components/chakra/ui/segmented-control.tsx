"use client";

import { For, SegmentGroup } from "@chakra-ui/react";
import * as React from "react";

type Item = {
  disabled?: boolean;
  label: React.ReactNode;
  value: string;
};

export type SegmentedControlProps = {
  items: Array<string | Item>;
} & SegmentGroup.RootProps;

function normalize(items: Array<string | Item>): Item[] {
  return items.map((item) => {
    if (typeof item === "string") return { label: item, value: item };
    return item;
  });
}

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl(props, ref) {
    const { items, ...rest } = props;
    const data = React.useMemo(() => normalize(items), [items]);

    return (
      <SegmentGroup.Root ref={ref} size="xs" {...rest}>
        <SegmentGroup.Indicator />
        <For each={data}>
          {(item) => (
            <SegmentGroup.Item
              cursor="pointer"
              disabled={item.disabled}
              justifyContent="center"
              key={item.value}
              minW={14}
              value={item.value}
            >
              <SegmentGroup.ItemText>{item.label}</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          )}
        </For>
      </SegmentGroup.Root>
    );
  }
);
