import { Tabs as ChakraTabs } from "@chakra-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Suspense } from "react";
import { useQueryParams, StringParam } from "use-query-params";

import {
  ANIMATION_DURATIONS,
  EASING,
} from "~/core/animations/micro-interactions";

import { BlockLoader } from "../loader";

export type TabPanel = {
  id: string; // URL에 사용될 id
  label: string; // 화면에 표시될 라벨
  component: React.ReactNode;
};

export type TabsProps = {
  panels: TabPanel[];
  queryKey?: string;
};

export const Tabs = ({ panels, queryKey = "tab" }: TabsProps) => {
  const [query, setQuery] = useQueryParams({
    [queryKey]: StringParam,
  });
  const shouldReduceMotion = useReducedMotion();

  const currentTabId = query[queryKey] || panels[0].id;
  const currentPanel =
    panels.find((panel) => panel.id === currentTabId) || panels[0];

  return (
    <ChakraTabs.Root
      lazyMount
      onValueChange={(details) => {
        const panel = panels.find((p) => p.label === details.value);
        if (panel) setQuery({ [queryKey]: panel.id });
      }}
      size="sm"
      unmountOnExit
      value={currentPanel.label}
      variant="enclosed"
    >
      <ChakraTabs.List>
        {panels.map((panel) => (
          <ChakraTabs.Trigger
            fontSize={{ base: "xs", md: "sm" }}
            key={panel.id}
            value={panel.label}
          >
            {panel.label}
          </ChakraTabs.Trigger>
        ))}
        <ChakraTabs.Indicator rounded="l2" />
      </ChakraTabs.List>
      <AnimatePresence mode="wait">
        {panels.map((panel) => (
          <ChakraTabs.Content
            key={panel.id}
            outline="none"
            pt={6}
            value={panel.label}
          >
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              key={`content-${panel.id}`}
              transition={{
                duration: ANIMATION_DURATIONS.fast,
                ease: EASING.easeOut,
              }}
            >
              <Suspense fallback={<BlockLoader />}>{panel.component}</Suspense>
            </motion.div>
          </ChakraTabs.Content>
        ))}
      </AnimatePresence>
    </ChakraTabs.Root>
  );
};
