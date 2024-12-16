import { Tabs as ChakraTabs } from "@chakra-ui/react";

export type TabPanel = {
  label: string;
  component: React.ReactNode;
};

export type TabsProps = {
  panels: TabPanel[];
};

export const Tabs = ({ panels }: TabsProps) => {
  return (
    <ChakraTabs.Root defaultValue={panels[0].label} variant="outline">
      <ChakraTabs.List>
        {panels.map((panel) => (
          <ChakraTabs.Trigger key={panel.label} value={panel.label}>
            {panel.label}
          </ChakraTabs.Trigger>
        ))}
      </ChakraTabs.List>
      {panels.map((panel) => (
        <ChakraTabs.Content key={panel.label} value={panel.label}>
          {panel.component}
        </ChakraTabs.Content>
      ))}
    </ChakraTabs.Root>
  );
};
