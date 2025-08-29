# 🎮 Abstract Garden - Player Onboarding Guide

## For Michael (or Anyone) - How to Play

### 🚀 Quick Start - What to Click

1. **Go to the Dashboard**
   ```
   https://studio-dashosa.github.io/abstract-garden-video/
   ```

2. **Pick a Task from GitHub Issues**
   ```
   https://github.com/Studio-Dashosa/abstract-garden-video/issues
   ```
   - Look for issues labeled `Sprint 1` (easiest)
   - Click any open issue
   - Read the task description

3. **Complete the Task**
   - Do the 3D work described in the issue
   - Upload your work (if needed)
   - Comment "Done!" on the issue

4. **Close the Issue to Earn Rewards**
   - Click "Close issue" button
   - Dashboard auto-updates in 30 seconds
   - You earn:
     - 100 XP (Souls)
     - 75 Coins (Embers)
     - Progress toward memory unlocks

5. **Watch Your Progress**
   - Return to dashboard
   - See your level increase
   - Memory fragments unlock automatically
   - Click unlocked memories to read CG history

---

## 🎯 What Each Button/Link Does

### On the Dashboard

| What to Click | What It Does |
|--------------|--------------|
| **Memory Fragment (glowing)** | Shows a FromSoft-style story about CG history |
| **"Voice: Silent" button** | Enables British narrator voice |
| **"Ambience: Silent" button** | Plays atmospheric music |
| **"Read Chronicles" button** | Shows all unlocked stories |
| **Covenant Cards** | Shows hidden story progress (need side quests) |

### On GitHub

| What to Click | What It Does |
|--------------|--------------|
| **"Issues" tab** | Shows all available tasks |
| **Issue title** | Opens task details |
| **"Close issue" button** | Marks task complete, awards XP |
| **Label filters** | Sort by Sprint 1/2/3 difficulty |

---

## 🏆 Game Progression Path

### Level 1-5: "Hollow" → "Unkindled"
1. Start with Sprint 1 issues (#70-77)
2. These are installation and setup tasks
3. Each gives 80 XP (easier multiplier)
4. Unlocks first 5 memory fragments

### Level 6-15: "Bearer of the Curse" → "Code Weaver"
1. Move to Sprint 2 issues (#42-69)
2. Core 3D skills (modeling, animation)
3. Standard 100 XP per task
4. Unlocks memories 6-25

### Level 16-25: "Render Knight" → "Lord of Cinder"
1. Tackle Sprint 3 issues (#22-41)
2. Advanced integration tasks
3. 120 XP per task (harder multiplier)
4. Unlocks memories 26-45

### Level 26+: "Eternal Fragment"
1. Complete side quests (when created)
2. 150 XP + 100 coins per side quest
3. Unlocks hidden covenant stories
4. Final 4 memories + 3 secret stories

---

## 💰 Economy System

### Earning Currency
- **Complete Issue** = 100 XP + 75 Coins
- **Side Quest** = 150 XP + 100 Coins
- **Achievement** = Bonus XP (50-2000)

### Spending Currency
- **Unlock Memory Early** = 500 coins
- **Skip to Next Level** = 1000 coins
- **Unlock Story Branch** = 2000 coins

### Portfolio Value
- Each completed task = +$150 base value
- Every 10 tasks = +$500 bonus
- Complete all 78 = +$15,000 masterwork bonus
- **Total Potential: $6,850**

---

## 🔧 For Developers/Contributors

### How to Add Michael to the Project

1. **As a Collaborator (Full Access)**
   ```bash
   # Project owner runs:
   gh repo add-collaborator Studio-Dashosa/abstract-garden-video michaels-github-username
   ```

2. **As a Contributor (Fork & PR)**
   ```bash
   # Michael runs:
   gh repo fork Studio-Dashosa/abstract-garden-video
   git clone https://github.com/michaels-username/abstract-garden-video
   # Make changes, then:
   gh pr create --title "Complete Sprint 1 Task X"
   ```

3. **Just to Play (Read-Only)**
   - No setup needed!
   - Just visit the dashboard
   - Pick issues and comment solutions
   - Owner closes issues to award points

### How to Test Locally

```bash
# Clone the repo
git clone https://github.com/Studio-Dashosa/abstract-garden-video
cd abstract-garden-video

# Serve the dashboard locally
python3 -m http.server 8000 --directory docs

# Open in browser
open http://localhost:8000
```

### How the Sync Works

1. **GitHub Issue Closed** → 
2. **GitHub Actions Workflow Runs** → 
3. **Updates `docs/data/issues.json`** → 
4. **Dashboard Fetches Data** → 
5. **Game State Updates** → 
6. **XP/Coins Awarded** → 
7. **Memories Unlock** → 
8. **Portfolio Value Increases**

---

## 🎮 Advanced Features

### Keyboard Shortcuts
- `Ctrl+R` - Force sync with GitHub
- `M` - Toggle music
- `V` - Toggle voice
- `ESC` - Close story modal

### Debug Commands (Console)
```javascript
// Check your stats
gameStateManager.getState()

// Manually add XP (testing)
gameStateManager.addXP(100)

// Unlock specific memory
gameStateManager.unlockMemory(15)

// Reset progress
gameStateManager.resetState()
```

### API Endpoints
- Issues Data: `https://studio-dashosa.github.io/abstract-garden-video/data/issues.json`
- Memory Stories: `https://studio-dashosa.github.io/abstract-garden-video/memories.json`
- Audio Narrator: `https://studio-dashosa.github.io/abstract-garden-video/audio-narrator.html`

---

## 📱 Mobile Support

The dashboard is fully responsive. On mobile:
- Tap memory fragments to read stories
- Swipe between covenant cards
- Audio works with headphones
- GitHub issues open in app

---

## 🐛 Troubleshooting

### "Dashboard not updating"
- Wait 30 seconds for auto-refresh
- Or press Ctrl+R to force sync
- Check GitHub Actions: https://github.com/Studio-Dashosa/abstract-garden-video/actions

### "Can't hear voice"
- Check browser supports Web Speech API
- Try different browser (Chrome/Edge work best)
- Volume must be on

### "Issues not showing XP"
- Make sure issue is closed
- Check it's not a pull request
- Verify it's in the main repo (not a fork)

### "Memory won't unlock"
- Need enough XP (check level)
- Or spend 500 coins to unlock early
- Some require side quest completion

---

## 🎯 Quick Reference Card

```
DASHBOARD URL:
https://studio-dashosa.github.io/abstract-garden-video/

ISSUES LIST:
https://github.com/Studio-Dashosa/abstract-garden-video/issues

YOUR STATS:
- Level: Based on total XP (√(XP/100) + 1)
- Portfolio: $150 per task + bonuses
- Memories: Unlock at XP thresholds
- Stories: Complete covenant quests

WHAT TO DO:
1. Pick an issue
2. Do the work
3. Close the issue
4. Get rewards
5. Read unlocked memories
6. Level up
7. Repeat until Lord of Cinder
```

---

## Need Help?

- **Dashboard Issues**: Check the console (F12)
- **GitHub Issues**: Ask in comments
- **Game Mechanics**: This guide
- **Technical Setup**: See README.md