import { Suspense } from "react";
import { Loader } from "~/core/loader";
import { Section } from "~/core/section";
import { ContentWageListTableProvider } from "./components/content-wage-list-table-context";
import { ContentWageListTableFilters } from "./components/content-wage-list-table-filters";
import { DialogTrigger } from "~/core/dialog";
import { GoldExchangeRateSettingDialog } from "./components/gold-exchange-rate-setting-dialog";
import { Button } from "~/chakra-components/ui/button";
import { IoIosSettings } from "react-icons/io";
import { ItemStatUpdateToggleTip } from "~/shared/item";
import { Flex } from "@chakra-ui/react";
import { ContentWageListTable } from "./components/content-wage-list-table";
import { useAuth } from "~/core/auth";

export const ContentWageTableTab = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Section>
      <Suspense fallback={<Loader.TableSkeleton line={30} />}>
        <ContentWageListTableProvider>
          <Flex alignItems="center" gap={2}>
            <ContentWageListTableFilters />
            {isAuthenticated && (
              <DialogTrigger
                dialog={<GoldExchangeRateSettingDialog />}
                trigger={
                  <Button size="sm" variant="outline">
                    <IoIosSettings /> 골드 환율 설정
                  </Button>
                }
              />
            )}
            <ItemStatUpdateToggleTip />
          </Flex>
          <ContentWageListTable />
        </ContentWageListTableProvider>
      </Suspense>
    </Section>
  );
};
