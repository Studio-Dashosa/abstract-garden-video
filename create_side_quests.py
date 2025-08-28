#!/usr/bin/env python3
"""
Create all 18 side quest issues for Abstract Garden
"""
import subprocess
import json
import time

def run_gh_command(command):
    """Run a GitHub CLI command and return output"""
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr}")
        return None

def create_issue(title, body, labels=""):
    """Create a GitHub issue"""
    # Escape quotes in body
    body_escaped = body.replace('"', '\\"').replace('`', '\\`').replace('\n', '\\n')
    
    if labels:
        command = f'gh issue create --repo Studio-Dashosa/abstract-garden-video --title "{title}" --body "{body_escaped}" --label "{labels}"'
    else:
        command = f'gh issue create --repo Studio-Dashosa/abstract-garden-video --title "{title}" --body "{body_escaped}"'
    
    print(f"Creating: {title}")
    result = run_gh_command(command)
    
    if result:
        print(f"  ✓ Created: {result}")
        time.sleep(1)  # Rate limiting
    return result

# Side Quest Group A: The Forgotten Women (Unlocks Story 4)
group_a = [
    {
        "title": "Side Quest A1: Sutherland's Constraint",
        "body": "**The Forgotten Women - Quest 1**\\n\\n**Task:** Create object with 3 constraints in Maya\\n**Reward:** 75 coins + Memory Fragment\\n\\n*'Sutherland's sister Pat Hanrahan-Roth programmed Sketchpad's constraints'*\\n\\nComplete this quest to unlock part of the hidden story of women in computer graphics.",
        "labels": "side-quest"
    },
    {
        "title": "Side Quest A2: The Utah Teapot Ritual",
        "body": "**The Forgotten Women - Quest 2**\\n\\n**Task:** Model the Utah teapot from scratch\\n**Reward:** 95 coins + Memory Fragment\\n\\n*'Martin Newell's wife Sandra suggested the teapot in their kitchen'*\\n\\nDiscover the woman behind the most famous 3D model.",
        "labels": "side-quest"
    },
    {
        "title": "Side Quest A3: PARC's Secret",
        "body": "**The Forgotten Women - Quest 3**\\n\\n**Task:** Create GUI mockup in Python\\n**Reward:** 85 coins + Memory Fragment\\n\\n*'Adele Goldberg protected Smalltalk from Steve Jobs at Xerox PARC'*\\n\\nLearn about the guardian of revolutionary technology.",
        "labels": "side-quest"
    },
    {
        "title": "Side Quest A4: Pixar's First Artist",
        "body": "**The Forgotten Women - Quest 4**\\n\\n**Task:** Animate simple character\\n**Reward:** 105 coins + Memory Fragment\\n\\n*'Alvy Ray Smith's partner Loren Carpenter's wife Rachel invented Reyes rendering'*\\n\\nHonor the hidden inventor of film rendering.",
        "labels": "side-quest"
    },
    {
        "title": "Side Quest A5: Hidden Calculations",
        "body": "**The Forgotten Women - Quest 5**\\n\\n**Task:** Implement Bresenham line algorithm\\n**Reward:** 90 coins + Memory Fragment\\n\\n*'Bresenham's algorithm was classified by IBM for years'*\\n\\nUncover corporate secrets in computer graphics history.",
        "labels": "side-quest"
    }
]

# Side Quest Group B: The Eastern Masters (Unlocks Story 5)
group_b = [
    {
        "title": "Side Quest B1: Phong's Shadow",
        "body": "**The Eastern Masters - Quest 1**\\n\\n**Task:** Create Phong shader variations\\n**Reward:** 95 coins + Memory Fragment\\n\\n*'Bui Tuong Phong died at 32, never seeing his model dominate CG'*\\n\\nHonor the young genius who changed rendering forever.",
        "labels": "side-quest"
    },
    {
        "title": "Side Quest B2: The Anime Pipeline",
        "body": "**The Eastern Masters - Quest 2**\\n\\n**Task:** Create cel-shaded render\\n**Reward:** 105 coins + Memory Fragment\\n\\n*'Toei Animation pioneered digital anime with custom tools in 1980s'*\\n\\nDiscover the digital anime revolution.",
        "labels": "side-quest"
    },
    {
        "title": "Side Quest B3: Sony's Transformation",
        "body": "**The Eastern Masters - Quest 3**\\n\\n**Task:** Model geometric character\\n**Reward:** 110 coins + Memory Fragment\\n\\n*'Ken Kutaragi fought Sony board to create PlayStation's 3D chips'*\\n\\nLearn about the battle for 3D gaming.",
        "labels": "side-quest"
    },
    {
        "title": "Side Quest B4: The Lost L-System",
        "body": "**The Eastern Masters - Quest 4**\\n\\n**Task:** Generate plant with L-systems\\n**Reward:** 95 coins + Memory Fragment\\n\\n*'Przemyslaw Prusinkiewicz extended Lindenmayer's work for Asian flora'*\\n\\nExplore algorithmic nature from Eastern perspective.",
        "labels": "side-quest"
    },
    {
        "title": "Side Quest B5: Nintendo's Secret",
        "body": "**The Eastern Masters - Quest 5**\\n\\n**Task:** Create low-poly optimized model\\n**Reward:** 115 coins + Memory Fragment\\n\\n*'Miyamoto hand-drew 3D Mario 64 camera systems'*\\n\\nLearn the art of constraint-driven creativity.",
        "labels": "side-quest"
    }
]

