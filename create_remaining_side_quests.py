#!/usr/bin/env python3
"""
Create the remaining 13 side quest issues to complete the 18-quest system.
This expands the lore and provides additional legendary tales beyond the core pipeline.
"""

import subprocess
import time

# Remaining side quest definitions (more complex than the initial 5)
REMAINING_SIDE_QUESTS = [
    # Historical Legends (6-8)
    {
        "title": "🏛️ Warnock's PostScript Legacy",
        "body": """**Side Quest: Historical Legend**

Research and document the revolutionary impact of John Warnock's PostScript language on computer graphics and printing.

**Quest Objectives:**
- Investigate PostScript's invention at Adobe (1982)
- Understand vector graphics revolution
- Document impact on desktop publishing
- Explore connection to modern PDF format

**Legendary Reward:**
Memory Fragment: "The Vector Prophet" - John Warnock's vision transformed pixels into vectors, creating the language that would speak to every printer. PostScript became the tongue that taught machines to dream in curves...

**Difficulty:** ⭐⭐⭐
**Type:** Historical Research
**XP Reward:** 200
**Special:** VECTOR_MASTERY""",
        "labels": ["side-quest", "historical", "legend", "postscript"]
    },
    {
        "title": "🖼️ Cook's Hidden Surface Algorithm",
        "body": """**Side Quest: Historical Legend**

Explore Robert L. Cook's pioneering work in realistic computer graphics and hidden surface removal.

**Quest Objectives:**
- Study Cook's contribution to ray tracing
- Understand distributed ray tracing
- Research Cook-Torrance reflection model
- Document influence on Pixar's RenderMan

**Legendary Reward:**
Memory Fragment: "The Ray Master" - Robert Cook traced light's path backward, teaching computers to see as eyes see. His algorithms painted shadows with mathematical precision, birthing photorealism from pure logic...

**Difficulty:** ⭐⭐⭐⭐
**Type:** Technical History  
**XP Reward:** 250
**Special:** RAYTRACING_WISDOM""",
        "labels": ["side-quest", "historical", "raytracing", "pixar"]
    },
    {
        "title": "🎨 Thalmann's Character Animation",
        "body": """**Side Quest: Historical Legend**

Investigate Nadia Magnenat Thalmann's groundbreaking work in character animation and virtual humans.

**Quest Objectives:**
- Research virtual human creation techniques
- Study facial animation breakthroughs
- Explore MIRALab's contributions
- Document influence on modern character animation

**Legendary Reward:**
Memory Fragment: "The Life Giver" - Nadia Thalmann breathed souls into digital vessels. Her virtual humans walked the uncanny valley, teaching pixels to express the deepest human emotions...

**Difficulty:** ⭐⭐⭐
**Type:** Character Animation
**XP Reward:** 225
**Special:** ANIMATION_MASTERY""",
        "labels": ["side-quest", "historical", "animation", "character"]
    },

    # Mathematical Mysteries (9-11)  
    {
        "title": "📐 Bezier's Curve Magic",
        "body": """**Side Quest: Mathematical Mystery**

Unlock the secrets of Pierre Bézier's revolutionary curve mathematics that powers all modern graphics.

**Quest Objectives:**
- Master Bézier curve mathematics
- Understand control point theory
- Implement curve interpolation
- Explore applications in fonts and graphics

**Legendary Reward:**
Memory Fragment: "The Curve Whisperer" - Pierre Bézier saw beauty in mathematical control. His curves bent to will while maintaining perfect smoothness, teaching computers the gentle art of graceful motion...

**Difficulty:** ⭐⭐⭐⭐⭐
**Type:** Mathematical
**XP Reward:** 300
**Special:** CURVE_MASTERY""",
        "labels": ["side-quest", "mathematical", "bezier", "curves"]
    },
    {
        "title": "🌀 Perlin's Noise Revolution",
        "body": """**Side Quest: Mathematical Mystery**

Decode Ken Perlin's procedural noise algorithms that create natural-looking textures and terrain.

**Quest Objectives:**
- Understand Perlin noise mathematics
- Implement noise generation algorithms
- Create procedural textures
- Explore applications in terrain generation

**Legendary Reward:**
Memory Fragment: "The Chaos Tamer" - Ken Perlin found order within randomness. His noise functions whispered the language of clouds, waves, and stone - teaching computers to paint with nature's own brush...

**Difficulty:** ⭐⭐⭐⭐
**Type:** Procedural Generation
**XP Reward:** 275
**Special:** PROCEDURAL_WISDOM""",
        "labels": ["side-quest", "mathematical", "perlin", "procedural"]
    },
    {
        "title": "🔄 Fourier's Transform Power",
        "body": """**Side Quest: Mathematical Mystery**

Harness the power of Fourier Transforms in digital signal processing and image analysis.

**Quest Objectives:**
- Master Fourier Transform theory
- Understand frequency domain analysis
- Implement FFT algorithms
- Apply to image filtering and compression

**Legendary Reward:**
Memory Fragment: "The Frequency Sage" - Joseph Fourier revealed that all signals hide frequencies within. His transforms let us see images as symphonies, teaching pixels to dance to mathematical music...

**Difficulty:** ⭐⭐⭐⭐⭐
**Type:** Signal Processing
**XP Reward:** 325
**Special:** FREQUENCY_MASTERY""",
        "labels": ["side-quest", "mathematical", "fourier", "dsp"]
    },

    # Philosophical Chronicles (12-14)
    {
        "title": "🤔 Gibson's Cyberspace Vision",
        "body": """**Side Quest: Philosophical Chronicle**

Explore William Gibson's prescient vision of cyberspace and its influence on 3D interface design.

**Quest Objectives:**
- Study "Neuromancer" and cyberspace concepts
- Analyze influence on VR/AR development
- Research cyberpunk aesthetic in 3D design
- Document connections to modern metaverse

**Legendary Reward:**
Memory Fragment: "The Digital Prophet" - William Gibson saw the future in electric dreams. His cyberspace vision taught designers to think beyond screens, imagining worlds where data takes physical form...

**Difficulty:** ⭐⭐⭐
**Type:** Philosophical
**XP Reward:** 200
**Special:** CYBERSPACE_VISION""",
        "labels": ["side-quest", "philosophical", "cyberspace", "gibson"]
    },
    {
        "title": "🧠 Turing's Machine Dreams",
        "body": """**Side Quest: Philosophical Chronicle**

Contemplate Alan Turing's vision of machine intelligence and its implications for computer graphics AI.

**Quest Objectives:**
- Study Turing's computational theory
- Explore AI applications in graphics
- Research machine learning in rendering
- Consider consciousness in digital beings

**Legendary Reward:**
Memory Fragment: "The Mind Architect" - Alan Turing dreamed of thinking machines. His theories echo in every AI that paints pixels, teaching computers not just to process, but to create with intention...

**Difficulty:** ⭐⭐⭐⭐
**Type:** AI Philosophy
**XP Reward:** 250
**Special:** AI_WISDOM""",
        "labels": ["side-quest", "philosophical", "turing", "ai"]
    },
    {
        "title": "🎭 Bauhaus Digital Design",
        "body": """**Side Quest: Philosophical Chronicle**

Discover how Bauhaus design principles revolutionized digital interface and 3D aesthetic theory.

**Quest Objectives:**
- Study Bauhaus design philosophy
- Apply minimalist principles to 3D design
- Research form-follows-function in UI/UX
- Explore geometric abstraction in modeling

**Legendary Reward:**
Memory Fragment: "The Form Philosophers" - Bauhaus masters taught that beauty lies in purpose. Their geometric dreams live on in every clean interface, every purposeful polygon, every function made form...

**Difficulty:** ⭐⭐⭐
**Type:** Design Philosophy
**XP Reward:** 225
**Special:** DESIGN_WISDOM""",
        "labels": ["side-quest", "philosophical", "bauhaus", "design"]
    },

    # Technical Artifacts (15-17)
    {
        "title": "⚡ CUDA's Parallel Power",
        "body": """**Side Quest: Technical Artifact**

Unlock the secrets of NVIDIA's CUDA architecture and GPU-accelerated computing.

**Quest Objectives:**
- Master CUDA programming fundamentals
- Understand parallel computing principles
- Implement GPU-accelerated rendering
- Optimize graphics pipeline performance

**Legendary Reward:**
Memory Fragment: "The Parallel Sage" - NVIDIA's engineers saw that one mind could become thousands. CUDA taught graphics cards to think in parallel, transforming gaming GPUs into computational engines of unlimited power...

**Difficulty:** ⭐⭐⭐⭐⭐
**Type:** GPU Programming
**XP Reward:** 350
**Special:** PARALLEL_MASTERY""",
        "labels": ["side-quest", "technical", "cuda", "gpu"]
    },
    {
        "title": "🌐 WebGL's Browser Revolution",
        "body": """**Side Quest: Technical Artifact**

Master WebGL and the democratization of 3D graphics in web browsers.

**Quest Objectives:**
- Learn WebGL programming fundamentals
- Create interactive 3D web experiences
- Understand OpenGL ES integration
- Explore WebXR possibilities

**Legendary Reward:**
Memory Fragment: "The Web Liberator" - WebGL freed 3D graphics from native application chains. Browsers became canvases, teaching the web to dream in three dimensions, making 3D art accessible to all...

**Difficulty:** ⭐⭐⭐⭐
**Type:** Web Graphics
**XP Reward:** 275
**Special:** WEB3D_MASTERY""",
        "labels": ["side-quest", "technical", "webgl", "web"]
    },
    {
        "title": "🎮 Carmack's Engine Mastery",
        "body": """**Side Quest: Technical Artifact**

Study John Carmack's revolutionary game engine optimizations and rendering techniques.

**Quest Objectives:**
- Analyze Doom/Quake engine innovations
- Understand BSP tree optimization
- Research fast inverse square root
- Study modern engine architecture

**Legendary Reward:**
Memory Fragment: "The Engine Prophet" - John Carmack made impossible framerates possible. His optimizations taught computers to render worlds in real-time, birthing the age where games became interactive movies...

**Difficulty:** ⭐⭐⭐⭐⭐
**Type:** Game Engine
**XP Reward:** 325
**Special:** ENGINE_MASTERY""",
        "labels": ["side-quest", "technical", "carmack", "engine"]
    },

    # Final Transcendence Quest (18)
    {
        "title": "🌟 The Unity of All Things",
        "body": """**Final Side Quest: Transcendent Knowledge**

The ultimate side quest that synthesizes all knowledge from the 3D pipeline journey and side quest lore.

**Quest Objectives:**
- Integrate all learned concepts into a master project
- Demonstrate understanding of historical progression
- Apply mathematical principles creatively
- Embody philosophical design thinking
- Showcase technical mastery

**Legendary Reward:**
Memory Fragment: "The Digital Enlightenment" - You have walked among the giants, learned their secrets, mastered their arts. The past and future converge in your understanding. You are no longer student but teacher, no longer follower but leader in the endless dance of digital creation...

**Difficulty:** ⭐⭐⭐⭐⭐⭐
**Type:** Transcendent Synthesis
**XP Reward:** 500
**Special:** DIGITAL_ENLIGHTENMENT""",
        "labels": ["side-quest", "transcendent", "mastery", "synthesis"]
    }
]

