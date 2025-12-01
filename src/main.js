#!/usr/bin/env node

/**
 * Trigger Brave Sync Externally (Node.js + Chrome DevTools Protocol)
 *
 * @author Jay Simons <j@yaa.bz> (https://yaa.bz)
 * @license MIT
 *
 * Requirements:
 *   pnpm install puppeteer-core
 *
 * Supports: macOS, Windows, Linux
 */

import puppeteer from "puppeteer-core";
import fs from "fs";
import os from "os";
import path from "path";

const REMOTE_DEBUG_PORT = 9222;

function getBravePath() {
  const platform = os.platform();

  const paths = {
    darwin: "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    win32: "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
    linux: [
      "/usr/bin/brave-browser",
      "/usr/bin/brave",
      "/snap/bin/brave",
      path.join(os.homedir(), ".local/bin/brave"),
    ],
  };

  if (platform === "linux") {
    for (const p of paths.linux) {
      if (fs.existsSync(p)) return p;
    }
    return paths.linux[0]; // fallback for error message
  }

  return paths[platform] || paths.linux[0];
}

function ensureBraveExists(browserPath) {
  if (!fs.existsSync(browserPath)) {
    console.error("Brave not found at:", browserPath);
    console.error("");
    console.error("Common locations:");
    console.error(
      "  macOS:   /Applications/Brave Browser.app/Contents/MacOS/Brave Browser"
    );
    console.error(
      "  Windows: C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
    );
    console.error("  Linux:   /usr/bin/brave-browser or /usr/bin/brave");
    process.exit(1);
  }
}

async function launchBraveWithDebugPort(browserPath) {
  return puppeteer.launch({
    executablePath: browserPath,
    headless: false,
    args: [
      `--remote-debugging-port=${REMOTE_DEBUG_PORT}`,
      `--no-first-run`,
      `--no-default-browser-check`,
    ],
  });
}

async function triggerSync() {
  const browserPath = getBravePath();
  ensureBraveExists(browserPath);

  console.debug(`Platform: ${os.platform()}`);
  console.debug(`Brave path: ${browserPath}`);
  console.info("Launching Brave…");

  const browser = await launchBraveWithDebugPort(browserPath);
  const page = await browser.newPage();

  console.info("Opening sync internals page…");
  await page.goto("brave://sync-internals/", {
    waitUntil: "networkidle0",
    timeout: 15000,
  });

  // Wait for the sync button
  await page.waitForSelector("#trigger-refresh", { timeout: 10000 });

  console.info("Triggering sync…");
  await page.click("#trigger-refresh");

  console.info("Sync triggered successfully.");

  // Give Brave a moment to process
  await new Promise((resolve) => setTimeout(resolve, 2000));

  await page.close();
  await browser.close();

  console.info("Done.");
}

triggerSync().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
