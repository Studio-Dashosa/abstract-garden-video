#!/bin/bash

echo "🎮 Testing GitHub CLI..."

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "Installing with Homebrew..."
    brew install gh
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub"
    echo "Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is ready!"

# Create just one test side quest
echo ""
echo "Creating test side quest..."

gh issue create \
  --repo Studio-Dashosa/abstract-garden-video \
  --title "Side Quest: Adele Goldberg's Smalltalk Legacy" \
  --body "**Hidden Quest Unlocked!**

Research and document Adele Goldberg's contributions to Smalltalk and GUI development at Xerox PARC.

**Objectives:**
- Research her role in developing Smalltalk-80
- Document her influence on modern object-oriented programming
- Create a tribute render using her programming concepts

**Rewards:**
- 200 Souls
- 150 Embers
- Memory Fragment: \"The Mother of Objects\"

**Quest Type:** The Forgotten Women
**Difficulty:** ★★★☆☆" \
  --label "side-quest" \
  --label "forgotten-women" \
  --label "research"

echo ""
echo "✅ Test complete! Check if the issue was created on GitHub."
