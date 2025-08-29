#!/usr/bin/env python3
"""
Create 18 side quest issues on GitHub for the Abstract Garden project
"""

import subprocess
import json
import time

# Side quest definitions
side_quests = [
    # The Forgotten Women (6 quests)
    {
        "title": "Side Quest: Adele Goldberg's Smalltalk Legacy",
        "body": """**Hidden Quest Unlocked!**

Research and document Adele Goldberg's contributions to Smalltalk and GUI development at Xerox PARC.

**Objectives:**
- Research her role in developing Smalltalk-80
- Document her influence on modern object-oriented programming
- Create a tribute render using her programming concepts

**Rewards:**
- 200 Souls
- 150 Embers
- Memory Fragment: "The Mother of Objects"

**Quest Type:** The Forgotten Women
**Difficulty:** ★★★☆☆""",
        "labels": ["side-quest", "forgotten-women", "research"]
    },
    {
        "title": "Side Quest: Barbara Liskov's Substitution Principle",
        "body": """**Hidden Quest Unlocked!**

Implement a 3D scene demonstrating Liskov's Substitution Principle in computer graphics.

**Objectives:**
- Create base mesh class with proper inheritance
- Demonstrate substitutability in rendering pipeline
- Document the principle's importance in graphics programming

**Rewards:**
- 250 Souls
- 175 Embers
- Memory Fragment: "The Abstraction Queen"

**Quest Type:** The Forgotten Women
**Difficulty:** ★★★★☆""",
        "labels": ["side-quest", "forgotten-women", "technical"]
    },
    {
        "title": "Side Quest: Radia Perlman's Spanning Tree",
        "body": """**Hidden Quest Unlocked!**

Create a visualization of network topology using Perlman's Spanning Tree Protocol.

**Objectives:**
- Build a 3D network visualization
- Implement spanning tree algorithm for scene graphs
- Render the "Mother of the Internet's" contribution

**Rewards:**
- 225 Souls
- 160 Embers
- Memory Fragment: "She Who Untangled the Web"

**Quest Type:** The Forgotten Women
**Difficulty:** ★★★★☆""",
        "labels": ["side-quest", "forgotten-women", "visualization"]
    },
    {
        "title": "Side Quest: Mary Ann Horton's Berkeley Unix",
        "body": """**Hidden Quest Unlocked!**

Document the graphics contributions in Berkeley Unix and early terminals.

**Objectives:**
- Research early Unix graphics capabilities
- Create retro terminal shader
- Document Horton's contributions to vi and termcap

**Rewards:**
- 200 Souls
- 150 Embers
- Memory Fragment: "The Terminal Sage"

**Quest Type:** The Forgotten Women
**Difficulty:** ★★★☆☆""",
        "labels": ["side-quest", "forgotten-women", "history"]
    },
    {
        "title": "Side Quest: Frances Allen's Compiler Optimizations",
        "body": """**Hidden Quest Unlocked!**

Apply compiler optimization principles to shader compilation.

**Objectives:**
- Study Allen's optimization techniques
- Apply to GLSL shader optimization
- Document performance improvements

**Rewards:**
- 275 Souls
- 200 Embers
- Memory Fragment: "The Optimization Oracle"

**Quest Type:** The Forgotten Women
**Difficulty:** ★★★★★""",
        "labels": ["side-quest", "forgotten-women", "optimization"]
    },
    {
        "title": "Side Quest: Lynn Conway's VLSI Revolution",
        "body": """**Hidden Quest Unlocked!**

Create a procedural chip layout visualization honoring Conway's VLSI work.

**Objectives:**
- Generate procedural circuit patterns
- Apply VLSI design principles to procedural generation
- Create artistic tribute to her transition and triumph

**Rewards:**
- 300 Souls
- 225 Embers
- Memory Fragment: "The Silicon Phoenix"

**Quest Type:** The Forgotten Women
**Difficulty:** ★★★★★""",
        "labels": ["side-quest", "forgotten-women", "procedural"]
    },
    
    # The Eastern Masters (6 quests)
    {
        "title": "Side Quest: Yukihiro Matsumoto's Ruby Graphics",
        "body": """**Hidden Quest Unlocked!**

Create a Ruby script for procedural 3D generation.

**Objectives:**
- Use Ruby for scene generation
- Apply Matz's principle of "programmer happiness"
- Generate beautiful procedural art

**Rewards:**
- 200 Souls
- 150 Embers
- Memory Fragment: "The Happy Programmer"

**Quest Type:** The Eastern Masters
**Difficulty:** ★★★☆☆""",
        "labels": ["side-quest", "eastern-masters", "scripting"]
    },
    {
        "title": "Side Quest: Shigeru Miyamoto's Design Philosophy",
        "body": """**Hidden Quest Unlocked!**

Apply Nintendo's design principles to 3D scene composition.

**Objectives:**
- Study Miyamoto's "fun first" approach
- Create playful, explorable 3D environment
- Document gameplay-informed design

**Rewards:**
- 250 Souls
- 175 Embers
- Memory Fragment: "The Plumber's Architect"

**Quest Type:** The Eastern Masters
**Difficulty:** ★★★★☆""",
        "labels": ["side-quest", "eastern-masters", "design"]
    },
    {
        "title": "Side Quest: Hideo Kojima's Cinematic Rendering",
        "body": """**Hidden Quest Unlocked!**

Create cinematic camera work inspired by Kojima's techniques.

**Objectives:**
- Implement cinematic camera system
- Create dramatic lighting setups
- Apply film techniques to real-time rendering

**Rewards:**
- 275 Souls
- 200 Embers
- Memory Fragment: "The Digital Auteur"

**Quest Type:** The Eastern Masters
**Difficulty:** ★★★★★""",
        "labels": ["side-quest", "eastern-masters", "cinematics"]
    },
    {
        "title": "Side Quest: Kazunori Yamauchi's Photorealism",
        "body": """**Hidden Quest Unlocked!**

Achieve Gran Turismo-level car rendering quality.

**Objectives:**
- Master car paint shaders
- Implement accurate reflections
- Document photorealistic techniques

**Rewards:**
- 300 Souls
- 225 Embers
- Memory Fragment: "The Real Driving Simulator"

**Quest Type:** The Eastern Masters
**Difficulty:** ★★★★★""",
        "labels": ["side-quest", "eastern-masters", "photorealism"]
    },
    {
        "title": "Side Quest: Hironobu Sakaguchi's Particle Magic",
        "body": """**Hidden Quest Unlocked!**

Create Final Fantasy-inspired particle effects.

**Objectives:**
- Design magical particle systems
- Implement spell-like visual effects
- Create fantasy atmosphere

**Rewards:**
- 225 Souls
- 160 Embers
- Memory Fragment: "The Fantasy Weaver"

**Quest Type:** The Eastern Masters
**Difficulty:** ★★★★☆""",
        "labels": ["side-quest", "eastern-masters", "particles"]
    },
    {
        "title": "Side Quest: Yu Suzuki's Arcade Innovation",
        "body": """**Hidden Quest Unlocked!**

Recreate arcade-style rendering techniques.

**Objectives:**
- Study Virtua Fighter's flat shading
- Implement retro 3D aesthetics
- Document arcade graphics evolution

**Rewards:**
- 200 Souls
- 150 Embers
- Memory Fragment: "The Arcade Alchemist"

**Quest Type:** The Eastern Masters
**Difficulty:** ★★★☆☆""",
        "labels": ["side-quest", "eastern-masters", "retro"]
    },
    
    # The Open Source Heroes (6 quests)
    {
        "title": "Side Quest: Linus Torvalds' Kernel Graphics",
        "body": """**Hidden Quest Unlocked!**

Understand Linux kernel graphics subsystems.

**Objectives:**
- Study DRM/KMS architecture
- Document graphics driver stack
- Create visualization of kernel graphics flow

**Rewards:**
- 250 Souls
- 175 Embers
- Memory Fragment: "The Penguin's Vision"

**Quest Type:** The Open Source Heroes
**Difficulty:** ★★★★☆""",
        "labels": ["side-quest", "open-source", "systems"]
    },
    {
        "title": "Side Quest: John Carmack's Open Source Engines",
        "body": """**Hidden Quest Unlocked!**

Study and extend Quake engine source code.

**Objectives:**
- Analyze Quake's BSP rendering
- Implement modern enhancement
- Document engine architecture

**Rewards:**
- 300 Souls
- 225 Embers
- Memory Fragment: "The Source Liberator"

**Quest Type:** The Open Source Heroes
**Difficulty:** ★★★★★""",
        "labels": ["side-quest", "open-source", "engines"]
    },
    {
        "title": "Side Quest: Ton Roosendaal's Blender Revolution",
        "body": """**Hidden Quest Unlocked!**

Create complex procedural node setup in Blender.

**Objectives:**
- Master Geometry Nodes
- Build reusable node groups
- Share setup with community

**Rewards:**
- 275 Souls
- 200 Embers
- Memory Fragment: "The Dutch Liberator"

**Quest Type:** The Open Source Heroes
**Difficulty:** ★★★★★""",
        "labels": ["side-quest", "open-source", "blender"]
    },
    {
        "title": "Side Quest: Ian Murdock's Debian Graphics",
        "body": """**Hidden Quest Unlocked!**

Set up complete graphics development environment on Debian.

**Objectives:**
- Configure development tools
- Document package management
- Create distribution guide

**Rewards:**
- 200 Souls
- 150 Embers
- Memory Fragment: "The Package Master"

**Quest Type:** The Open Source Heroes
**Difficulty:** ★★★☆☆""",
        "labels": ["side-quest", "open-source", "linux"]
    },
    {
        "title": "Side Quest: Miguel de Icaza's Mono Rendering",
        "body": """**Hidden Quest Unlocked!**

Create cross-platform graphics app with Mono/C#.

**Objectives:**
- Build OpenGL app in C#
- Ensure cross-platform compatibility
- Document Mono graphics capabilities

**Rewards:**
- 225 Souls
- 160 Embers
- Memory Fragment: "The Bridge Builder"

**Quest Type:** The Open Source Heroes
**Difficulty:** ★★★★☆""",
        "labels": ["side-quest", "open-source", "cross-platform"]
    },
    {
        "title": "Side Quest: Bram Cohen's Distributed Assets",
        "body": """**Hidden Quest Unlocked!**

Implement BitTorrent-like system for distributing 3D assets.

**Objectives:**
- Design P2P asset distribution
- Handle large texture files
- Create decentralized asset library

**Rewards:**
- 250 Souls
- 175 Embers
- Memory Fragment: "The Torrent Master"

**Quest Type:** The Open Source Heroes
**Difficulty:** ★★★★☆""",
        "labels": ["side-quest", "open-source", "distributed"]
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
    print("🎮 Creating Side Quest Issues...")
    print("=" * 50)
    
    # Check if gh CLI is installed
    try:
        subprocess.run(['gh', '--version'], capture_output=True, check=True)
    except:
        print("❌ GitHub CLI (gh) not installed or not authenticated")
        print("Please install: brew install gh")
        print("Then auth: gh auth login")
        return
    
    created = 0
    failed = 0
    
    for i, quest in enumerate(side_quests, 1):
        print(f"\n[{i}/{len(side_quests)}] Creating side quest...")
        if create_issue(quest):
            created += 1
        else:
            failed += 1
        
        # Rate limiting - wait between issues
        if i < len(side_quests):
            time.sleep(2)
    
    print("\n" + "=" * 50)
    print(f"✅ Created: {created} side quests")
    if failed > 0:
        print(f"❌ Failed: {failed} side quests")
    print("\n🎮 Side quest creation complete!")

if __name__ == "__main__":
    main()
