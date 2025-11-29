import { test as setup } from "@playwright/test";

import { AUTH_FILE, BACKEND_URL } from "./constants";

setup("authenticate", async ({ request }) => {
  await request.post(`${BACKEND_URL}/auth/e2e-login`);
  await request.storageState({ path: AUTH_FILE });
});
