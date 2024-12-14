import { Page } from "~/core/page";
import { ContentWageListTable } from "./components/content-wage-list-table";
import { Section } from "~/core/section";
import { ContentWageListTableProvider } from "./components/content-wage-list-table-context";
import { Suspense } from "react";
import { Loader } from "~/core/loader";
import { ContentWageListTableFilters } from "./components/content-wage-list-table-filters";
import { useAuth } from "~/core/auth";
import { DialogTrigger } from "~/core/dialog";
import { GoldExchangeRateSettingDialog } from "./components/gold-exchange-rate-setting-dialog";
import { IoIosSettings } from "react-icons/io";
import { Button } from "~/chakra-components/ui/button";
import { Flex } from "@chakra-ui/react";

export const ContentWageListPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Page>
      <Section>
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
          </Flex>
          <Suspense fallback={<Loader.TableSkeleton line={30} />}>
            <ContentWageListTable />
          </Suspense>
        </ContentWageListTableProvider>
      </Section>
    </Page>
  );
};
