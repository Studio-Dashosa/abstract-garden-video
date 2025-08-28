#!/bin/bash

# Complete Integration Script for Abstract Garden
# This script creates side quests and updates the dashboard

echo "🎮 ABSTRACT GARDEN - COMPLETE SYSTEM INTEGRATION"
echo "================================================"
echo ""

# Check if we're in the right directory
if [ ! -f "create_side_quests.py" ]; then
    echo "❌ Error: create_side_quests.py not found!"
    echo "Please run this script from the project root."
    exit 1
fi

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ Error: GitHub CLI (gh) is not installed!"
    echo "Please install it first: brew install gh"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Error: Not authenticated with GitHub!"
    echo "Please run: gh auth login"
    exit 1
fi

echo "📍 Step 1: Creating Side Quest Issues"
echo "-------------------------------------"
echo "This will create 18 side quest issues on GitHub..."
echo ""
read -p "Do you want to create the side quest issues? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    python3 create_side_quests.py
    
    if [ $? -eq 0 ]; then
        echo "✅ Side quests created successfully!"
    else
        echo "⚠️ Some issues creating side quests. Check the output above."
    fi
else
    echo "⏭️ Skipping side quest creation."
fi

echo ""
echo "📍 Step 2: Updating Issues Data"
echo "-------------------------------"
echo "Fetching latest issues from GitHub..."

# Fetch latest issues and save to docs/data/issues.json
REPO="Studio-Dashosa/abstract-garden-video"
OUTPUT_FILE="docs/data/issues.json"

# Create data directory if it doesn't exist
mkdir -p docs/data

# Fetch all issues (including closed ones)
echo "Fetching issues from GitHub API..."
gh api "repos/${REPO}/issues?state=all&per_page=100" > "${OUTPUT_FILE}"

if [ $? -eq 0 ]; then
    echo "✅ Issues data updated successfully!"
    echo "   Saved to: ${OUTPUT_FILE}"
else
    echo "❌ Failed to fetch issues data"
fi

echo ""
echo "📍 Step 3: Committing Changes"
echo "-----------------------------"

# Check if there are changes to commit
if [[ $(git status --porcelain) ]]; then
    echo "Changes detected. Creating commit..."
    
    git add .
    git commit -m "🎮 Complete XP/Coin/Memory system integration

- Added comprehensive game state manager
- Integrated XP and coin earning system
- Connected memory unlocking mechanics
- Added side quest reward system
- Created story progression panels
- Implemented achievement system
- Added purchase memories with coins feature
- Connected all systems to GitHub issues

System Features:
- FromSoft-style level progression (1-20)
- 49 memory fragments with XP thresholds
- 18 side quests in 3 story groups
- Coin-based early memory unlocks
- Real portfolio value tracking
- Achievement notifications
- British VO narrator integration

Total System Value: \$6,850 potential earnings"
    
    echo "✅ Changes committed!"
    
    read -p "Push to GitHub? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push origin main
        echo "✅ Pushed to GitHub!"
    else
        echo "⏭️ Skipping push. You can push later with: git push origin main"
    fi
else
    echo "No changes to commit."
fi

echo ""
echo "🎯 SYSTEM STATUS"
echo "================"
echo ""
echo "✅ Game State Manager: docs/js/game-state.js"
echo "✅ Dashboard Integration: docs/js/dashboard-integration.js"
echo "✅ Updated Dashboard: docs/index.html"
echo "✅ Side Quest System: 18 quests ready"
echo "✅ Memory System: 49 fragments with XP/coin unlocking"
echo "✅ Story System: 3 hidden stories to unlock"
echo ""
echo "📊 VALUE BREAKDOWN:"
echo "- Main Tasks (49): \$3,000"
echo "- Side Quests (18): \$1,650"
echo "- Story Bonuses: \$2,200"
echo "- Total Potential: \$6,850"
echo ""
echo "🌐 ACCESS YOUR DASHBOARD:"
echo "https://studio-dashosa.github.io/abstract-garden-video/"
echo ""
echo "🎮 THE COMPLETE SYSTEM IS NOW ACTIVE!"
echo ""
echo "Instructions:"
echo "1. Complete GitHub issues to earn XP and coins"
echo "2. XP automatically unlocks memory fragments"
echo "3. Use coins to unlock memories early"
echo "4. Complete side quests to unlock hidden stories"
echo "5. Reach level 20 to achieve Digital Deity status"
echo ""
echo "Happy learning! 🚀"
