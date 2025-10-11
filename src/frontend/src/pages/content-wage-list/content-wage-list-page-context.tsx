import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { useSafeQuery } from "~/core/graphql";
import { ItemsFilterDocument, ItemsFilterQuery } from "~/core/graphql/generated";

type ContentWageListPageContextType = {
  contentCategoryId: number | null;

  includeIsBound?: boolean;
  includeIsSeeMore?: boolean;

  includeItemIds: number[];
  items: ItemsFilterQuery["items"];

  keyword: string;
  setContentCategoryId: (id: number | null) => void;

  setIncludeIsBound: (value: boolean) => void;
  setIncludeIsSeeMore: (value: boolean) => void;

  setIncludeItemIds: Dispatch<SetStateAction<number[]>>;
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
  const [includeIsSeeMore, setIncludeIsSeeMore] = useState<boolean>(false);
  const [includeIsBound, setIncludeIsBound] = useState<boolean>(false);
  const [includeItemIds, setIncludeItemIds] = useState<number[]>(items.map((item) => item.id));
  const [shouldMergeGate, setShouldMergeGate] = useState<boolean>(true);

  return (
    <ContentWageListPageContext.Provider
      value={{
        contentCategoryId,
        includeIsBound,
        includeIsSeeMore,
        includeItemIds,
        items,
        keyword,
        setContentCategoryId,
        setIncludeIsBound,
        setIncludeIsSeeMore,
        setIncludeItemIds,
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
