import { createContext, PropsWithChildren, useContext, useState } from "react";

type ContentRewardListPageContextType = {
  contentCategoryId: number | null;
  keyword: string;
  setContentCategoryId: (id: number | null) => void;
  setKeyword: (keyword: string) => void;
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
  const [keyword, setKeyword] = useState("");

  return (
    <ContentRewardListPageContext.Provider
      value={{ contentCategoryId, keyword, setContentCategoryId, setKeyword }}
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
