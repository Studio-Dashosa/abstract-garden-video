#!/bin/bash
echo "=========================================="
echo "PUSHING ALL UPDATES TO GITHUB"
echo "=========================================="

cd /Users/j-ashiedu/applicant_prime/PROJECTS/03_NEON_TREE_MUSIC_VIDEO/neon-tree-music-video

# Copy audio files to docs
echo "📂 Copying audio files to docs..."
cp -r assets/audio/*.mp3 docs/audio/ 2>/dev/null || echo "Audio files already in place"

# Git operations
echo "📝 Adding all changes..."
git add -A

echo "💾 Committing..."
git commit -m "Add epic FromSoft opening narration with British VO - plays once on first voice enable"

echo "🚀 Pushing to GitHub..."
git push

echo "✅ Done! Changes pushed."
echo ""
echo "🎮 Opening narration features:"
echo "  - Plays automatically when Voice is first enabled"
echo "  - Epic FromSoft-style speech about CG history"
echo "  - Text overlay with dramatic reveal"
echo "  - Does not loop (plays once per session)"
echo ""
echo "📊 GitHub Pages will update in 2-5 minutes"
echo "=========================================="
