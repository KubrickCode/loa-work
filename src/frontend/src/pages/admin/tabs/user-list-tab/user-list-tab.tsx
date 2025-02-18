import { Image } from "@chakra-ui/react";

import { useSafeQuery } from "~/core/graphql";
import { UserListTabQueryDocument } from "~/core/graphql/generated";
import { Section } from "~/core/section";
import { DataTable } from "~/core/table";

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
            header: "플랫폼",
            render({ data }) {
              return <>{data.provider}</>;
            },
          },
        ]}
        rows={data.userList.map((user) => ({ data: user }))}
      />
    </Section>
  );
};
