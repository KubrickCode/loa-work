import { expect, test } from "@playwright/test";

test.describe("푸터 팝업", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("수집 현황 클릭 시 팝업이 표시됨", async ({ page }) => {
    await page.getByText("수집 현황").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/거래소 아이템/)).toBeVisible();
  });

  test("수집 현황 팝업에 업데이트 시간이 표시됨", async ({ page }) => {
    await page.getByText("수집 현황").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText(/경매장 아이템/)).toBeVisible();
  });

  test("수집 현황 팝업에 거래소/경매장 아이템 수집 시간이 모두 표시됨", async ({
    page,
  }) => {
    await page.getByText("수집 현황").click();

    const dialog = page.getByRole("dialog");

    // 거래소 아이템 수집 시간 확인 (YYYY-MM-DD HH:mm 형식)
    await expect(
      dialog.getByText(/거래소 아이템: \d{4}-\d{2}-\d{2} \d{2}:\d{2}/)
    ).toBeVisible();

    // 경매장 아이템 수집 시간 확인 (YYYY-MM-DD HH:mm 형식)
    await expect(
      dialog.getByText(/경매장 아이템: \d{4}-\d{2}-\d{2} \d{2}:\d{2}/)
    ).toBeVisible();
  });

  test("후원 안내 클릭 시 팝업이 표시됨", async ({ page }) => {
    await page.getByText("후원 안내").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
  });

  test("후원 안내 팝업에 후원 정보가 표시됨", async ({ page }) => {
    await page.getByText("후원 안내").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // 후원 계좌 정보 확인
    await expect(dialog.getByText(/후원 계좌.*농협/)).toBeVisible();

    // 후원 안내 문구 확인
    await expect(
      dialog.getByText("개발자의 개인 시간과 사비로 운영되고 있습니다.")
    ).toBeVisible();
    await expect(
      dialog.getByText("위와 같은 이유로 후원을 받고자 합니다. 감사합니다.")
    ).toBeVisible();
  });
});
