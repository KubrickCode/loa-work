import { Flex, Text } from "@chakra-ui/react";
import { Suspense } from "react";
import { IoIosCalculator, IoIosSettings } from "react-icons/io";

import { Button } from "~/components/chakra/ui/button";
import { Dialog } from "~/components/dialog";
import { TextLoader } from "~/components/loader";
import { LoginTooltip } from "~/components/tooltip";
import { useAuth } from "~/libs/auth";
import { client, useSafeQuery } from "~/libs/graphql";
import {
  ContentGroupWageListTableDocument,
  ContentWageListDocument,
  ContentWageListTableDocument,
} from "~/libs/graphql/generated";

import {
  ContentGroupWageListTable,
  ContentWageListFilters,
  ContentWageListTable,
  CustomContentWageCalculateDialog,
  GoldExchangeRateSettingDialog,
} from "./components";
import { ContentWageListPageProvider } from "./content-wage-list-page-context";

export const ContentWageList = () => {
  const { isAuthenticated } = useAuth();
  const { data, refetch } = useSafeQuery(ContentWageListDocument);
  const { goldAmount, krwAmount } = data.goldExchangeRate;

  return (
    <ContentWageListPageProvider>
      <Flex alignItems="center" gap={2} wrap="wrap">
        <ContentWageListFilters />
        <Dialog.Trigger
          dialog={GoldExchangeRateSettingDialog}
          dialogProps={{
            onComplete: () => {
              refetch();
              client.refetchQueries({
                include: [ContentWageListTableDocument, ContentGroupWageListTableDocument],
              });
            },
          }}
          disabled={!isAuthenticated}
        >
          <LoginTooltip>
            <Button disabled={!isAuthenticated} size="xs" variant="outline">
              <IoIosSettings /> 골드 환율 설정{" "}
              <Text fontWeight="extrabold">
                ({goldAmount}:{krwAmount})
              </Text>
            </Button>
          </LoginTooltip>
        </Dialog.Trigger>
        <Dialog.Trigger dialog={CustomContentWageCalculateDialog}>
          <Button size="xs" variant="outline">
            <IoIosCalculator />
            시급 계산기
          </Button>
        </Dialog.Trigger>
      </Flex>
      <Suspense fallback={<TextLoader />}>
        <ContentWageListTable />
        <ContentGroupWageListTable />
      </Suspense>
    </ContentWageListPageProvider>
  );
};
