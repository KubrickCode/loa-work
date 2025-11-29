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
});
