#!/bin/bash

echo "🎮 Creating Abstract Garden Side Quests"
echo "======================================"
echo ""
echo "This will create 18 side quest issues on GitHub."
echo "Make sure you're logged in with gh auth status"
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed!"
    echo "Install it with: brew install gh"
    exit 1
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub!"
    echo "Run: gh auth login"
    exit 1
fi

echo "Ready to create side quests?"
read -p "Press Enter to continue or Ctrl+C to cancel..."

# Run the Python script
python3 create_side_quests.py

echo ""
echo "✅ Side quest creation complete!"
echo ""
echo "Next steps:"
echo "1. Check https://github.com/Studio-Dashosa/abstract-garden-video/issues"
echo "2. The dashboard will update automatically via GitHub Actions"
echo "3. Visit https://studio-dashosa.github.io/abstract-garden-video/"
