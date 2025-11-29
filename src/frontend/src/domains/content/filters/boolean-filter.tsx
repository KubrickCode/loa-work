import { SegmentedControl } from "~/components/chakra/ui/segmented-control";

type BooleanFilterLabels = {
  false: string;
  true: string;
};

type BooleanFilterProps = {
  labels?: BooleanFilterLabels;
  onChange: (value: boolean) => void;
  value: boolean;
};

const DEFAULT_LABELS: BooleanFilterLabels = {
  false: "미포함",
  true: "포함",
};

export const BooleanFilter = ({ labels = DEFAULT_LABELS, onChange, value }: BooleanFilterProps) => {
  return (
    <SegmentedControl
      items={[
        { label: labels.false, value: "false" },
        { label: labels.true, value: "true" },
      ]}
      onValueChange={(e) => onChange(e.value === "true")}
      value={value ? "true" : "false"}
    />
  );
};
