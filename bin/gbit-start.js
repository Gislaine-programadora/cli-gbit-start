#!/usr/bin/env node

import banner from "../lib/banner.js";
import startProject from "../lib/start.js";

async function main() {
  banner();
  await startProject();
}

main();
