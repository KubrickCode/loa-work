import { Tabs as ChakraTabs } from "@chakra-ui/react";
import { Suspense } from "react";
import { useQueryParams, StringParam } from "use-query-params";
import { Loader } from "../loader";

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

  const currentTabId = query[queryKey] || panels[0].id;
  const currentPanel =
    panels.find((panel) => panel.id === currentTabId) || panels[0];

  return (
    <ChakraTabs.Root
      value={currentPanel.label}
      variant="outline"
      onValueChange={(details) => {
        const panel = panels.find((p) => p.label === details.value);
        if (panel) setQuery({ [queryKey]: panel.id });
      }}
    >
      <ChakraTabs.List>
        {panels.map((panel) => (
          <ChakraTabs.Trigger key={panel.id} value={panel.label}>
            {panel.label}
          </ChakraTabs.Trigger>
        ))}
      </ChakraTabs.List>
      {panels.map((panel) => (
        <ChakraTabs.Content key={panel.id} value={panel.label}>
          <Suspense fallback={<Loader.Block />}>{panel.component}</Suspense>
        </ChakraTabs.Content>
      ))}
    </ChakraTabs.Root>
  );
};
