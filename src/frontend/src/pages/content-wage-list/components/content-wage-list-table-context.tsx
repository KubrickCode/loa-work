import { createContext, PropsWithChildren, useContext, useState } from "react";

type ContentWageListTableContextType = {
  contentCategoryId?: string;
  setContentCategoryId: (id?: string) => void;

  includeIsSeeMore?: boolean;
  setIncludeIsSeeMore: (value: boolean) => void;

  includeIsBound?: boolean;
  setIncludeIsBound: (value: boolean) => void;
};

const ContentWageListTableContext = createContext<
  ContentWageListTableContextType | undefined
>(undefined);

export const ContentWageListTableProvider = ({
  children,
}: PropsWithChildren) => {
  const [contentCategoryId, setContentCategoryId] = useState<
    string | undefined
  >();
  const [includeIsSeeMore, setIncludeIsSeeMore] = useState<boolean>(false);
  const [includeIsBound, setIncludeIsBound] = useState<boolean>(false);
  return (
    <ContentWageListTableContext.Provider
      value={{
        contentCategoryId,
        includeIsSeeMore,
        includeIsBound,
        setContentCategoryId,
        setIncludeIsSeeMore,
        setIncludeIsBound,
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
