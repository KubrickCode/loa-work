import { Popover as ChakraPopover, IconButton, Portal } from "@chakra-ui/react"
import * as React from "react"
import { HiOutlineInformationCircle } from "react-icons/hi"

export interface ToggleTipProps extends ChakraPopover.RootProps {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
  content?: React.ReactNode
}

export const ToggleTip = React.forwardRef<HTMLDivElement, ToggleTipProps>(
  function ToggleTip(props, ref) {
    const {
      showArrow,
      children,
      portalled = true,
      content,
      portalRef,
      ...rest
    } = props

    return (
      <ChakraPopover.Root
        {...rest}
        positioning={{ ...rest.positioning, gutter: 4 }}
      >
        <ChakraPopover.Trigger asChild>{children}</ChakraPopover.Trigger>
        <Portal container={portalRef} disabled={!portalled}>
          <ChakraPopover.Positioner>
            <ChakraPopover.Content
              px="2"
              py="1"
              ref={ref}
              rounded="sm"
              textStyle="xs"
              width="auto"
            >
              {showArrow && (
                <ChakraPopover.Arrow>
                  <ChakraPopover.ArrowTip />
                </ChakraPopover.Arrow>
              )}
              {content}
            </ChakraPopover.Content>
          </ChakraPopover.Positioner>
        </Portal>
      </ChakraPopover.Root>
    )
  },
)

export const InfoTip = React.forwardRef<
  HTMLDivElement,
  Partial<ToggleTipProps>
>(function InfoTip(props, ref) {
  const { children, ...rest } = props
  return (
    <ToggleTip content={children} {...rest} ref={ref}>
      <IconButton
        aria-label="info"
        colorPalette="gray"
        size="2xs"
        variant="ghost"
      >
        <HiOutlineInformationCircle />
      </IconButton>
    </ToggleTip>
  )
})
