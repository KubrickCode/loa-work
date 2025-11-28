import { Image } from "@chakra-ui/react";

import { Section } from "~/components/section";
import { DataTable } from "~/components/table";
import { useSafeQuery } from "~/libs/graphql";
import { UserListTabQueryDocument } from "~/libs/graphql/generated";
import { formatDateTime } from "~/shared/format";

export const UserListTab = () => {
  const { data } = useSafeQuery(UserListTabQueryDocument);

  const imageSize = "24px";

  return (
    <Section>
      <DataTable
        columns={[
          {
            align: "center",
            header: "이미지",
            render({ data }) {
              return data.imageUrl ? (
                <Image display="inline" src={data.imageUrl} width={imageSize} />
              ) : null;
            },
            width: imageSize,
          },
          {
            header: "이름",
            render({ data }) {
              return <>{data.displayName}</>;
            },
          },
          {
            header: "이메일",
            render({ data }) {
              return <>{data.email}</>;
            },
          },
          {
            header: "플랫폼",
            render({ data }) {
              return <>{data.provider}</>;
            },
          },
          {
            header: "고유식별자",
            render({ data }) {
              return <>{data.refId}</>;
            },
          },
          {
            header: "생성일시",
            render({ data }) {
              return <>{formatDateTime(data.createdAt)}</>;
            },
            sortKey: "createdAt",
          },
        ]}
        rows={data.userList.map((user) => ({ data: user }))}
      />
    </Section>
  );
};
