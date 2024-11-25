import { useQuery } from "@apollo/client";
import { ContentRewardListPageDocument } from "~/core/graphql/generated";

export const ContentRewardListPage = () => {
  const { data, error, loading } = useQuery(ContentRewardListPageDocument);

  if (loading) return <>loading...</>;
  if (error) return <>{error.message}</>;
  if (!data) return null;

  console.log(data);

  return <>CRL PAGE</>;
};
