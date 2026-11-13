import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import indexHtml from "../../site/index.html?raw";
import fallback from "./fallback.generated.json?raw";

const PAGES = ["index", "about", "service", "appoinment", "contact"];

describe("self-hosted media", () => {
  it("serves every image and video from the site itself so it works on any host", () => {
    expect(indexHtml).not.toMatch(/https:\/\/[^"']*__l5e\/assets-v1/);
    expect(fallback).not.toMatch(/__l5e\/assets-v1/);
  });

  it("ships every picture and video the pages reference", () => {
    for (const page of PAGES) {
      const html = readFileSync(resolve("src/site", `${page}.html`), "utf8");
      const files = html.match(/\/(?:img|reels)\/[A-Za-z0-9_./-]+\.(?:webp|png|jpe?g|mp4)/g) || [];
      for (const file of files) expect(existsSync(resolve("public", file.slice(1))), file).toBe(true);
    }
  });
});
