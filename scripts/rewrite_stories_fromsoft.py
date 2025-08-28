#!/usr/bin/env python3
"""
Rewrite stories in a FromSoftware-like, moody, elliptical tone.
- Input: docs/stories_raw.txt (paragraphs separated by blank lines)
- Output: docs/stories/stories_rewritten.json

Usage (from repo root):
  python3 scripts/rewrite_stories_fromsoft.py
"""
import json, os, re
from textwrap import shorten

RAW = os.path.join(os.path.dirname(__file__), '..', 'docs', 'stories_raw.txt')
OUT = os.path.join(os.path.dirname(__file__), '..', 'docs', 'stories', 'stories_rewritten.json')

TITLES = [
    "Ash in the Hollow",
    "The Lantern Daughter",
    "Prayer of Splinters",
    "Grave of the Unasked",
    "Witch’s Ledger",
    "Where Rivers Remember",
]

PROMPTS = [
    (r"(?i)fire|ash|ember", "They called it mercy when the elder burned the fields. Yet the ash drifted like tired snow, and in each flake a name."),
    (r"(?i)lantern|light|torch", "She wore a lantern where a locket should be. Its light did not chase the dark; it taught the dark how to listen."),
    (r"(?i)church|chapel|prayer|altar", "The chapel had no doors, only wind. We knelt anyway. The floor remembered forests and answered in splinters."),
    (r"(?i)grave|tomb|burial|stone", "There is a grave for questions never brave enough to become words. The caretaker is kind and will not look at you."),
    (r"(?i)witch|charm|hex|herb", "Her book balanced debts the world pretended not to owe. Names were weighed in breaths, deeds in silences."),
    (r"(?i)river|water|brook", "We thought water forgot. We were wrong. The river kept our reflections shelved like glassware and set the table."),
]

TEMPLATE_ENDINGS = [
    "Bring salt. Not for the earth. For your tongue.",
    "On the seventh crossing, she learned the road was not a path but a promise, and promises hunger.",
    "I bled my amen softly, that it might be believed.",
    "As if relieved to be seen.",
    "We drank what we had been, and left thirsty for what we might yet become.",
]

def chunk_paragraphs(text: str):
    blocks = [b.strip() for b in re.split(r"\n\s*\n+", text) if b.strip()]
    return blocks


def stylize(block: str) -> str:
    b = re.sub(r"\s+", " ", block).strip()
    # Make it more elliptical and somber.
    b = re.sub(r"\.", ".", b)
    # Light touch adjectives
    b = re.sub(r"(?i)\b(very|really|so|just)\b\s*", "", b)
    # Prefer concrete, sensory nouns; simple heuristic swaps
    b = b.replace("people", "folk").replace("children", "the small").replace("old", "elder")
    # Shorten and add a moody closing line
    b = shorten(b, width=420, placeholder="…")
    ending = TEMPLATE_ENDINGS[hash(b) % len(TEMPLATE_ENDINGS)]
    if not b.endswith(ending):
        b = f"{b} {ending}"
    return b


def pick_title(block: str, i: int) -> str:
    for pat, _ in PROMPTS:
        if re.search(pat, block):
            return TITLES[PROMPTS.index((pat, _))]
    return TITLES[i % len(TITLES)]


def main():
    if not os.path.exists(RAW):
        print(f"Missing input: {RAW}")
        return 1
    with open(RAW, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()
    blocks = chunk_paragraphs(text)
    items = []
    for i, b in enumerate(blocks[:6]):
        title = pick_title(b, i)
        body = stylize(b)
        items.append({"title": title, "text": body})
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(items, f, ensure_ascii=False, indent=2)
    print(f"Wrote {OUT} ({len(items)} stories)")

if __name__ == '__main__':
    raise SystemExit(main())
