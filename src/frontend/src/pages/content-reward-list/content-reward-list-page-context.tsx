import { createContext, PropsWithChildren, useContext, useState } from "react";

type ContentRewardListPageContextType = {
  contentCategoryId: number | null;
  setContentCategoryId: (id: number | null) => void;
};

const ContentRewardListPageContext = createContext<
  ContentRewardListPageContextType | undefined
>(undefined);

export const ContentRewardListPageProvider = ({
  children,
}: PropsWithChildren) => {
  const [contentCategoryId, setContentCategoryId] = useState<number | null>(
    null
  );

  return (
    <ContentRewardListPageContext.Provider
      value={{ contentCategoryId, setContentCategoryId }}
    >
      {children}
    </ContentRewardListPageContext.Provider>
  );
};

export const useContentRewardListPage = () => {
  const context = useContext(ContentRewardListPageContext);
  if (!context) throw new Error("Invalid ContentRewardListPageContext");

  return context;
};
