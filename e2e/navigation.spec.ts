import { expect, test } from "@playwright/test";

test.describe("네비게이션 링크", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("로고 클릭 시 홈으로 이동", async ({ page }) => {
    await page.goto("/content-reward-list");
    await page.getByRole("link", { name: "로직장 홈으로 이동" }).click();

    await expect(page).toHaveURL("/");
  });

  test("컨텐츠별 시급 버튼 클릭 시 홈으로 이동", async ({ page }) => {
    await page.goto("/content-reward-list");
    await page.getByRole("button", { name: "컨텐츠별 시급" }).click();

    await expect(page).toHaveURL("/");
  });

  test("컨텐츠별 보상 버튼 클릭 시 해당 페이지로 이동", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "컨텐츠별 보상" }).click();

    await expect(page).toHaveURL("/content-reward-list");
  });

  test("아이템 시세 버튼 클릭 시 해당 페이지로 이동", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "아이템 시세" }).click();

    await expect(page).toHaveURL("/item-price-list");
  });

  test("디스코드 링크가 외부 URL을 가리킴", async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();

    const discordLink = page.getByRole("link", { name: "디스코드" });
    await expect(discordLink).toHaveAttribute(
      "href",
      "https://discord.gg/kZApcdSEJ4"
    );
  });

  test("설명서 버튼 클릭 시 설명서 다이얼로그 표시", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "설명서" }).click();

    const dialog = page.getByRole("dialog", { name: "설명서" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "설명서" })).toBeVisible();

    // 아코디언 항목 확인
    await expect(
      dialog.getByRole("button", { name: "각종 문의 사항" })
    ).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "데이터 수집 방식" })
    ).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "아이템 가격 계산 방식" })
    ).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "컨텐츠별 보상 책정 방식" })
    ).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "시급 책정 방식" })
    ).toBeVisible();
  });

  test("설명서 다이얼로그 아코디언 클릭 시 내용 펼쳐짐", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "설명서" }).click();

    const dialog = page.getByRole("dialog", { name: "설명서" });

    // 아코디언 클릭
    await dialog.getByRole("button", { name: "각종 문의 사항" }).click();

    // 내용 확인
    const region = dialog.getByRole("region", { name: "각종 문의 사항" });
    await expect(region).toBeVisible();
    await expect(region.getByRole("link", { name: "디스코드 서버" })).toHaveAttribute(
      "href",
      "https://discord.gg/kZApcdSEJ4"
    );
  });

  test("설명서 다이얼로그 모든 아코디언 항목에 내용이 표시됨", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "설명서" }).click();

    const dialog = page.getByRole("dialog", { name: "설명서" });

    // 데이터 수집 방식
    await dialog.getByRole("button", { name: "데이터 수집 방식" }).click();
    const dataCollectionRegion = dialog.getByRole("region", {
      name: "데이터 수집 방식",
    });
    await expect(dataCollectionRegion).toBeVisible();
    await expect(dataCollectionRegion.getByRole("list")).toBeVisible();

    // 아이템 가격 계산 방식
    await dialog.getByRole("button", { name: "아이템 가격 계산 방식" }).click();
    const itemPriceRegion = dialog.getByRole("region", {
      name: "아이템 가격 계산 방식",
    });
    await expect(itemPriceRegion).toBeVisible();
    await expect(
      itemPriceRegion.getByRole("link", { name: "아이템 시세 페이지" })
    ).toHaveAttribute("href", "/item-price-list");

    // 컨텐츠별 보상 책정 방식
    await dialog.getByRole("button", { name: "컨텐츠별 보상 책정 방식" }).click();
    const rewardRegion = dialog.getByRole("region", {
      name: "컨텐츠별 보상 책정 방식",
    });
    await expect(rewardRegion).toBeVisible();
    await expect(
      rewardRegion.getByRole("link", { name: "컨텐츠별 보상 페이지" }).first()
    ).toHaveAttribute("href", "/content-reward-list");

    // 시급 책정 방식 (이전 아코디언 닫고 클릭)
    await dialog.getByRole("button", { name: "컨텐츠별 보상 책정 방식" }).click();
    await dialog.getByRole("button", { name: "시급 책정 방식" }).click();
    const wageRegion = dialog.getByRole("region", { name: "시급 책정 방식" });
    await expect(wageRegion).toBeVisible();
    await expect(wageRegion.getByRole("list")).toBeVisible();
  });
});
