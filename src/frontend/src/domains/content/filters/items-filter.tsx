import { MultiSelect } from "~/components/select";

import { RewardItem } from "../types";

type ItemsFilterProps = {
  items: RewardItem[];
  onChange: (value: number[]) => void;
  placeholder?: string;
  value: number[];
};

export const ItemsFilter = ({
  items: rewardItems,
  onChange,
  placeholder = "보상 아이템 선택",
  value,
}: ItemsFilterProps) => {
  const items = rewardItems.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  return <MultiSelect items={items} onChange={onChange} placeholder={placeholder} value={value} />;
};
