import { useQuery } from "@apollo/client";
import { MinimumWageDocument } from "~/core/graphql/generated";

export const Page = () => {
  const { data, error, loading } = useQuery(MinimumWageDocument);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return <>현 최저 시급: {data.minimumWage.amount}</>;
};
