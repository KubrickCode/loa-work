import { createContext, PropsWithChildren, useContext, useState } from "react";

type ContentWageListTableContextType = {
  contentCategoryId?: string;
  setContentCategoryId: (id?: string) => void;

  includeIsSeeMore?: boolean;
  setIncludeIsSeeMore: (value: boolean) => void;
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

  return (
    <ContentWageListTableContext.Provider
      value={{
        contentCategoryId,
        includeIsSeeMore,
        setContentCategoryId,
        setIncludeIsSeeMore,
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
