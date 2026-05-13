import { spawnSync } from "node:child_process";

const shouldSyncOnBuild = process.env.VERCEL === "1";

if (!shouldSyncOnBuild) {
  console.log("Skipping prisma migrate deploy outside Vercel build.");
  process.exit(0);
}

const result = spawnSync("npx", ["prisma", "migrate", "deploy"], {
  stdio: "inherit",
  shell: true,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
