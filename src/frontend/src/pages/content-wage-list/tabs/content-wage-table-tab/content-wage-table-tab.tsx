import { Suspense, useState } from "react";
import { Loader } from "~/core/loader";
import { Section } from "~/core/section";
import { DialogTrigger } from "~/core/dialog";
import { GoldExchangeRateSettingDialog } from "./components/gold-exchange-rate-setting-dialog";
import { Button } from "~/chakra-components/ui/button";
import { IoIosCalculator, IoIosSettings } from "react-icons/io";
import { ItemStatUpdateToggleTip } from "~/shared/item";
import { Flex } from "@chakra-ui/react";
import { ContentWageListTable } from "./components/content-wage-list-table";
import { useAuth } from "~/core/auth";
import { ContentWageListPageProvider } from "../../content-wage-list-page-context";
import { ContentWageListFilters } from "../../components";
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
            <ItemStatUpdateToggleTip />
          </Flex>
          <ContentWageListTable setRefetchTable={setRefetchTable} />
        </ContentWageListPageProvider>
      </Suspense>
    </Section>
  );
};
