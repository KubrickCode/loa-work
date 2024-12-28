import { Suspense, useState } from "react";
import { Loader } from "~/core/loader";
import { Section } from "~/core/section";
import { ContentWageListTableFilters } from "./components/content-wage-list-table-filters";
import { DialogTrigger } from "~/core/dialog";
import { GoldExchangeRateSettingDialog } from "./components/gold-exchange-rate-setting-dialog";
import { Button } from "~/chakra-components/ui/button";
import { IoIosSettings } from "react-icons/io";
import { ItemStatUpdateToggleTip } from "~/shared/item";
import { Flex } from "@chakra-ui/react";
import { ContentWageListTable } from "./components/content-wage-list-table";
import { useAuth } from "~/core/auth";
import { ContentWageListPageProvider } from "../../content-wage-list-page-context";

export const ContentWageTableTab = () => {
  const { isAuthenticated } = useAuth();
  const [refetchTable, setRefetchTable] = useState<() => void>(() => {});

  return (
    <Section>
      <Suspense fallback={<Loader.TableSkeleton line={30} />}>
        <ContentWageListPageProvider>
          <Flex alignItems="center" gap={2}>
            <ContentWageListTableFilters />
            {isAuthenticated && (
              <DialogTrigger
                dialog={
                  <GoldExchangeRateSettingDialog onComplete={refetchTable} />
                }
                trigger={
                  <Button size="sm" variant="outline">
                    <IoIosSettings /> 골드 환율 설정
                  </Button>
                }
              />
            )}
            <ItemStatUpdateToggleTip />
          </Flex>
          <ContentWageListTable setRefetchTable={setRefetchTable} />
        </ContentWageListPageProvider>
      </Suspense>
    </Section>
  );
};
