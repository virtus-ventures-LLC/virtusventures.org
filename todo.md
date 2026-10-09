# Virtus Ventures Site Build

- [x] Preserve the supplied logo artwork without redrawing, recoloring, or regenerating it.
- [x] Prepare web-safe logo and favicon files from the supplied raster artwork without altering its composition.
- [x] Record the canonical paper-based research-note design in `ideas.md`.
- [x] Implement the shared masthead, navigation, two-column annotation grid, and compliance footer.
- [x] Implement the home, thesis, founders, funds, about, shop, and contact routes.
- [x] Keep all copy free of invented statistics, clients, portfolio companies, credentials, and testimonials.
- [x] Add the supplied team entries and retain `Bio pending.` exactly.
- [x] Keep `SHOP_URL`, `WEB3FORMS_KEY`, and `CONTACT_EMAIL` as explicit launch placeholders.
- [x] Verify contrast, visible focus, line length, responsive behavior, and horizontal overflow at 360px, 768px, and 1440px.
- [x] Verify there are no prohibited images, icons, colors, gradients, shadows, animations, or em dashes.
- [x] Verify the compliance paragraph is present and legible on every route.
- [x] Save one final checkpoint and deliver the project.

## Editing pass from live-site review

- [x] Leave the existing masthead asset and designation unchanged at the owner's direction.
- [x] Record the home-page word count before and after the cuts.
- [x] Reduce the home page to 700 to 800 words by deleting repetition rather than rewriting.
- [x] Remove repeated statements across the remaining six pages while preserving the existing voice and sentence structure.
- [x] Ensure the home and thesis pages share no complete prose sentences.
- [x] Enumerate the four institutional relationship categories in full only once, on the home page.
- [x] Record every sentence removed specifically as repetition for owner review.
- [x] Recheck the connected Shopify store for the real Supporter Hoodie price and public product URL.
- [x] Replace the former `SHOP_URL` placeholder with the connected Shopify product and storefront paths.
- [x] Rebuild the shop page as a candid short note followed by a one-product bordered table and a single storefront link.
- [x] Confirm that no product image, icon, grid, card, badge, rating, selector, or cart appears on the shop page.
- [x] Remove the light-ground-logo verification from this editing pass at the owner's direction.
- [x] Re-run the production build, content audits, and responsive screenshot checks before saving a new checkpoint.
- [x] Save the final editing-pass checkpoint and report the storefront password-protection limitation.

## Shopify dead-link correction

- [x] Audit the repository for the dead `virtusventr-6cmt3e4k-star-harbor-bqsne7xr.myshopify.com` domain and all other Shopify links.
- [x] Verify the active connected Shopify store and Supporter Hoodie product record.
- [x] Establish a publicly reachable product or checkout path that does not use the dead storefront domain.
- [x] Replace stale Shopify links without changing the shop page's editorial design.
- [x] Add an automated regression test for the Supporter Hoodie URL or checkout path.
- [x] Allow orders for all seven zero-inventory variants so checkout does not report them as sold out.
- [x] Verify the corrected size-specific checkout path in the browser and save a new checkpoint for auto-publication.

## Correct Shopify store binding

- [x] Verify connector UUID `8b81dcd8-d524-48ff-8360-7065e3088f57` targets `virtusventr-6cmt3e4k-star-harbor.myshopify.com`.
- [x] Audit the current project environment and integration metadata for references to the mistakenly provisioned `virtusven-cgpbwcff-zephyr-phoenix-yh1rmjfh` store.
- [x] Retrieve the real Supporter Hoodie product, variant IDs, prices, inventory policy, publication state, and public checkout route from the user's actual store.
- [x] Replace all checkout logic and tests that reference variants from the mistakenly provisioned store.
- [x] Verify every advertised hoodie size reaches the user's actual store and never the mistakenly provisioned store.
- [x] Publish the corrected binding and document the stale Hydrogen storefront redirect that the native cart links bypass.

## Attached revision request

- [x] Review `pasted_content_5.txt` and translate every requested change into concrete, verifiable implementation tasks.
- [x] Rebuild only the contact-page intake form with the supplied Web3Forms access key, JSON `fetch`, no navigation, and a hidden keyboard-inaccessible `botcheck` honeypot.
- [x] Implement required name, email, audience, and message fields plus optional organization, with inline field-specific validation.
- [x] Update the message prompt and email subject whenever the native audience selector changes.
- [x] Apply the specified paper-ground, bottom-rule form treatment without changing the site's palette, typefaces, masthead layout, or other pages.
- [x] Replace the form with the specified two-paragraph success message and provide the plain email fallback on submission failure.
- [x] Use the light-ground 34px masthead logo on the contact page only if the exact supplied asset is available; the exact asset is absent, so the existing 34px supplied lockup remains unchanged.
- [x] Obtain confirmation immediately before sending a real Web3Forms test entry, then verify the response without allowing a reload or redirect.
- [x] Confirm the authorized `Virtus enquiry: Something else` test message arrived in the configured inbox; the API returned HTTP 200 with `success: true`, the page showed the in-place success copy, and the owner confirmed receipt.
- [x] Verify keyboard focus, inline errors, dynamic audience behavior, hidden honeypot behavior, and 360px horizontal fit.
- [x] Implement all requested changes without regressing the existing seven-page editorial design or the verified real-store hoodie checkout.
- [x] Run the production build, 12 automated tests, targeted responsive checks, and the authorized Web3Forms live-service verification.
- [x] Save and auto-publish the completed revision checkpoint.

## Team biography email update

- [x] Confirm Yuri Andrews, Connor Klemann, and Sulameta Cheban as the three published team records in `/data/team.json`.
- [x] Add `yuri.andrews@virtusventures.org` beneath Yuri Andrews's biography.
- [x] Add `connor.klemann@virtusventures.org` beneath Connor Klemann's biography.
- [x] Add `sulameta.cheban@virtusventures.org` beneath Sulameta Cheban's biography.
- [x] Render all three addresses as accessible email links without changing the About-page structure or visual system.
- [x] Add regression coverage for all three data records and rendered email links.
- [x] Verify the About page at desktop and 360px widths, then save and auto-publish the update.

## CEO email action revision

- [x] Confirm the project was restored to the requested `f85f7c2d` baseline.
- [x] Remove the standalone Yuri Andrews email line from the Contact page introduction.
- [x] Add an `Email me` mailto action beside the form's `Send` submission control.
- [x] Preserve all three biography-adjacent emails on the About page, including Yuri Andrews's address.
- [x] Add or update regression coverage for the Contact and About page email placement.
- [x] Verify the Contact and About pages at desktop and 360px widths, then save and auto-publish the revision.

## Production publication correction

- [x] Audit the custom and managed production domains for checkpoint `273956db` Contact and About changes.
- [x] Identify deployment propagation as the cause of the temporarily stale live site; both domains now serve the requested revision without a code correction.
- [x] Confirm the live Contact page shows `Email me` beside `Send` and no standalone CEO email line.
- [x] Verify the live About page retains all three biography-adjacent email links.
- [x] Confirm the final production state directly on `virtusventures.org` before reporting completion.

## Team biography placeholder removal

- [x] Remove the visible `Bio pending.` placeholder from all three About-page team entries.
- [x] Preserve every team name, role, email link, and all other page content and styling.
- [x] Diagnose the first production propagation timeout; checkpoint `89c855c0` is correct while the live domains remain on the prior asset hashes.
- [ ] Add regression coverage, run the full validation suite, verify the About page responsively, and publish one checkpoint.
