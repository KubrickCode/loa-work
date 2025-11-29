import { expect, test } from "@playwright/test";

test.describe("시급 계산기 다이얼로그", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("table tbody tr").first().waitFor();
  });

  test("시급 계산기 버튼 클릭 시 다이얼로그가 열림", async ({ page }) => {
    await page.getByRole("button", { name: "시급 계산기" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "컨텐츠 시급 계산기" })
    ).toBeVisible();
  });

  test("소요시간 입력 필드가 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "시급 계산기" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("spinbutton", { name: "분" })).toBeVisible();
    await expect(dialog.getByRole("spinbutton", { name: "초" })).toBeVisible();
  });

  test("보상 입력 필드가 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "시급 계산기" }).click();

    const dialog = page.getByRole("dialog");
    const expectedFields = [
      "골드",
      "운명의 파편",
      "운명의 돌파석",
      "운명의 파괴석",
      "운명의 수호석",
      "1레벨 보석",
      "용암의 숨결",
      "빙하의 숨결",
      "실링",
      "카드 경험치",
    ];

    for (const field of expectedFields) {
      await expect(
        dialog.getByRole("spinbutton", { name: field })
      ).toBeVisible();
    }
  });

  test("계산 및 닫기 버튼이 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "시급 계산기" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("button", { name: "계산" })).toBeVisible();
    await expect(dialog.getByRole("button", { name: "닫기" })).toBeVisible();
  });

  test("닫기 버튼 클릭 시 다이얼로그가 닫힘", async ({ page }) => {
    await page.getByRole("button", { name: "시급 계산기" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "닫기" }).click();
    await expect(dialog).not.toBeVisible();
  });

  test("골드 입력 시 시급 계산 결과가 정확함", async ({ page }) => {
    await page.getByRole("button", { name: "시급 계산기" }).click();

    const dialog = page.getByRole("dialog");

    // 10분, 1000 골드 입력
    await dialog.getByRole("spinbutton", { name: "분" }).fill("10");
    await dialog.getByRole("spinbutton", { name: "골드" }).fill("1000");

    // 계산 버튼 클릭
    await dialog.getByRole("button", { name: "계산" }).click();

    // 계산 결과 확인: 10분에 1000골드 → 시간당 6000골드
    // 환율 100:50 → 6000 × 0.5 = 3000원
    await expect(dialog.getByText("계산 결과:")).toBeVisible();
    await expect(dialog.getByText("₩3,000")).toBeVisible();
    await expect(dialog.getByText("6,000")).toBeVisible();
  });

  test("여러 보상 입력 시 시급 계산 결과가 정확함", async ({ page }) => {
    await page.getByRole("button", { name: "시급 계산기" }).click();

    const dialog = page.getByRole("dialog");

    // 5분, 500 골드, 100 운명의 파편 입력
    await dialog.getByRole("spinbutton", { name: "분" }).fill("5");
    await dialog.getByRole("spinbutton", { name: "골드" }).fill("500");
    await dialog.getByRole("spinbutton", { name: "운명의 파편" }).fill("100");

    // 계산 버튼 클릭
    await dialog.getByRole("button", { name: "계산" }).click();

    // 계산 결과가 표시됨
    await expect(dialog.getByText("계산 결과:")).toBeVisible();
    await expect(dialog.getByText("시급(원):")).toBeVisible();
    await expect(dialog.getByText("시급(골드):")).toBeVisible();
    await expect(dialog.getByText("1수당 골드:")).toBeVisible();
  });

  test("계산 완료 시 토스트 메시지가 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "시급 계산기" }).click();

    const dialog = page.getByRole("dialog");
    await dialog.getByRole("spinbutton", { name: "분" }).fill("10");
    await dialog.getByRole("spinbutton", { name: "골드" }).fill("1000");
    await dialog.getByRole("button", { name: "계산" }).click();

    await expect(page.getByText("계산이 완료되었습니다.")).toBeVisible();
  });

  test("소요시간 0분 0초 입력 시 에러 메시지가 표시됨", async ({ page }) => {
    await page.getByRole("button", { name: "시급 계산기" }).click();

    const dialog = page.getByRole("dialog");

    // 기본값 0분 0초인 상태에서 계산
    await dialog.getByRole("button", { name: "계산" }).click();

    // 에러 메시지 확인
    await expect(
      dialog.getByText("총 소요 시간은 0분 0초보다 커야 합니다.")
    ).toBeVisible();
  });
});
