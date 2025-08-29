#!/bin/bash

echo "🏷️ Creating labels for Abstract Garden..."

# Create the main labels
gh label create "side-quest" --repo Studio-Dashosa/abstract-garden-video --color D4AF37 --description "Optional side quest for bonus XP" 2>/dev/null || echo "side-quest label exists"
gh label create "forgotten-women" --repo Studio-Dashosa/abstract-garden-video --color 8B4789 --description "The Forgotten Women covenant" 2>/dev/null || echo "forgotten-women label exists"
gh label create "eastern-masters" --repo Studio-Dashosa/abstract-garden-video --color 4169E1 --description "The Eastern Masters covenant" 2>/dev/null || echo "eastern-masters label exists"
gh label create "open-source" --repo Studio-Dashosa/abstract-garden-video --color 2F4F2F --description "The Open Source Heroes covenant" 2>/dev/null || echo "open-source label exists"
gh label create "Sprint 1" --repo Studio-Dashosa/abstract-garden-video --color FFD700 --description "Foundation tasks" 2>/dev/null || echo "Sprint 1 label exists"
gh label create "Sprint 2" --repo Studio-Dashosa/abstract-garden-video --color FFA500 --description "Core skills tasks" 2>/dev/null || echo "Sprint 2 label exists"
gh label create "Sprint 3" --repo Studio-Dashosa/abstract-garden-video --color FF6347 --description "Advanced tasks" 2>/dev/null || echo "Sprint 3 label exists"

echo "✅ Labels created! Now run: python3 create_side_quests.py"