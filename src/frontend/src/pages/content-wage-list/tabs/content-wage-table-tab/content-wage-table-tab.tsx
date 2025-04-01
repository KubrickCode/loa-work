import { Flex, Text } from "@chakra-ui/react";
import { Suspense } from "react";
import { IoIosCalculator, IoIosSettings } from "react-icons/io";

import { useAuth } from "~/core/auth";
import { Button } from "~/core/chakra-components/ui/button";
import { Dialog } from "~/core/dialog";
import { client, useSafeQuery } from "~/core/graphql";
import {
  ContentWageListTableDocument,
  ContentWageTableTabDocument,
} from "~/core/graphql/generated";
import { TableSkeleton } from "~/core/loader";
import { Section } from "~/core/section";
import { LoginTooltip } from "~/core/tooltip";

import { ContentWageListTable } from "./components/content-wage-list-table";
import { GoldExchangeRateSettingDialog } from "./components/gold-exchange-rate-setting-dialog";
import { ContentWageListFilters } from "../../components";
import { ContentWageListPageProvider } from "../../content-wage-list-page-context";
import { ContentGroupWageListTable } from "./components/content-group-wage-list-table";
import { CustomContentWageCalculateDialog } from "./components/custom-content-wage-calculate-dialog";

export const ContentWageTableTab = () => {
  const { isAuthenticated } = useAuth();
  const { data, refetch } = useSafeQuery(ContentWageTableTabDocument);
  const { goldAmount, krwAmount } = data.goldExchangeRate;

  return (
    <Section>
      <ContentWageListPageProvider>
        <Flex alignItems="center" gap={2} wrap="wrap">
          <ContentWageListFilters />
          <Dialog.Trigger
            dialog={GoldExchangeRateSettingDialog}
            dialogProps={{
              onComplete: () => {
                refetch();
                client.refetchQueries({
                  include: [ContentWageListTableDocument],
                });
              },
            }}
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
        <Suspense fallback={<TableSkeleton line={30} />}>
          <ContentWageListTable />
        </Suspense>
        <Suspense fallback={<TableSkeleton line={30} />}>
          <ContentGroupWageListTable />
        </Suspense>
      </ContentWageListPageProvider>
    </Section>
  );
};
