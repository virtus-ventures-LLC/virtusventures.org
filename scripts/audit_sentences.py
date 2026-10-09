from pathlib import Path
import json
import re

from bs4 import BeautifulSoup


CLIENT = Path(__file__).resolve().parents[1] / "client"
PAGES = [
    "index.html",
    "thesis.html",
    "founders.html",
    "funds.html",
    "about.html",
    "shop.html",
    "contact.html",
]


def sentences_for(page: str) -> list[str]:
    soup = BeautifulSoup((CLIENT / page).read_text(), "html.parser")
    main = soup.find("main")
    if main is None:
        return []
    text = " ".join(main.stripped_strings)
    sentences = re.split(r"(?<=[.!?])\s+", text)
    return [re.sub(r"\s+", " ", item).strip() for item in sentences if len(item.strip()) >= 25]


by_page = {page: sentences_for(page) for page in PAGES}
home_thesis = sorted(set(by_page["index.html"]) & set(by_page["thesis.html"]))

occurrences: dict[str, list[str]] = {}
for page, sentences in by_page.items():
    for sentence in set(sentences):
        occurrences.setdefault(sentence, []).append(page)

cross_page = {
    sentence: pages
    for sentence, pages in occurrences.items()
    if len(pages) > 1
}

result = {
    "home_thesis_shared_sentences": home_thesis,
    "cross_page_shared_sentences": cross_page,
}

output = Path(__file__).resolve().parents[1] / "sentence-audit.json"
output.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n")
print(json.dumps(result, indent=2, ensure_ascii=False))
