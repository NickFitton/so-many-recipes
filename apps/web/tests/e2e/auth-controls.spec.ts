import { expect, test } from "@playwright/test"

test("signed-out users can see authentication controls", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByRole("link", { name: "Recipe App" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible()
  await expect(page.getByRole("link", { name: "Sign up" })).toBeVisible()
})
