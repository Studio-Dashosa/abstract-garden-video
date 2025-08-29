#!/usr/bin/env python3
"""
Create side quest issues with proper authentication
"""
import subprocess
import json

# Side quest data
SIDE_QUESTS = [
    {
        "title": "🎭 Side Quest A1: Sutherland's Constraint",
        "body": """## Quest Overview
**Group:** The Light Pen Legacy (Unlocks Story 4: The Forgotten Women)
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
        "labels": "side-quest"
    },
    {
        "title": "🎭 Side Quest A2: The Utah Teapot Ritual",
        "body": """## Quest Overview
**Group:** The Light Pen Legacy (Unlocks Story 4: The Forgotten Women)
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
        "labels": "side-quest"
    },
    {
        "title": "🎭 Side Quest B1: Phong's Shadow",
        "body": """## Quest Overview
**Group:** Eastern Innovations (Unlocks Story 5: The Eastern Masters)
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
        "labels": "side-quest"
    },
    {
        "title": "🎭 Side Quest C1: The Blender Fund",
        "body": """## Quest Overview
**Group:** Liberation Movement (Unlocks Story 6: The Open Source Heroes)
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
        "labels": "side-quest"
    },
    {
        "title": "🎭 Bonus Quest: Golden Ratio",
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
        "labels": "bonus-quest"
    }
]

def run_command(command):
    """Run a command and return output"""
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr}")
        return None

def create_issue(quest):
    """Create a GitHub issue for the quest"""
    title = quest["title"].replace('"', '\\"')
    body = quest["body"].replace('"', '\\"').replace('\n', '\\n')
    
    command = f'gh issue create --title "{title}" --body "{body}"'
    
    print(f"Creating: {quest['title']}")
    result = run_command(command)
    if result:
        print(f"✅ Created: {result}")
        return result
    else:
        print("❌ Failed to create issue")
        return None

def main():
    print("🎮 CREATING SIDE QUEST ISSUES")
    print("=============================")
    
    created = 0
    for quest in SIDE_QUESTS:
        if create_issue(quest):
            created += 1
        print()
    
    print(f"✅ Created {created}/{len(SIDE_QUESTS)} side quest issues!")
    print("\n🎯 NEXT STEPS:")
    print("1. Add remaining side quests manually if needed")
    print("2. Update story-system.js with side quest memory fragments")
    print("3. Test the complete gaming system")

if __name__ == "__main__":
    main()
