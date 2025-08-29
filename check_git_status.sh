#!/bin/bash
echo "==================================="
echo "GIT STATUS CHECK"
echo "==================================="

cd /Users/j-ashiedu/applicant_prime/PROJECTS/03_NEON_TREE_MUSIC_VIDEO/neon-tree-music-video

echo -e "\n📍 Current Branch:"
git branch --show-current

echo -e "\n📊 Git Status:"
git status --short

echo -e "\n📝 Last 5 Commits:"
git log --oneline -5

echo -e "\n🔗 Remote URL:"
git remote get-url origin

echo -e "\n🚀 Checking if up-to-date with remote:"
git fetch
git status -uno

echo -e "\n✅ Files in docs folder:"
ls -la docs/

echo -e "\n🎵 Audio files:"
ls -la docs/audio/

echo -e "\n📜 JavaScript files:"
ls -la docs/js/

echo "==================================="
echo "CHECK COMPLETE"
echo "==================================="
