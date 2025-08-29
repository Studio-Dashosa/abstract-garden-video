#!/usr/bin/env python3
"""
Create the REAL side quest issues from SIDE_QUESTS.md on GitHub
"""

import subprocess
import time

# REAL side quests from the project's SIDE_QUESTS.md
side_quests = [
    # Group A: The Light Pen Legacy (Unlocks Story 4: The Forgotten Women)
    {
        "title": "Side Quest A1: Sutherland's Constraint",
        "body": """**Hidden Quest Unlocked!**

Create object with 3 constraints in Maya

**Memory Fragment:**
"Sutherland's sister Pat Hanrahan-Roth programmed Sketchpad's constraints"

**Objectives:**
- Create a Maya scene with 3 constraint types
- Parent constraint, Aim constraint, Point constraint
- Document the constraint hierarchy

**Rewards:**
- $75 Portfolio Value
- Fragment: HIDDEN_SISTER
- Unlocks part of "The Forgotten Women" story

**Quest Type:** The Light Pen Legacy
**Difficulty:** ★★★☆☆""",
        "labels": ["side-quest", "forgotten-women", "light-pen-legacy"]
    },
    {
        "title": "Side Quest A2: The Utah Teapot Ritual",
        "body": """**Hidden Quest Unlocked!**

Model the Utah teapot from scratch

**Memory Fragment:**
"Martin Newell's wife Sandra suggested the teapot in their kitchen"

**Objectives:**
- Model the classic Utah teapot
- Match the original proportions
- Apply proper smoothing

**Rewards:**
- $95 Portfolio Value
- Fragment: SANDRA_TEAPOT
- Unlocks part of "The Forgotten Women" story

**Quest Type:** The Light Pen Legacy
**Difficulty:** ★★★★☆""",
        "labels": ["side-quest", "forgotten-women", "light-pen-legacy"]
    },
    {
        "title": "Side Quest A3: PARC's Secret",
        "body": """**Hidden Quest Unlocked!**

Create GUI mockup in Python

**Memory Fragment:**
"Adele Goldberg protected Smalltalk from Steve Jobs at Xerox PARC"

**Objectives:**
- Build a Python GUI with tkinter
- Implement drag and drop functionality
- Create window management system

**Rewards:**
- $85 Portfolio Value
- Fragment: GOLDBERG_GUARD
- Unlocks part of "The Forgotten Women" story

**Quest Type:** The Light Pen Legacy
**Difficulty:** ★★★★☆""",
        "labels": ["side-quest", "forgotten-women", "light-pen-legacy"]
    },
    {
        "title": "Side Quest A4: Pixar's First Artist",
        "body": """**Hidden Quest Unlocked!**

Animate simple character

**Memory Fragment:**
"Alvy Ray Smith's partner Loren Carpenter's wife Rachel invented Reyes rendering"

**Objectives:**
- Create basic character rig
- Animate walk cycle
- Apply Reyes-style micropolygon concept

**Rewards:**
- $105 Portfolio Value
- Fragment: RACHEL_REYES
- Unlocks part of "The Forgotten Women" story

**Quest Type:** The Light Pen Legacy
**Difficulty:** ★★★★★""",
        "labels": ["side-quest", "forgotten-women", "light-pen-legacy"]
    },
    {
        "title": "Side Quest A5: Hidden Calculations",
        "body": """**Hidden Quest Unlocked!**

Implement Bresenham line algorithm

**Memory Fragment:**
"Bresenham's algorithm was classified by IBM for years"

**Objectives:**
- Code Bresenham line algorithm in Python
- Visualize the algorithm steps
- Compare with DDA algorithm

**Rewards:**
- $90 Portfolio Value
- Fragment: IBM_SECRET
- Unlocks part of "The Forgotten Women" story

**Quest Type:** The Light Pen Legacy
**Difficulty:** ★★★☆☆""",
        "labels": ["side-quest", "forgotten-women", "light-pen-legacy"]
    },
    
    # Group B: Eastern Innovations (Unlocks Story 5: The Eastern Masters)
    {
        "title": "Side Quest B1: Phong's Shadow",
        "body": """**Hidden Quest Unlocked!**

Create Phong shader variations

**Memory Fragment:**
"Bui Tuong Phong died at 32, never seeing his model dominate CG"

**Objectives:**
- Implement Phong shading model
- Create Blinn-Phong variation
- Compare specular highlights

**Rewards:**
- $95 Portfolio Value
- Fragment: PHONG_LEGACY
- Unlocks part of "The Eastern Masters" story

**Quest Type:** Eastern Innovations
**Difficulty:** ★★★★☆""",
        "labels": ["side-quest", "eastern-masters", "eastern-innovations"]
    },
    {
        "title": "Side Quest B2: The Anime Pipeline",
        "body": """**Hidden Quest Unlocked!**

Create cel-shaded render

**Memory Fragment:**
"Toei Animation pioneered digital anime with custom tools in 1980s"

**Objectives:**
- Set up toon shader
- Create distinct shadow bands
- Add outline rendering

**Rewards:**
- $105 Portfolio Value
- Fragment: TOEI_DIGITAL
- Unlocks part of "The Eastern Masters" story

**Quest Type:** Eastern Innovations
**Difficulty:** ★★★★☆""",
        "labels": ["side-quest", "eastern-masters", "eastern-innovations"]
    },
    {
        "title": "Side Quest B3: Sony's Transformation",
        "body": """**Hidden Quest Unlocked!**

Model geometric character

**Memory Fragment:**
"Ken Kutaragi fought Sony board to create PlayStation's 3D chips"

**Objectives:**
- Create low-poly character model
- Optimize for real-time rendering
- Apply PS1-style texture mapping

**Rewards:**
- $110 Portfolio Value
- Fragment: KUTARAGI_FIGHT
- Unlocks part of "The Eastern Masters" story

**Quest Type:** Eastern Innovations
**Difficulty:** ★★★★★""",
        "labels": ["side-quest", "eastern-masters", "eastern-innovations"]
    },
    {
        "title": "Side Quest B4: The Lost L-System",
        "body": """**Hidden Quest Unlocked!**

Generate plant with L-systems

**Memory Fragment:**
"Przemyslaw Prusinkiewicz extended Lindenmayer's work for Asian flora"

**Objectives:**
- Implement L-system generator
- Create branching tree structure
- Add stochastic variations

**Rewards:**
- $95 Portfolio Value
- Fragment: BOTANICAL_EAST
- Unlocks part of "The Eastern Masters" story

**Quest Type:** Eastern Innovations
**Difficulty:** ★★★★☆""",
        "labels": ["side-quest", "eastern-masters", "eastern-innovations"]
    },
    {
        "title": "Side Quest B5: Nintendo's Secret",
        "body": """**Hidden Quest Unlocked!**

Create low-poly optimized model

**Memory Fragment:**
"Miyamoto hand-drew 3D Mario 64 camera systems"

**Objectives:**
- Model character under 500 polygons
- Optimize UV layout
- Create camera follow system

**Rewards:**
- $115 Portfolio Value
- Fragment: MIYAMOTO_CAMERA
- Unlocks part of "The Eastern Masters" story

**Quest Type:** Eastern Innovations
**Difficulty:** ★★★★★""",
        "labels": ["side-quest", "eastern-masters", "eastern-innovations"]
    },
    
    # Group C: Liberation Movement (Unlocks Story 6: The Open Source Heroes)
    {
        "title": "Side Quest C1: The Blender Fund",
        "body": """**Hidden Quest Unlocked!**

Create procedural material

**Memory Fragment:**
"Ton Roosendaal's €100,000 crowdfund freed Blender in 100 days"

**Objectives:**
- Build procedural material in Blender
- Use node-based workflow
- Create reusable node group

**Rewards:**
- $125 Portfolio Value
- Fragment: BLENDER_FREE
- Unlocks part of "The Open Source Heroes" story

**Quest Type:** Liberation Movement
**Difficulty:** ★★★★☆""",
        "labels": ["side-quest", "open-source", "liberation-movement"]
    },
    {
        "title": "Side Quest C2: Linux Render Farm",
        "body": """**Hidden Quest Unlocked!**

Set up Python batch renderer

**Memory Fragment:**
"DreamWorks moved to Linux for Shrek, breaking Microsoft's hold"

**Objectives:**
- Create Python render script
- Implement batch processing
- Add distributed rendering logic

**Rewards:**
- $135 Portfolio Value
- Fragment: PENGUIN_SHREK
- Unlocks part of "The Open Source Heroes" story

**Quest Type:** Liberation Movement
**Difficulty:** ★★★★★""",
        "labels": ["side-quest", "open-source", "liberation-movement"]
    },
    {
        "title": "Side Quest C3: The GIMP Alternative",
        "body": """**Hidden Quest Unlocked!**

Create texture in open tools

**Memory Fragment:**
"Spencer Kimball created GIMP to prove students could match Photoshop"

**Objectives:**
- Create PBR texture set
- Use only open source tools
- Document the workflow

**Rewards:**
- $115 Portfolio Value
- Fragment: GIMP_REBELLION
- Unlocks part of "The Open Source Heroes" story

**Quest Type:** Liberation Movement
**Difficulty:** ★★★☆☆""",
        "labels": ["side-quest", "open-source", "liberation-movement"]
    },
    {
        "title": "Side Quest C4: Academic Freedom",
        "body": """**Hidden Quest Unlocked!**

Implement research paper technique

**Memory Fragment:**
"SIGGRAPH's open paper culture accelerated CG 10x over proprietary R&D"

**Objectives:**
- Choose a SIGGRAPH paper
- Implement the core algorithm
- Create demonstration scene

**Rewards:**
- $145 Portfolio Value
- Fragment: SIGGRAPH_OPEN
- Unlocks part of "The Open Source Heroes" story

**Quest Type:** Liberation Movement
**Difficulty:** ★★★★★""",
        "labels": ["side-quest", "open-source", "liberation-movement"]
    },
    {
        "title": "Side Quest C5: The Commons",
        "body": """**Hidden Quest Unlocked!**

Share asset with CC license

**Memory Fragment:**
"Creative Commons preserves culture from corporate ownership"

**Objectives:**
- Create reusable 3D asset
- Apply Creative Commons license
- Upload to public repository

**Rewards:**
- $160 Portfolio Value
- Fragment: CC_CULTURE
- Unlocks part of "The Open Source Heroes" story

**Quest Type:** Liberation Movement
**Difficulty:** ★★★☆☆""",
        "labels": ["side-quest", "open-source", "liberation-movement"]
    },
    
    # Bonus Quests
    {
        "title": "Bonus Quest: Golden Ratio",
        "body": """**Secret Quest Discovered!**

Create spiral based on golden ratio

**Memory Fragment:**
"Ancient Greeks encoded nature's mathematics"

**Trigger:** After using Fibonacci in any task

**Objectives:**
- Model golden spiral
- Apply to composition
- Create recursive geometry

**Rewards:**
- $200 Portfolio Value
- Fragment: PHI_ETERNAL
- Achievement: Mathematical Beauty

**Quest Type:** Bonus Quest
**Difficulty:** ★★★★☆""",
        "labels": ["side-quest", "bonus", "mathematics"]
    },
    {
        "title": "Bonus Quest: The Glitch Art",
        "body": """**Secret Quest Discovered!**

Turn glitch into artistic effect

**Memory Fragment:**
"Rosa Menkman: 'Glitches are the fingerprints of digital culture'"

**Trigger:** After any render error

**Objectives:**
- Create intentional glitch effect
- Control the chaos
- Document the technique

**Rewards:**
- $150 Portfolio Value
- Fragment: GLITCH_ART
- Achievement: Digital Decay

**Quest Type:** Bonus Quest
**Difficulty:** ★★★☆☆""",
        "labels": ["side-quest", "bonus", "experimental"]
    },
    {
        "title": "Bonus Quest: The Lost Frame",
        "body": """**Legendary Quest Unlocked!**

Recreate frame from unmade Jodorowsky's Dune

**Memory Fragment:**
"Moebius's concept art inspired 40 years of sci-fi"

**Trigger:** After 30 tasks completed

**Objectives:**
- Study Moebius art style
- Create sci-fi environment
- Match the visionary aesthetic

**Rewards:**
- $300 Portfolio Value
- Fragment: DUNE_DREAM
- Achievement: Visionary Artist
- Title: "Dream Weaver"

**Quest Type:** Bonus Quest
**Difficulty:** ★★★★★""",
        "labels": ["side-quest", "bonus", "legendary"]
    }
]

