import { expect, test } from "@playwright/test";

test.describe("관리자 페이지 접근 제어", () => {
  test("비로그인 사용자가 /admin 접근 시 홈으로 리다이렉트됨", async ({
    page,
  }) => {
    // 비로그인 상태로 admin 페이지 접근 시도
    await page.goto("/admin");

    // 홈 페이지로 리다이렉트됨
    await expect(page).toHaveURL("/");
  });
});

test.describe("일반 사용자 관리자 페이지 접근", () => {
  test("일반 로그인 사용자가 /admin 접근 시 홈으로 리다이렉트됨", async ({
    page,
  }) => {
    await page.goto("/admin");

    // 홈 페이지로 리다이렉트됨
    await expect(page).toHaveURL("/");
  });
});