def create_side_quest_issue(quest_data):
    """Create a single side quest GitHub issue"""
    try:
        # Build the gh issue create command
        cmd = [
            'gh', 'issue', 'create',
            '--title', quest_data['title'],
            '--body', quest_data['body'],
            '--label', ','.join(quest_data['labels'])
        ]
        
        print(f"Creating: {quest_data['title']}")
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        
        # Extract issue number from the output (e.g., "https://github.com/Studio-Dashosa/abstract-garden-video/issues/84")
        issue_url = result.stdout.strip()
        issue_number = issue_url.split('/')[-1]
        
        print(f"✅ Created issue #{issue_number}: {quest_data['title']}")
        return issue_number
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to create issue: {e}")
        print(f"Error output: {e.stderr}")
        return None

def main():
    print("🔮 Forging the Remaining 13 Legendary Side Quests...")
    print(f"📜 Creating {len(REMAINING_SIDE_QUESTS)} epic tales...\n")
    
    created_issues = []
    
    for i, quest in enumerate(REMAINING_SIDE_QUESTS, 1):
        print(f"[{i}/{len(REMAINING_SIDE_QUESTS)}] ", end="")
        issue_number = create_side_quest_issue(quest)
        
        if issue_number:
            created_issues.append(issue_number)
        
        # Small delay to avoid rate limiting
        time.sleep(1)
        print()
    
    print("=" * 60)
    print(f"🎉 Side Quest Forge Complete!")
    print(f"📊 Created {len(created_issues)} out of {len(REMAINING_SIDE_QUESTS)} quests")
    
    if created_issues:
        print(f"\n🔗 Created Issues: #{', #'.join(created_issues)}")
        print("\n🎮 Next Steps:")
        print("1. Add these issues to GitHub Project #2")
        print("2. Update the dashboard to include all 18 side quests")
        print("3. Create memory fragments for each quest")
        print("4. Test the complete side quest system")
        
        # Generate the command to add all issues to project
        print(f"\n📋 Add to Project Command:")
        add_commands = []
        for issue_num in created_issues:
            add_commands.append(f"gh project item-add 2 --owner Studio-Dashosa --url https://github.com/Studio-Dashosa/abstract-garden-video/issues/{issue_num}")
        
        print("# Run these commands to add all issues to Project #2:")
        for cmd in add_commands:
            print(cmd)
    
    print("\n🌟 The legendary side quest collection is nearly complete!")
    print("💫 18 tales of digital mastery await brave adventurers!")

if __name__ == "__main__":
    main()
