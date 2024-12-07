import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useSafeQuery } from "~/core/graphql";
import { ContentRewardItemsFilterDocument } from "~/core/graphql/generated";

type ContentWageListTableContextType = {
  contentRewardItems: string[];

  contentCategoryId?: string;
  setContentCategoryId: (id?: string) => void;

  includeIsSeeMore?: boolean;
  setIncludeIsSeeMore: (value: boolean) => void;

  includeIsBound?: boolean;
  setIncludeIsBound: (value: boolean) => void;

  includeContentRewardItems: string[];
  setIncludeContentRewardItems: Dispatch<SetStateAction<string[]>>;
};

const ContentWageListTableContext = createContext<
  ContentWageListTableContextType | undefined
>(undefined);

export const ContentWageListTableProvider = ({
  children,
}: PropsWithChildren) => {
  const {
    data: { contentRewardItems },
  } = useSafeQuery(ContentRewardItemsFilterDocument);
  const [contentCategoryId, setContentCategoryId] = useState<
    string | undefined
  >();
  const [includeIsSeeMore, setIncludeIsSeeMore] = useState<boolean>(false);
  const [includeIsBound, setIncludeIsBound] = useState<boolean>(false);
  const [includeContentRewardItems, setIncludeContentRewardItems] =
    useState<string[]>(contentRewardItems);

  return (
    <ContentWageListTableContext.Provider
      value={{
        contentRewardItems,
        contentCategoryId,
        includeIsSeeMore,
        includeIsBound,
        setContentCategoryId,
        setIncludeIsSeeMore,
        setIncludeIsBound,
        includeContentRewardItems,
        setIncludeContentRewardItems,
      }}
    >
      {children}
    </ContentWageListTableContext.Provider>
  );
};

export const useContentWageListTable = () => {
  const context = useContext(ContentWageListTableContext);
  if (!context) throw new Error("Invalid ContentWageListTableContext");

  return context;
};
