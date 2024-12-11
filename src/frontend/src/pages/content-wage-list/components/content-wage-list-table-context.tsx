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
  contentRewardItems: {
    id: number;
    name: string;
  }[];

  contentCategoryId?: string;
  setContentCategoryId: (id?: string) => void;

  includeIsSeeMore?: boolean;
  setIncludeIsSeeMore: (value: boolean) => void;

  includeIsBound?: boolean;
  setIncludeIsBound: (value: boolean) => void;

  includeContentRewardItemIds: number[];
  setIncludeContentRewardItemIds: Dispatch<SetStateAction<number[]>>;
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
  const [includeContentRewardItemIds, setIncludeContentRewardItemIds] =
    useState<number[]>(contentRewardItems.map((item) => item.id));

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
        includeContentRewardItemIds,
        setIncludeContentRewardItemIds,
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
