import { useEffect, useState } from "react";

import { RewardItem } from "../types";

type WageFilterState = {
  includeBound: boolean;
  includeItemIds: number[];
  includeSeeMore: boolean;
};

type WageFilterActions = {
  setIncludeBound: (value: boolean) => void;
  setIncludeItemIds: (value: number[]) => void;
  setIncludeSeeMore: (value: boolean) => void;
};

export const useWageFilter = (items: RewardItem[]): WageFilterState & WageFilterActions => {
  const [includeBound, setIncludeBound] = useState(false);
  const [includeItemIds, setIncludeItemIds] = useState<number[]>(items.map(({ id }) => id));
  const [includeSeeMore, setIncludeSeeMore] = useState(false);

  // items 변경 시 includeItemIds 동기화 (외부 prop 동기화)
  useEffect(() => {
    setIncludeItemIds(items.map(({ id }) => id));
  }, [items]);

  return {
    includeBound,
    includeItemIds,
    includeSeeMore,
    setIncludeBound,
    setIncludeItemIds,
    setIncludeSeeMore,
  };
};
