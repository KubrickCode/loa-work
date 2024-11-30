import { createContext, PropsWithChildren, useContext, useState } from "react";

type ContentRewardListTableContextType = {
  contentCategoryId?: string;
  setContentCategoryId: (id?: string) => void;
};

const ContentRewardListTableContext = createContext<
  ContentRewardListTableContextType | undefined
>(undefined);

export const ContentRewardListTableProvider = ({
  children,
}: PropsWithChildren) => {
  const [contentCategoryId, setContentCategoryId] = useState<
    string | undefined
  >();

  return (
    <ContentRewardListTableContext.Provider
      value={{ contentCategoryId, setContentCategoryId }}
    >
      {children}
    </ContentRewardListTableContext.Provider>
  );
};

export const useContentRewardListTable = () => {
  const context = useContext(ContentRewardListTableContext);
  if (!context) throw new Error("Invalid ContentRewardListTableContext");

  return context;
};
