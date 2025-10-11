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
  items: ItemsFilterQuery["items"];

  contentCategoryId: number | null;
  setContentCategoryId: (id: number | null) => void;

  keyword: string;
  setKeyword: (value: string) => void;

  includeIsSeeMore?: boolean;
  setIncludeIsSeeMore: (value: boolean) => void;

  includeIsBound?: boolean;
  setIncludeIsBound: (value: boolean) => void;

  includeItemIds: number[];
  setIncludeItemIds: Dispatch<SetStateAction<number[]>>;

  shouldMergeGate?: boolean;
  setShouldMergeGate: (value: boolean) => void;
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
        items,
        contentCategoryId,
        keyword,
        setKeyword,
        includeIsSeeMore,
        includeIsBound,
        setContentCategoryId,
        setIncludeIsSeeMore,
        setIncludeIsBound,
        includeItemIds,
        setIncludeItemIds,
        shouldMergeGate,
        setShouldMergeGate,
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
