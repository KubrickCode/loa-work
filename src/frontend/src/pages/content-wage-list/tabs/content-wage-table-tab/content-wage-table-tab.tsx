import { Badge, Flex } from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoIosCalculator, IoIosSettings } from "react-icons/io";

import { useAuth } from "~/core/auth";
import { Button } from "~/core/chakra-components/ui/button";
import { Dialog } from "~/core/dialog";
import { useSafeQuery } from "~/core/graphql";
import { ContentWageTableTabDocument } from "~/core/graphql/generated";
import { TableSkeleton } from "~/core/loader";
import { Section } from "~/core/section";

import { ContentWageListTable } from "./components/content-wage-list-table";
import { GoldExchangeRateSettingDialog } from "./components/gold-exchange-rate-setting-dialog";
import { ContentWageListFilters } from "../../components";
import { ContentWageListPageProvider } from "../../content-wage-list-page-context";
import { CustomContentWageCalculateDialog } from "./components/custom-content-wage-calculate-dialog";

export const ContentWageTableTab = () => {
  const { isAuthenticated } = useAuth();
  const [refetchTable, setRefetchTable] = useState<() => void>(() => {});
  const { data, refetch } = useSafeQuery(ContentWageTableTabDocument);
  const { goldAmount, krwAmount } = data.goldExchangeRate;

  return (
    <Section>
      <ContentWageListPageProvider>
        <Flex alignItems="center" gap={2} wrap="wrap">
          <ContentWageListFilters />
          {isAuthenticated && (
            <Dialog.Trigger
              dialog={GoldExchangeRateSettingDialog}
              dialogProps={{
                onComplete: () => {
                  refetch();
                  refetchTable();
                },
              }}
            >
              <Button size="xs" variant="outline">
                <IoIosSettings /> 골드 환율 설정
              </Button>
            </Dialog.Trigger>
          )}
          <Dialog.Trigger dialog={CustomContentWageCalculateDialog}>
            <Button size="xs" variant="outline">
              <IoIosCalculator />
              시급 계산기
            </Button>
          </Dialog.Trigger>
          <Badge fontSize="xs" size="lg" variant="subtle">
            <FaInfoCircle />
            현재 골드 환율 - {goldAmount}:{krwAmount}
          </Badge>
        </Flex>
        <Suspense fallback={<TableSkeleton line={30} />}>
          <ContentWageListTable setRefetchTable={setRefetchTable} />
        </Suspense>
      </ContentWageListPageProvider>
    </Section>
  );
};
