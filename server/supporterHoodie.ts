import type { Express } from "express";

export const SUPPORTER_HOODIE_STORE_DOMAIN =
  "virtusventr-6cmt3e4k-star-harbor-bqsne7xr.myshopify.com";

export const SUPPORTER_HOODIE_VARIANTS = {
  S: "gid://shopify/ProductVariant/43425822736432",
  M: "gid://shopify/ProductVariant/43425822769200",
  L: "gid://shopify/ProductVariant/43425822801968",
  XL: "gid://shopify/ProductVariant/43425822834736",
  "2XL": "gid://shopify/ProductVariant/43425822867504",
  "3XL": "gid://shopify/ProductVariant/43425822900272",
  "4XL": "gid://shopify/ProductVariant/43425822933040",
} as const;

export type SupporterHoodieSize = keyof typeof SUPPORTER_HOODIE_VARIANTS;

export function getSupporterHoodieVariantId(size: string) {
  return SUPPORTER_HOODIE_VARIANTS[size.toUpperCase() as SupporterHoodieSize];
}

export function getSupporterHoodieCheckoutUrl(size: string) {
  const variantId = getSupporterHoodieVariantId(size);
  if (!variantId) return undefined;

  const numericVariantId = variantId.split("/").at(-1);
  return `https://${SUPPORTER_HOODIE_STORE_DOMAIN}/cart/${numericVariantId}:1?channel=online_store`;
}

export function registerSupporterHoodieCheckoutRoute(app: Express) {
  app.get("/api/shopify/supporter-hoodie", (req, res) => {
    const size = typeof req.query.size === "string" ? req.query.size : "";
    const checkoutUrl = getSupporterHoodieCheckoutUrl(size);

    if (!checkoutUrl) {
      res.status(400).send("Choose a valid Supporter Hoodie size.");
      return;
    }

    res.redirect(303, checkoutUrl);
  });
}
