import { Flex } from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { IoIosCalculator, IoIosSettings } from "react-icons/io";

import { Button } from "~/chakra-components/ui/button";
import { useAuth } from "~/core/auth";
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
      <Suspense fallback={<Loader.TableSkeleton line={30} />}>
        <ContentWageListPageProvider>
          <Flex alignItems="center" gap={2} wrap="wrap">
            <ContentWageListFilters />
            {isAuthenticated && (
              <DialogTrigger
                dialog={
                  <GoldExchangeRateSettingDialog onComplete={refetchTable} />
                }
                trigger={
                  <Button size="xs" variant="outline">
                    <IoIosSettings /> 골드 환율 설정
                  </Button>
                }
              />
            )}
            <DialogTrigger
              dialog={<CustomContentWageCalculateDialog />}
              trigger={
                <Button size="xs" variant="outline">
                  <IoIosCalculator />
                  시급 계산기
                </Button>
              }
            />
          </Flex>
          <ContentWageListTable setRefetchTable={setRefetchTable} />
        </ContentWageListPageProvider>
      </Suspense>
    </Section>
  );
};
