import type { BoxProps, InputElementProps } from "@chakra-ui/react";
import { Group, InputElement } from "@chakra-ui/react";
import * as React from "react";

export type InputGroupProps = {
  children: React.ReactElement;
  endElement?: React.ReactNode;
  endElementProps?: InputElementProps;
  endOffset?: InputElementProps["paddingEnd"];
  startElement?: React.ReactNode;
  startElementProps?: InputElementProps;
  startOffset?: InputElementProps["paddingStart"];
} & BoxProps;

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(props, ref) {
    const {
      children,
      endElement,
      endElementProps,
      endOffset = "6px",
      startElement,
      startElementProps,
      startOffset = "6px",
      ...rest
    } = props;

    return (
      <Group ref={ref} {...rest}>
        {startElement && (
          <InputElement pointerEvents="none" {...startElementProps}>
            {startElement}
          </InputElement>
        )}
        {React.cloneElement(children, {
          ...(startElement && {
            ps: `calc(var(--input-height) - ${startOffset})`,
          }),
          ...(endElement && { pe: `calc(var(--input-height) - ${endOffset})` }),
          ...children.props,
        })}
        {endElement && (
          <InputElement placement="end" {...endElementProps}>
            {endElement}
          </InputElement>
        )}
      </Group>
    );
  }
);
