import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  getSupporterHoodieCheckoutUrl,
  getSupporterHoodieVariantId,
  SUPPORTER_HOODIE_STORE_DOMAIN,
  SUPPORTER_HOODIE_VARIANTS,
} from "./supporterHoodie";

describe("Supporter Hoodie checkout links", () => {
  it("maps every advertised size to a real Shopify variant", () => {
    expect(Object.keys(SUPPORTER_HOODIE_VARIANTS)).toEqual([
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL",
      "4XL",
    ]);
    expect(getSupporterHoodieVariantId("2xl")).toBe(
      "gid://shopify/ProductVariant/43425822867504"
    );
    expect(getSupporterHoodieVariantId("invalid")).toBeUndefined();
  });

  it("builds native cart permalinks for the user's actual Shopify store", () => {
    expect(SUPPORTER_HOODIE_STORE_DOMAIN).toBe(
      "virtusventr-6cmt3e4k-star-harbor-bqsne7xr.myshopify.com"
    );
    expect(getSupporterHoodieCheckoutUrl("L")).toBe(
      "https://virtusventr-6cmt3e4k-star-harbor-bqsne7xr.myshopify.com/cart/43425822801968:1?channel=online_store"
    );
  });

  it("keeps dead Shopify domains out of the shop page", () => {
    const shop = fs.readFileSync(
      path.resolve(import.meta.dirname, "../client/shop.html"),
      "utf8"
    );

    expect(shop).not.toContain("virtusventr-6cmt3e4k-star-harbor-bqsne7xr.myshopify.com");
    expect(shop).not.toContain(".myshopify.com");
    expect(shop.match(/\/api\/shopify\/supporter-hoodie\?size=/g)).toHaveLength(7);
  });

  it("does not reference the mistakenly provisioned store", () => {
    const source = fs.readFileSync(
      path.resolve(import.meta.dirname, "supporterHoodie.ts"),
      "utf8"
    );

    expect(source).not.toContain("virtusven-cgpbwcff-zephyr-phoenix-yh1rmjfh");
    expect(source).not.toContain("4829116");
  });
});
