import { Page } from "~/core/page";
import { Section } from "~/core/section";
import { MarketItemListTable } from "./components/market-item-list-table";

export const ItemPriceListPage = () => {
  return (
    <Page>
      <Section>
        <MarketItemListTable />
      </Section>
    </Page>
  );
};