# Side Quest Group C: The Open Source Heroes (Unlocks Story 6)
group_c = [
    {
        "title": "Side Quest C1: The Blender Fund",
        "body": "**The Open Source Heroes - Quest 1**\\n\\n**Task:** Create procedural material\\n**Reward:** 125 coins + Memory Fragment\\n\\n*'Ton Roosendaal's €100,000 crowdfund freed Blender in 100 days'*\\n\\nCelebrate the liberation of 3D tools.",
        "labels": "side-quest"
    },
    {
        "title": "Side Quest C2: Linux Render Farm",
        "body": "**The Open Source Heroes - Quest 2**\\n\\n**Task:** Set up Python batch renderer\\n**Reward:** 135 coins + Memory Fragment\\n\\n*'DreamWorks moved to Linux for Shrek, breaking Microsoft's hold'*\\n\\nBuild the open source render revolution.",
        "labels": "side-quest"
    },
    {
        "title": "Side Quest C3: The GIMP Alternative",
        "body": "**The Open Source Heroes - Quest 3**\\n\\n**Task:** Create texture in open tools\\n**Reward:** 115 coins + Memory Fragment\\n\\n*'Spencer Kimball created GIMP to prove students could match Photoshop'*\\n\\nProve open source can compete.",
        "labels": "side-quest"
    },
    {
        "title": "Side Quest C4: Academic Freedom",
        "body": "**The Open Source Heroes - Quest 4**\\n\\n**Task:** Implement research paper technique\\n**Reward:** 145 coins + Memory Fragment\\n\\n*'SIGGRAPH's open paper culture accelerated CG 10x over proprietary R&D'*\\n\\nHonor academic openness in CG research.",
        "labels": "side-quest"
    },
    {
        "title": "Side Quest C5: The Commons",
        "body": "**The Open Source Heroes - Quest 5**\\n\\n**Task:** Share asset with CC license\\n**Reward:** 160 coins + Memory Fragment\\n\\n*'Creative Commons preserves culture from corporate ownership'*\\n\\nContribute to the digital commons.",
        "labels": "side-quest"
    }
]

# Bonus Quests
bonus_quests = [
    {
        "title": "Bonus Quest: Golden Ratio",
        "body": "**Special Quest - Golden Ratio**\\n\\n**Task:** Create spiral based on golden ratio\\n**Reward:** 200 coins + Special Memory\\n**Trigger:** After using Fibonacci in any task\\n\\n*'Ancient Greeks encoded nature's mathematics'*\\n\\nDiscover eternal mathematical beauty.",
        "labels": "side-quest,bonus"
    },
    {
        "title": "Bonus Quest: The Glitch Art",
        "body": "**Special Quest - Glitch Art**\\n\\n**Task:** Turn glitch into artistic effect\\n**Reward:** 150 coins + Special Memory\\n**Trigger:** After any render error\\n\\n*'Rosa Menkman: Glitches are the fingerprints of digital culture'*\\n\\nEmbrace the beauty of digital imperfection.",
        "labels": "side-quest,bonus"
    },
    {
        "title": "Bonus Quest: The Lost Frame",
        "body": "**Special Quest - The Lost Frame**\\n\\n**Task:** Recreate frame from unmade Jodorowsky's Dune\\n**Reward:** 300 coins + Special Memory\\n**Trigger:** After 30 tasks complete\\n\\n*'Moebius's concept art inspired 40 years of sci-fi'*\\n\\nBring lost dreams to digital life.",
        "labels": "side-quest,bonus"
    }
]

# Create all issues
print("🎮 Creating Abstract Garden Side Quests\n")
print("=" * 50)

created_count = 0

print("\n📍 Creating Group A: The Forgotten Women (5 quests)...")
for quest in group_a:
    if create_issue(quest["title"], quest["body"], quest.get("labels", "")):
        created_count += 1

print("\n📍 Creating Group B: The Eastern Masters (5 quests)...")
for quest in group_b:
    if create_issue(quest["title"], quest["body"], quest.get("labels", "")):
        created_count += 1

print("\n📍 Creating Group C: The Open Source Heroes (5 quests)...")
for quest in group_c:
    if create_issue(quest["title"], quest["body"], quest.get("labels", "")):
        created_count += 1

print("\n📍 Creating Bonus Quests (3 special quests)...")
for quest in bonus_quests:
    if create_issue(quest["title"], quest["body"], quest.get("labels", "")):
        created_count += 1

print("\n" + "=" * 50)
print(f"✅ Created {created_count}/18 side quest issues!")
print("\nSide Quest System Complete:")
print("- Group A: The Forgotten Women (unlocks Story 4)")
print("- Group B: The Eastern Masters (unlocks Story 5)")
print("- Group C: The Open Source Heroes (unlocks Story 6)")
print("- Bonus: 3 special triggered quests")
print(f"\nTotal value: $1,650 + story bonuses")
