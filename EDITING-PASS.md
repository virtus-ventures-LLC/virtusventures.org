# Editing Pass Record

## Home-page word count

The prior home-page main content measured **1,100 words** using the repository acceptance-count command. The revised main content measures **709 words** after the deletion-only edit.

## Sentences removed as repetition or announcement

The following sentences were deleted without rewriting the sentences that remain:

1. “A fund sees a selection of the market, not the market itself.”
2. “The selection has been shaped by geography, prior employers, alumni networks, accelerator admissions, social fluency, and the willingness of other people to make introductions.”
3. “Each filter can carry signal.”
4. “Together, however, they can make familiarity look like quality and repeated exposure look like independent conviction.”
5. “That problem is especially visible in a corridor where technical work is distributed across research institutions, public agencies, defense and health systems, engineering employers, and small operating communities.”
6. “The people closest to a problem may not resemble the founders most practiced at being seen.”
7. “They may have spent years inside an institution, built a company after a military career, or arrived at entrepreneurship through a technical trade rather than a venture network.”
8. “None of that guarantees a good company.”
9. “It does mean that the usual paths into a fund can miss the person before evaluation even begins.”
10. “Introductions improve when they come with context.”
11. “This approach depends on continuity.”
12. “If a relationship appears only when someone needs capital, it is difficult to distinguish patient observation from a hurried search for a transaction.”
13. “Virtus intends to remain present through the periods when no financing is imminent, because those periods contain much of the information that later makes an introduction useful.”
14. “They show how a person works, what changes their mind, and whether the company is becoming more coherent as evidence arrives.”
15. “The same standard applies to funds.”
16. “Virtus Ventures was formed in 2026.”
17. “We do not have a long portfolio history, and this site does not imply one.”
18. “That position creates a useful discipline.”
19. “The absence of a long record is not a substitute for evidence, but neither should it be concealed behind the visual language of an older institution.”
20. “The immediate work is therefore modest in form and demanding in practice: maintain the relationships that make early discovery possible, listen for technical work that has not yet been translated into a venture narrative, and introduce people only when the connection has a clear reason to exist.”
21. “The full thesis explains why that method follows from the structure of the regional market.”
22. “The pages for founders and funds describe what each side should expect from us.”
23. “Virtus Ventures was formed in 2026, and we do not present ourselves as an older institution.”
24. “Virtus builds relationships with state economic development offices, university technology transfer and venture programs, veteran operator networks, and regional accelerator and workforce programs.”
25. “Virtus Ventures was formed in 2026.”
26. “We do not claim a long sourcing record, a portfolio, or outcomes the firm has not produced.”
27. “The gap is partly institutional.”
28. “Operators become known first to economic development offices, university technology transfer and venture programs, veteran communities, accelerators, workforce programs, customers, and technical peers.”
29. “Funds often search through a different set of relationships.”
30. “Virtus maintains contact across those boundaries so that a company can become visible with the context needed for a serious first conversation.”

The repeated four-institution table was also removed from the thesis so the full enumeration appears only on the home page.

## Cross-page sentence audit

The deterministic audit of all main-content prose found **no complete sentence shared between the home page and thesis page**, and **no complete sentence duplicated across any two of the seven pages** after the edit.

## Shopify product source

The shop page lists the user's real product from connector UUID `8b81dcd8-d524-48ff-8360-7065e3088f57`: **Unisex Basic 100% Cotton Hoodie**, product ID `gid://shopify/Product/8031291572272`, handle `unisex-basic-100-cotton-hoodie`, with seven variants from S through 4XL at **$75.00 USD**. The product is active and published to the actual store's Manus, Point of Sale, and Online Store channels. Every variant reports inventory policy `CONTINUE` and positive available inventory.

The site uses size-specific native cart permalinks on `virtusventr-6cmt3e4k-star-harbor-bqsne7xr.myshopify.com`. Browser verification confirmed that the site's size L route reaches Shopify checkout with the real **Black Beauty / L** variant at **$75.00**, with credit card, Shop Pay, and PayPal available.

## Final verification

The production build emitted all seven HTML documents, and the Vitest suite passed all seven active tests with one intentional skip. The live Shopify smoke test returned the Supporter Hoodie at $75.00 USD with seven variants and product media. Distinct-route checks confirmed that `index.html`, `shop.html`, and `about.html` render their own documents. Full-page screenshots at 1,440px and 360px confirmed that the edited layouts remain intact and that the one-row shop table fits without horizontal overflow.

The shop main content contains no product image, icon, grid, card, badge, rating, quantity selector, or cart interface. The only image retained on the page is the unchanged global Virtus masthead lockup, as directed when the logo task was withdrawn.