def create_issue(quest):
    """Create a single GitHub issue using gh CLI"""
    cmd = [
        'gh', 'issue', 'create',
        '--repo', 'Studio-Dashosa/abstract-garden-video',
        '--title', quest['title'],
        '--body', quest['body']
    ]
    
    # Add labels
    for label in quest['labels']:
        cmd.extend(['--label', label])
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Created: {quest['title']}")
            return True
        else:
            print(f"❌ Failed: {quest['title']}")
            print(f"   Error: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Exception creating {quest['title']}: {e}")
        return False

def main():
    print("🎮 Creating REAL Side Quest Issues from SIDE_QUESTS.md...")
    print("=" * 50)
    
    # Check if gh CLI is installed and authenticated
    try:
        result = subprocess.run(['gh', 'auth', 'status'], capture_output=True, text=True)
        if result.returncode != 0:
            print("❌ GitHub CLI not authenticated")
            print("Please run: gh auth login")
            return
    except:
        print("❌ GitHub CLI (gh) not installed")
        print("Please install: brew install gh")
        return
    
    print("✅ GitHub CLI authenticated\n")
    
    created = 0
    failed = 0
    
    for i, quest in enumerate(side_quests, 1):
        print(f"\n[{i}/{len(side_quests)}] Creating: {quest['title'][:50]}...")
        if create_issue(quest):
            created += 1
        else:
            failed += 1
        
        # Rate limiting - wait between issues
        if i < len(side_quests):
            time.sleep(2)
    
    print("\n" + "=" * 50)
    print(f"✅ Created: {created} real side quests")
    if failed > 0:
        print(f"❌ Failed: {failed} side quests")
    
    print("\n📊 Total Quest Values:")
    print("  Group A (Forgotten Women): $450")
    print("  Group B (Eastern Masters): $520")
    print("  Group C (Open Source Heroes): $680")
    print("  Bonus Quests: $650")
    print("  Story Completion Bonuses: $2,200")
    print("  TOTAL POTENTIAL VALUE: $4,500")
    print("\n🎮 Side quest creation complete!")

if __name__ == "__main__":
    main()
