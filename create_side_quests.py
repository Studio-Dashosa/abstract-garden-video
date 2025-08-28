#!/usr/bin/env python3
"""
Create all side quest issues for Abstract Garden
"""
import subprocess
import json

def run_gh_command(command):
    """Run a GitHub CLI command and return output"""
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {command}")
        print(f"Error: {e.stderr}")
        return None

def create_side_quest_issue(number, title, body, labels):
    """Create a side quest issue"""
    
    # Escape quotes in body
    body_escaped = body.replace('"', '\\"').replace('`', '\\`')
    
    command = f'''gh issue create \\
        --title "{title}" \\
        --body "{body_escaped}" \\
        --label "{labels}"'''
    
    print(f"Creating Side Quest #{number}: {title}")
    result = run_gh_command(command)
    return result

def main():
    print("🎮 CREATING ABSTRACT GARDEN SIDE QUESTS\n")
    
    # Group A: The Light Pen Legacy (Unlocks Story 4)
    group_a_quests = [
        {
            "title": "Side Quest A1: Sutherland's Constraint",
            "body": """## Quest Overview
**Group:** The Light Pen Legacy (Unlocks Story 4)
**Prerequisites:** Complete any 5 main tasks
**Reward:** $75 + Memory Fragment: HIDDEN_SISTER

## The Task
Create an object with 3 constraints in Maya

## Memory Unlock
"Sutherland's sister Pat Hanrahan-Roth programmed Sketchpad's constraints"

## Acceptance Criteria
- [ ] Create Maya scene with constrained object
- [ ] Apply 3 different constraint types
- [ ] Document constraint behavior
- [ ] Export result as .ma file

## Portfolio Value
- Market Value: $75
- Memory Fragment: HIDDEN_SISTER
- Story Progress: The Light Pen Legacy

*This side quest reveals hidden contributions to early computer graphics*""",
            "labels": "side-quest,group-a,story-4"
        },
        {
            "title": "Side Quest A2: The Utah Teapot Ritual", 
            "body": """## Quest Overview
**Group:** The Light Pen Legacy (Unlocks Story 4)
**Prerequisites:** Complete any 5 main tasks
**Reward:** $95 + Memory Fragment: SANDRA_TEAPOT

## The Task
Model the Utah teapot from scratch

## Memory Unlock
"Martin Newell's wife Sandra suggested the teapot in their kitchen"

## Acceptance Criteria
- [ ] Model teapot using reference topology
- [ ] Match classic Utah teapot proportions
- [ ] Clean quad topology
- [ ] Export as OBJ

## Portfolio Value
- Market Value: $95
- Memory Fragment: SANDRA_TEAPOT
- Story Progress: The Light Pen Legacy

*Discover the woman behind the most famous 3D model*""",
            "labels": "side-quest,group-a,story-4"
        },
        {
            "title": "Side Quest A3: PARC's Secret",
            "body": """## Quest Overview
**Group:** The Light Pen Legacy (Unlocks Story 4)
**Prerequisites:** Complete any 5 main tasks
**Reward:** $85 + Memory Fragment: GOLDBERG_GUARD

## The Task
Create GUI mockup in Python

## Memory Unlock
"Adele Goldberg protected Smalltalk from Steve Jobs at Xerox PARC"

## Acceptance Criteria
- [ ] Create Python GUI with tkinter
- [ ] Implement 3D scene viewer interface
- [ ] Add basic controls (rotate, zoom)
- [ ] Document interface design

## Portfolio Value
- Market Value: $85
- Memory Fragment: GOLDBERG_GUARD
- Story Progress: The Light Pen Legacy

*Learn about the guardian of revolutionary technology*""",
            "labels": "side-quest,group-a,story-4"
        },
        {
            "title": "Side Quest A4: Pixar's First Artist",
            "body": """## Quest Overview
**Group:** The Light Pen Legacy (Unlocks Story 4)
**Prerequisites:** Complete any 5 main tasks
**Reward:** $105 + Memory Fragment: RACHEL_REYES

## The Task
Animate simple character

## Memory Unlock
"Alvy Ray Smith's partner Loren Carpenter's wife Rachel invented Reyes rendering"

## Acceptance Criteria
- [ ] Create simple character rig
- [ ] Animate walk cycle (12 frames)
- [ ] Apply Reyes-style rendering approach
- [ ] Export animation sequence

## Portfolio Value
- Market Value: $105
- Memory Fragment: RACHEL_REYES
- Story Progress: The Light Pen Legacy

*Honor the hidden inventor of film rendering*""",
            "labels": "side-quest,group-a,story-4"
        },
        {
            "title": "Side Quest A5: Hidden Calculations",
            "body": """## Quest Overview
**Group:** The Light Pen Legacy (Unlocks Story 4)
**Prerequisites:** Complete any 5 main tasks
**Reward:** $90 + Memory Fragment: IBM_SECRET

## The Task
Implement Bresenham line algorithm

## Memory Unlock
"Bresenham's algorithm was classified by IBM for years"

## Acceptance Criteria
- [ ] Code Bresenham algorithm from scratch
- [ ] Create visual demonstration
- [ ] Compare to modern line drawing
- [ ] Document historical context

## Portfolio Value
- Market Value: $90
- Memory Fragment: IBM_SECRET
- Story Progress: The Light Pen Legacy

*Uncover corporate secrets in computer graphics history*""",
            "labels": "side-quest,group-a,story-4"
        }
    ]
    
    # Group B: Eastern Innovations (Unlocks Story 5)
    group_b_quests = [
        {
            "title": "Side Quest B1: Phong's Shadow",
            "body": """## Quest Overview
**Group:** Eastern Innovations (Unlocks Story 5)
**Prerequisites:** Complete any 10 main tasks
**Reward:** $95 + Memory Fragment: PHONG_LEGACY

## The Task
Create Phong shader variations

## Memory Unlock
"Bui Tuong Phong died at 32, never seeing his model dominate CG"

## Acceptance Criteria
- [ ] Implement classic Phong shading
- [ ] Create 3 shader variations
- [ ] Document mathematical differences
- [ ] Apply to test scene

## Portfolio Value
- Market Value: $95
- Memory Fragment: PHONG_LEGACY
- Story Progress: Eastern Innovations

*Honor the young genius who changed rendering forever*""",
            "labels": "side-quest,group-b,story-5"
        },
        {
            "title": "Side Quest B2: The Anime Pipeline",
            "body": """## Quest Overview
**Group:** Eastern Innovations (Unlocks Story 5)
**Prerequisites:** Complete any 10 main tasks
**Reward:** $105 + Memory Fragment: TOEI_DIGITAL

## The Task
Create cel-shaded render

## Memory Unlock
"Toei Animation pioneered digital anime with custom tools in 1980s"

## Acceptance Criteria
- [ ] Set up toon/cel shading
- [ ] Create anime-style character
- [ ] Implement outline rendering
- [ ] Match traditional anime look

## Portfolio Value
- Market Value: $105
- Memory Fragment: TOEI_DIGITAL
- Story Progress: Eastern Innovations

*Discover the digital anime revolution*""",
            "labels": "side-quest,group-b,story-5"
        },
        {
            "title": "Side Quest B3: Sony's Transformation",
            "body": """## Quest Overview
**Group:** Eastern Innovations (Unlocks Story 5)
**Prerequisites:** Complete any 10 main tasks
**Reward:** $110 + Memory Fragment: KUTARAGI_FIGHT

## The Task
Model geometric character

## Memory Unlock
"Ken Kutaragi fought Sony board to create PlayStation's 3D chips"

## Acceptance Criteria
- [ ] Create low-poly geometric character
- [ ] Optimize for real-time rendering
- [ ] Use PlayStation 1 style constraints
- [ ] Document polygon budget

## Portfolio Value
- Market Value: $110
- Memory Fragment: KUTARAGI_FIGHT
- Story Progress: Eastern Innovations

*Learn about the battle for 3D gaming*""",
            "labels": "side-quest,group-b,story-5"
        },
        {
            "title": "Side Quest B4: The Lost L-System", 
            "body": """## Quest Overview
**Group:** Eastern Innovations (Unlocks Story 5)
**Prerequisites:** Complete any 10 main tasks
**Reward:** $95 + Memory Fragment: BOTANICAL_EAST

## The Task
Generate plant with L-systems

## Memory Unlock
"Przemyslaw Prusinkiewicz extended Lindenmayer's work for Asian flora"

## Acceptance Criteria
- [ ] Implement L-system algorithm
- [ ] Generate Asian tree species
- [ ] Create multiple growth stages
- [ ] Export procedural results

## Portfolio Value
- Market Value: $95
- Memory Fragment: BOTANICAL_EAST
- Story Progress: Eastern Innovations

*Explore algorithmic nature from Eastern perspective*""",
            "labels": "side-quest,group-b,story-5"
        },
        {
            "title": "Side Quest B5: Nintendo's Secret",
            "body": """## Quest Overview
**Group:** Eastern Innovations (Unlocks Story 5)
**Prerequisites:** Complete any 10 main tasks
**Reward:** $115 + Memory Fragment: MIYAMOTO_CAMERA

## The Task
Create low-poly optimized model

## Memory Unlock
"Miyamoto hand-drew 3D Mario 64 camera systems"

## Acceptance Criteria
- [ ] Model under 500 polygons
- [ ] Hand-optimize topology
- [ ] Create camera system mockup
- [ ] Document optimization techniques

## Portfolio Value
- Market Value: $115
- Memory Fragment: MIYAMOTO_CAMERA
- Story Progress: Eastern Innovations

*Learn the art of constraint-driven creativity*""",
            "labels": "side-quest,group-b,story-5"
        }
    ]
    
    # Group C: Liberation Movement (Unlocks Story 6)
    group_c_quests = [
        {
            "title": "Side Quest C1: The Blender Fund",
            "body": """## Quest Overview
**Group:** Liberation Movement (Unlocks Story 6)
**Prerequisites:** Complete any 15 main tasks
**Reward:** $125 + Memory Fragment: BLENDER_FREE

## The Task
Create procedural material

## Memory Unlock
"Ton Roosendaal's €100,000 crowdfund freed Blender in 100 days"

## Acceptance Criteria
- [ ] Create complex procedural material
- [ ] Use only Blender nodes
- [ ] Document node setup
- [ ] Share with open license

## Portfolio Value
- Market Value: $125
- Memory Fragment: BLENDER_FREE
- Story Progress: Liberation Movement

*Celebrate the liberation of 3D tools*""",
            "labels": "side-quest,group-c,story-6"
        },
        {
            "title": "Side Quest C2: Linux Render Farm",
            "body": """## Quest Overview
**Group:** Liberation Movement (Unlocks Story 6)
**Prerequisites:** Complete any 15 main tasks
**Reward:** $135 + Memory Fragment: PENGUIN_SHREK

## The Task
Set up Python batch renderer

## Memory Unlock
"DreamWorks moved to Linux for Shrek, breaking Microsoft's hold"

## Acceptance Criteria
- [ ] Create Python render script
- [ ] Set up batch processing
- [ ] Use open source tools only
- [ ] Document Linux pipeline

## Portfolio Value
- Market Value: $135
- Memory Fragment: PENGUIN_SHREK
- Story Progress: Liberation Movement

*Build the open source render revolution*""",
            "labels": "side-quest,group-c,story-6"
        },
        {
            "title": "Side Quest C3: The GIMP Alternative",
            "body": """## Quest Overview
**Group:** Liberation Movement (Unlocks Story 6)
**Prerequisites:** Complete any 15 main tasks
**Reward:** $115 + Memory Fragment: GIMP_REBELLION

## The Task
Create texture in open tools

## Memory Unlock
"Spencer Kimball created GIMP to prove students could match Photoshop"

## Acceptance Criteria
- [ ] Create professional texture
- [ ] Use GIMP exclusively
- [ ] Match commercial quality
- [ ] Document open workflow

## Portfolio Value
- Market Value: $115
- Memory Fragment: GIMP_REBELLION
- Story Progress: Liberation Movement

*Prove open source can compete*""",
            "labels": "side-quest,group-c,story-6"
        },
        {
            "title": "Side Quest C4: Academic Freedom",
            "body": """## Quest Overview
**Group:** Liberation Movement (Unlocks Story 6)
**Prerequisites:** Complete any 15 main tasks
**Reward:** $145 + Memory Fragment: SIGGRAPH_OPEN

## The Task
Implement research paper technique

## Memory Unlock
"SIGGRAPH's open paper culture accelerated CG 10x over proprietary R&D"

## Acceptance Criteria
- [ ] Choose recent SIGGRAPH paper
- [ ] Implement technique
- [ ] Create demonstration
- [ ] Share implementation freely

## Portfolio Value
- Market Value: $145
- Memory Fragment: SIGGRAPH_OPEN
- Story Progress: Liberation Movement

*Honor academic openness in CG research*""",
            "labels": "side-quest,group-c,story-6"
        },
        {
            "title": "Side Quest C5: The Commons",
            "body": """## Quest Overview
**Group:** Liberation Movement (Unlocks Story 6)
**Prerequisites:** Complete any 15 main tasks
**Reward:** $160 + Memory Fragment: CC_CULTURE

## The Task
Share asset with CC license

## Memory Unlock
"Creative Commons preserves culture from corporate ownership"

## Acceptance Criteria
- [ ] Create high-quality asset
- [ ] Apply Creative Commons license
- [ ] Upload to public repository
- [ ] Document sharing philosophy

## Portfolio Value
- Market Value: $160
- Memory Fragment: CC_CULTURE
- Story Progress: Liberation Movement

*Contribute to the digital commons*""",
            "labels": "side-quest,group-c,story-6"
        }
    ]
    
    # Bonus Quests
    bonus_quests = [
        {
            "title": "Bonus Quest: Golden Ratio",
            "body": """## Quest Overview
**Type:** Bonus Quest (Appears Randomly)
**Trigger:** After using Fibonacci in any task
**Reward:** $200 + Memory Fragment: PHI_ETERNAL

## The Task
Create spiral based on golden ratio

## Memory Unlock
"Ancient Greeks encoded nature's mathematics"

## Acceptance Criteria
- [ ] Create mathematical spiral
- [ ] Base on golden ratio/Fibonacci
- [ ] Apply to 3D geometry
- [ ] Document mathematical principles

## Portfolio Value
- Market Value: $200
- Memory Fragment: PHI_ETERNAL
- Story Progress: Universal Principles

*Discover eternal mathematical beauty*""",
            "labels": "side-quest,bonus,mathematics"
        },
        {
            "title": "Bonus Quest: The Glitch Art", 
            "body": """## Quest Overview
**Type:** Bonus Quest (Appears Randomly)
**Trigger:** After any render error
**Reward:** $150 + Memory Fragment: GLITCH_ART

## The Task
Turn glitch into artistic effect

## Memory Unlock
"Rosa Menkman: 'Glitches are the fingerprints of digital culture'"

## Acceptance Criteria
- [ ] Create intentional glitch effect
- [ ] Turn error into art
- [ ] Document glitch aesthetic
- [ ] Celebrate digital imperfection

## Portfolio Value
- Market Value: $150
- Memory Fragment: GLITCH_ART
- Story Progress: Digital Culture

*Embrace the beauty of digital imperfection*""",
            "labels": "side-quest,bonus,glitch-art"
        },
        {
            "title": "Bonus Quest: The Lost Frame",
            "body": """## Quest Overview
**Type:** Bonus Quest (Appears Randomly)
**Trigger:** After 30 tasks completed
**Reward:** $300 + Memory Fragment: DUNE_DREAM

## The Task
Recreate frame from unmade Jodorowsky's Dune

## Memory Unlock
"Moebius's concept art inspired 40 years of sci-fi"

## Acceptance Criteria
- [ ] Study Jodorowsky's Dune concept art
- [ ] Recreate scene in 3D
- [ ] Match Moebius aesthetic
- [ ] Honor the unmade masterpiece

## Portfolio Value
- Market Value: $300
- Memory Fragment: DUNE_DREAM
- Story Progress: Lost Visions

*Bring lost dreams to digital life*""",
            "labels": "side-quest,bonus,tribute"
        }
    ]
    
    # Create all side quests
    created_count = 0
    
    print("📍 Creating Group A: The Light Pen Legacy...")
    for quest in group_a_quests:
        if create_side_quest_issue(f"A{created_count+1}", quest["title"], quest["body"], quest["labels"]):
            created_count += 1
    
    print("\n📍 Creating Group B: Eastern Innovations...")
    for quest in group_b_quests:
        if create_side_quest_issue(f"B{created_count+1}", quest["title"], quest["body"], quest["labels"]):
            created_count += 1
    
    print("\n📍 Creating Group C: Liberation Movement...")
    for quest in group_c_quests:
        if create_side_quest_issue(f"C{created_count+1}", quest["title"], quest["body"], quest["labels"]):
            created_count += 1
            
    print("\n📍 Creating Bonus Quests...")
    for quest in bonus_quests:
        if create_side_quest_issue(f"BONUS{created_count+1}", quest["title"], quest["body"], quest["labels"]):
            created_count += 1
    
    print(f"\n✅ Created {created_count} side quest issues!")
    print("🎮 Side quest system is now complete!")
    print("\nSide Quest Groups:")
    print("- Group A: 5 quests (Story 4: The Forgotten Women)")
    print("- Group B: 5 quests (Story 5: The Eastern Masters)")
    print("- Group C: 5 quests (Story 6: The Open Source Heroes)")
    print("- Bonus: 3 special quests")
    print(f"\nTotal quest system: 49 main + 18 side = 67 learning tasks")

if __name__ == "__main__":
    main()
