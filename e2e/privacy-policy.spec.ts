import { expect, test } from "@playwright/test";

test.describe("개인정보처리방침 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/privacy-policy");
  });

  test("페이지가 정상적으로 로드됨", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: "Privacy Policy" })).toBeVisible();
  });

  test("모든 필수 섹션이 표시됨", async ({ page }) => {
    const requiredSections = [
      "Information Collection and Use",
      "Third Party Access",
      "Opt-Out Rights",
      "Data Retention Policy",
      "Children",
      "Security",
      "Changes",
      "Your Consent",
      "Contact Us",
    ];

    for (const section of requiredSections) {
      await expect(page.getByRole("heading", { level: 2, name: section })).toBeVisible();
    }
  });

  test("연락처 이메일 링크가 정상적으로 표시됨", async ({ page }) => {
    const emailLinks = page.getByRole("link", { name: "kubrickcode@gmail.com" });
    await expect(emailLinks.first()).toBeVisible();
    await expect(emailLinks.first()).toHaveAttribute("href", "mailto:kubrickcode@gmail.com");
  });

  test("Google Play Services 링크가 정상적으로 표시됨", async ({ page }) => {
    const googleLink = page.getByRole("link", { name: "Google Play Services" });
    await expect(googleLink).toBeVisible();
    await expect(googleLink).toHaveAttribute("href", "https://www.google.com/policies/privacy/");
  });
});
