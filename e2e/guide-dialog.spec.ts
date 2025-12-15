import { expect, test } from "@playwright/test";

test.describe("설명서 다이얼로그", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("설명서 버튼 클릭 시 다이얼로그가 열림", async ({ page }) => {
    await page.getByRole("button", { name: "설명서" }).click();

    const dialog = page.getByRole("dialog", { name: "설명서" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "설명서" })).toBeVisible();
  });

  test("아코디언 항목이 모두 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "설명서" }).click();

    const dialog = page.getByRole("dialog", { name: "설명서" });
    const expectedItems = [
      "각종 문의 사항",
      "데이터 수집 방식",
      "아이템 가격 계산 방식",
      "컨텐츠별 보상 책정 방식",
      "시급 책정 방식",
    ];

    for (const item of expectedItems) {
      await expect(dialog.getByRole("button", { name: item })).toBeVisible();
    }
  });

  test("아코디언 클릭 시 내용이 펼쳐짐", async ({ page }) => {
    await page.getByRole("button", { name: "설명서" }).click();

    const dialog = page.getByRole("dialog", { name: "설명서" });
    const accordionButton = dialog.getByRole("button", {
      name: "데이터 수집 방식",
    });

    // 초기 상태: 닫힘
    await expect(accordionButton).not.toHaveAttribute("aria-expanded", "true");

    // 클릭하여 펼침
    await accordionButton.click();

    // 펼쳐진 상태 확인
    await expect(accordionButton).toHaveAttribute("aria-expanded", "true");
    await expect(
      dialog.getByRole("region", { name: "데이터 수집 방식" })
    ).toBeVisible();
  });

  test("다이얼로그 닫고 다시 열면 아코디언 상태가 초기화됨", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "설명서" }).click();

    const dialog = page.getByRole("dialog", { name: "설명서" });
    const accordionButton = dialog.getByRole("button", {
      name: "데이터 수집 방식",
    });

    // 아코디언 펼침
    await accordionButton.click();
    await expect(accordionButton).toHaveAttribute("aria-expanded", "true");

    // 다이얼로그 닫기
    await dialog.getByRole("button", { name: "Close" }).click();
    await expect(dialog).not.toBeVisible();

    // 다시 열기
    await page.getByRole("button", { name: "설명서" }).click();
    await expect(dialog).toBeVisible();

    // 아코디언 상태 초기화 확인
    const accordionButtonReopened = dialog.getByRole("button", {
      name: "데이터 수집 방식",
    });
    await expect(accordionButtonReopened).not.toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });
});
