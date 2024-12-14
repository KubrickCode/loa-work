import { createContext, PropsWithChildren, useContext, useState } from "react";

type ContentRewardListTableContextType = {
  contentCategoryId: number | null;
  setContentCategoryId: (id: number | null) => void;
};

const ContentRewardListTableContext = createContext<
  ContentRewardListTableContextType | undefined
>(undefined);

export const ContentRewardListTableProvider = ({
  children,
}: PropsWithChildren) => {
  const [contentCategoryId, setContentCategoryId] = useState<number | null>(
    null
  );

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
