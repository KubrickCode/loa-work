import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { useSafeQuery } from "~/libs/graphql";
import { ItemsFilterDocument, ItemsFilterQuery } from "~/libs/graphql/generated";

type ContentWageListPageContextType = {
  contentCategoryId: number | null;

  includeBound?: boolean;
  includeItemIds: number[];

  includeSeeMore?: boolean;
  items: ItemsFilterQuery["items"];

  keyword: string;
  setContentCategoryId: (id: number | null) => void;

  setIncludeBound: (value: boolean) => void;
  setIncludeItemIds: Dispatch<SetStateAction<number[]>>;

  setIncludeSeeMore: (value: boolean) => void;
  setKeyword: (value: string) => void;

  setShouldMergeGate: (value: boolean) => void;
  shouldMergeGate?: boolean;
};

const ContentWageListPageContext = createContext<ContentWageListPageContextType | undefined>(
  undefined
);

export const ContentWageListPageProvider = ({ children }: PropsWithChildren) => {
  const {
    data: { items },
  } = useSafeQuery(ItemsFilterDocument);
  const [contentCategoryId, setContentCategoryId] = useState<number | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [includeSeeMore, setIncludeSeeMore] = useState<boolean>(false);
  const [includeBound, setIncludeBound] = useState<boolean>(false);
  const [includeItemIds, setIncludeItemIds] = useState<number[]>(items.map((item) => item.id));
  const [shouldMergeGate, setShouldMergeGate] = useState<boolean>(true);

  return (
    <ContentWageListPageContext.Provider
      value={{
        contentCategoryId,
        includeBound,
        includeItemIds,
        includeSeeMore,
        items,
        keyword,
        setContentCategoryId,
        setIncludeBound,
        setIncludeItemIds,
        setIncludeSeeMore,
        setKeyword,
        setShouldMergeGate,
        shouldMergeGate,
      }}
    >
      {children}
    </ContentWageListPageContext.Provider>
  );
};

export const useContentWageListPage = () => {
  const context = useContext(ContentWageListPageContext);
  if (!context) throw new Error("Invalid ContentWageListPageContext");

  return context;
};
