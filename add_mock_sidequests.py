#!/usr/bin/env python3
"""
Add mock side quest issues to local issues.json for testing
"""

import json
from datetime import datetime

# Side quest mock data
mock_side_quests = [
    # The Forgotten Women
    {"number": 100, "title": "Side Quest: Adele Goldberg's Smalltalk Legacy", "state": "open", "labels": [{"name": "side-quest"}, {"name": "forgotten-women"}]},
    {"number": 101, "title": "Side Quest: Barbara Liskov's Substitution Principle", "state": "open", "labels": [{"name": "side-quest"}, {"name": "forgotten-women"}]},
    {"number": 102, "title": "Side Quest: Radia Perlman's Spanning Tree", "state": "open", "labels": [{"name": "side-quest"}, {"name": "forgotten-women"}]},
    {"number": 103, "title": "Side Quest: Mary Ann Horton's Berkeley Unix", "state": "open", "labels": [{"name": "side-quest"}, {"name": "forgotten-women"}]},
    {"number": 104, "title": "Side Quest: Frances Allen's Compiler Optimizations", "state": "open", "labels": [{"name": "side-quest"}, {"name": "forgotten-women"}]},
    {"number": 105, "title": "Side Quest: Lynn Conway's VLSI Revolution", "state": "open", "labels": [{"name": "side-quest"}, {"name": "forgotten-women"}]},
    
    # The Eastern Masters
    {"number": 106, "title": "Side Quest: Yukihiro Matsumoto's Ruby Graphics", "state": "open", "labels": [{"name": "side-quest"}, {"name": "eastern-masters"}]},
    {"number": 107, "title": "Side Quest: Shigeru Miyamoto's Design Philosophy", "state": "open", "labels": [{"name": "side-quest"}, {"name": "eastern-masters"}]},
    {"number": 108, "title": "Side Quest: Hideo Kojima's Cinematic Rendering", "state": "open", "labels": [{"name": "side-quest"}, {"name": "eastern-masters"}]},
    {"number": 109, "title": "Side Quest: Kazunori Yamauchi's Photorealism", "state": "open", "labels": [{"name": "side-quest"}, {"name": "eastern-masters"}]},
    {"number": 110, "title": "Side Quest: Hironobu Sakaguchi's Particle Magic", "state": "open", "labels": [{"name": "side-quest"}, {"name": "eastern-masters"}]},
    {"number": 111, "title": "Side Quest: Yu Suzuki's Arcade Innovation", "state": "open", "labels": [{"name": "side-quest"}, {"name": "eastern-masters"}]},
    
    # The Open Source Heroes
    {"number": 112, "title": "Side Quest: Linus Torvalds' Kernel Graphics", "state": "open", "labels": [{"name": "side-quest"}, {"name": "open-source"}]},
    {"number": 113, "title": "Side Quest: John Carmack's Open Source Engines", "state": "open", "labels": [{"name": "side-quest"}, {"name": "open-source"}]},
    {"number": 114, "title": "Side Quest: Ton Roosendaal's Blender Revolution", "state": "open", "labels": [{"name": "side-quest"}, {"name": "open-source"}]},
    {"number": 115, "title": "Side Quest: Ian Murdock's Debian Graphics", "state": "open", "labels": [{"name": "side-quest"}, {"name": "open-source"}]},
    {"number": 116, "title": "Side Quest: Miguel de Icaza's Mono Rendering", "state": "open", "labels": [{"name": "side-quest"}, {"name": "open-source"}]},
    {"number": 117, "title": "Side Quest: Bram Cohen's Distributed Assets", "state": "open", "labels": [{"name": "side-quest"}, {"name": "open-source"}]},
]

# Add full issue structure
for quest in mock_side_quests:
    quest.update({
        "id": 3000000000 + quest["number"],
        "html_url": f"https://github.com/Studio-Dashosa/abstract-garden-video/issues/{quest['number']}",
        "user": {"login": "jdoash"},
        "created_at": datetime.now().isoformat() + "Z",
        "updated_at": datetime.now().isoformat() + "Z",
        "body": "Side quest content..."
    })

# Load existing issues
try:
    with open('docs/data/issues.json', 'r') as f:
        issues = json.load(f)
    print(f"Loaded {len(issues)} existing issues")
except:
    print("Could not load existing issues.json")
    issues = []

# Filter out any existing mock side quests
issues = [i for i in issues if i.get("number", 0) < 100]

# Add new mock side quests
issues.extend(mock_side_quests)

# Save updated file
with open('docs/data/issues.json', 'w') as f:
    json.dump(issues, f, indent=2)

print(f"✅ Added {len(mock_side_quests)} mock side quests")
print(f"📊 Total issues now: {len(issues)}")
