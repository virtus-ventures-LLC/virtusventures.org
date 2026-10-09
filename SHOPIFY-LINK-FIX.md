# Shopify Link Fix

## Diagnosis

Connector UUID `8b81dcd8-d524-48ff-8360-7065e3088f57` contains the user's store account `virtusventr-6cmt3e4k-star-harbor`, whose canonical domain is `virtusventr-6cmt3e4k-star-harbor-bqsne7xr.myshopify.com`. The similarly named `virtusven-cgpbwcff-zephyr-phoenix-yh1rmjfh` store was provisioned separately by the project integration and is not the user's existing store.

The actual store contains one active product, **Unisex Basic 100% Cotton Hoodie**, product ID `gid://shopify/Product/8031291572272`, at **$75.00 USD**. It has seven available variants from S through 4XL. The product was published to the actual store's Online Store channel during this correction.

The actual store uses Shopify's Hydrogen Redirect Theme, which sends ordinary product-page traffic to the stale address `virtusventr-6cmt3e4k.manus.space`. That missing storefront, not the hoodie record, caused the reported 404.

## Implemented purchase path

The shop page links each size from S through 4XL to a same-site server route. That route validates the size and redirects to Shopify's native cart permalink for the corresponding variant in the user's actual store. This bypasses the stale Hydrogen storefront while retaining Shopify-hosted cart creation and checkout. No Shopify storefront domain is hard-coded in the shop page.

The route now uses the verified actual-store variant IDs beginning with `43425822736432` for size S and ending with `43425822933040` for size 4XL. The mistakenly provisioned store's product and variant IDs are no longer used by the implementation.

## Checkout verification

Browser verification of the actual store's size S cart permalink reached Shopify checkout with one **Unisex Basic 100% Cotton Hoodie**, variant **Black Beauty / S**, at **$75.00**. Credit card, Shop Pay, and PayPal payment options were present. No password prompt, sold-out state, or payment-disabled warning appeared.
