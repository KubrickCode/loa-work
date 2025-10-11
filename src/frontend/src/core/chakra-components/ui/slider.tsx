import { Slider as ChakraSlider, HStack } from "@chakra-ui/react";
import * as React from "react";

export type SliderProps = {
  label?: React.ReactNode;
  marks?: Array<number | { label: React.ReactNode; value: number }>;
  showValue?: boolean;
} & ChakraSlider.RootProps;

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(function Slider(props, ref) {
  const { label, marks: marksProp, showValue, ...rest } = props;
  const value = props.defaultValue ?? props.value;

  const marks = marksProp?.map((mark) => {
    if (typeof mark === "number") return { label: undefined, value: mark };
    return mark;
  });

  const hasMarkLabel = !!marks?.some((mark) => mark.label);

  return (
    <ChakraSlider.Root ref={ref} thumbAlignment="center" {...rest}>
      {label && !showValue && <ChakraSlider.Label fontWeight="medium">{label}</ChakraSlider.Label>}
      {label && showValue && (
        <HStack justify="space-between">
          <ChakraSlider.Label fontWeight="medium">{label}</ChakraSlider.Label>
          <ChakraSlider.ValueText />
        </HStack>
      )}
      <ChakraSlider.Control mb={hasMarkLabel ? "4" : undefined}>
        <ChakraSlider.Track>
          <ChakraSlider.Range />
        </ChakraSlider.Track>
        {value?.map((_, index) => (
          <ChakraSlider.Thumb index={index} key={index}>
            <ChakraSlider.HiddenInput />
          </ChakraSlider.Thumb>
        ))}
      </ChakraSlider.Control>
      {marks?.length && (
        <ChakraSlider.MarkerGroup>
          {marks.map((mark, index) => {
            const value = typeof mark === "number" ? mark : mark.value;
            const label = typeof mark === "number" ? undefined : mark.label;
            return (
              <ChakraSlider.Marker key={index} value={value}>
                <ChakraSlider.MarkerIndicator />
                {label}
              </ChakraSlider.Marker>
            );
          })}
        </ChakraSlider.MarkerGroup>
      )}
    </ChakraSlider.Root>
  );
});
