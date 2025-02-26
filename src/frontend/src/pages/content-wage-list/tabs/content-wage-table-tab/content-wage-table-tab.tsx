import { Flex } from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { IoIosCalculator, IoIosSettings } from "react-icons/io";

import { useAuth } from "~/core/auth";
import { Button } from "~/core/chakra-components/ui/button";
import { DialogTrigger } from "~/core/dialog";
import { Loader } from "~/core/loader";
import { Section } from "~/core/section";

import { ContentWageListTable } from "./components/content-wage-list-table";
import { GoldExchangeRateSettingDialog } from "./components/gold-exchange-rate-setting-dialog";
import { ContentWageListFilters } from "../../components";
import { ContentWageListPageProvider } from "../../content-wage-list-page-context";
import { CustomContentWageCalculateDialog } from "./components/custom-content-wage-calculate-dialog";

export const ContentWageTableTab = () => {
  const { isAuthenticated } = useAuth();
  const [refetchTable, setRefetchTable] = useState<() => void>(() => {});

  return (
    <Section>
      <ContentWageListPageProvider>
        <Flex alignItems="center" gap={2} wrap="wrap">
          <ContentWageListFilters />
          {isAuthenticated && (
            <DialogTrigger
              dialog={GoldExchangeRateSettingDialog}
              dialogProps={{
                onComplete: refetchTable,
              }}
            >
              <Button size="xs" variant="outline">
                <IoIosSettings /> 골드 환율 설정
              </Button>
            </DialogTrigger>
          )}
          <DialogTrigger dialog={CustomContentWageCalculateDialog}>
            <Button size="xs" variant="outline">
              <IoIosCalculator />
              시급 계산기
            </Button>
          </DialogTrigger>
        </Flex>
        <Suspense fallback={<Loader.TableSkeleton line={30} />}>
          <ContentWageListTable setRefetchTable={setRefetchTable} />
        </Suspense>
      </ContentWageListPageProvider>
    </Section>
  );
};
