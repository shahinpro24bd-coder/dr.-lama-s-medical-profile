import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const OLD_DOCTOR = /Dina|Svinareva|dinasvinareva|Fatema|Mirza|Voronezh|Belgorod|Dhaka|Gazipur|Nihaia|Biadse|972532815272|blepharoplast|ophthalm|[Ѐ-ӿ]|[ঀ-৿]/i;

function files(dir: string, ext: RegExp): string[] {
  return readdirSync(resolve(dir), { recursive: true, withFileTypes: false })
    .map(String)
    .filter((f) => ext.test(f))
    .map((f) => resolve(dir, f));
}

describe("site belongs to Dr. Lama Ghassan", () => {
  it("contains no text, contact or media from the previous doctor", () => {
    const sources = [
      ...files("src/site", /\.html$/),
      ...files("public/js", /\.js$/),
      resolve("src/lib/site-content/fallback.generated.json"),
      resolve("src/lib/admin-store.ts"),
      resolve("src/routes/__root.tsx"),
      resolve("src/routes/index.tsx"),
    ];
    for (const file of sources) expect(readFileSync(file, "utf8"), file).not.toMatch(OLD_DOCTOR);
  });

  it("books through Dr. Lama's WhatsApp and the NHC clinic phone", () => {
    const home = readFileSync(resolve("src/site/index.html"), "utf8");
    expect(home).toContain("https://wa.me/96897745838");
    expect(home).toContain("tel:+96879922259");
    expect(home).toContain("https://www.instagram.com/dr.lama_gassan/");
  });
});
