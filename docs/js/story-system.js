// FromSoft-style story fragments unlocked by completing issues
const MEMORY_STORIES = {
  // Sprint 1: Foundation (Issues 1-20)
  1: {
    title: "The First Installation",
    story: "In the beginning, there was only darkness. The ancient codex spoke of Maya, a tool of creation lost to time. You reach for the installer, fingers trembling with anticipation. The first seal breaks...",
    audio: "memory_01_installation.mp3",
    reward: { xp: 100, coins: 50 }
  },
  2: {
    title: "Touch of the Digital",
    story: "Your hands move across the interface, foreign yet familiar. Each button press echoes through the void. The machine responds, awakening from its slumber. You have made first contact...",
    audio: "memory_02_first_touch.mp3",
    reward: { xp: 120, coins: 60 }
  },
  3: {
    title: "Understanding Dawns",
    story: "Clarity pierces the confusion like sunlight through ancient stained glass. The tools reveal their purpose. You are no longer a stranger in this digital realm...",
    audio: "memory_03_understanding.mp3",
    reward: { xp: 150, coins: 75 }
  },
  4: {
    title: "Foundation Stones",
    story: "Each skill learned becomes a cornerstone of something greater. The foundation strengthens beneath your feet. You sense the weight of possibilities...",
    audio: "memory_04_foundation.mp3",
    reward: { xp: 180, coins: 90 }
  },
  5: {
    title: "The Character's Soul",
    story: "From formless void, you breathe life into pixels. Vertices become flesh, textures become skin. You are becoming a creator of worlds...",
    audio: "memory_05_character.mp3",
    reward: { xp: 200, coins: 100 }
  },
  
  // Sprint 2: Mastery (Issues 21-35)
  21: {
    title: "Effects of Power",
    story: "Light bends to your will. Particles dance at your command. The very fabric of reality becomes malleable in your hands...",
    audio: "memory_21_effects.mp3",
    reward: { xp: 250, coins: 125 }
  },
  22: {
    title: "Environmental Genesis",
    story: "Worlds spring forth from imagination. Mountains rise, oceans flow, skies burn with digital fire. You are architect of infinite realms...",
    audio: "memory_22_environment.mp3",
    reward: { xp: 300, coins: 150 }
  },
  
  // Sprint 3: Mastery (Issues 36-49)  
  36: {
    title: "The Rendering Light",
    story: "In the final moments, light reveals truth. Every pixel placed with purpose, every shadow cast with intent. The vision becomes reality...",
    audio: "memory_36_rendering.mp3",
    reward: { xp: 400, coins: 200 }
  },
  49: {
    title: "Portfolio Transcendence",
    story: "You stand before the completed work, no longer student but master. The journey transforms both creator and creation. The cycle completes, yet begins anew...",
    audio: "memory_49_transcendence.mp3",
    reward: { xp: 1000, coins: 500, achievement: "DIGITAL_ASCENSION" }
  }
};

// Side Quest Memory Fragments (special knowledge unlocked from GitHub issues)
const SIDE_QUEST_MEMORIES = {
  79: {
    title: "Sutherland's Constraint",
    story: "In 1963, Ivan Sutherland drew the first digital line. With Sketchpad, he opened the door between thought and pixel. Every constraint becomes possibility...",
    audio: "side_quest_sutherland.mp3",
    reward: { xp: 150, coins: 100, special: "PIONEER_WISDOM" },
    type: "historical"
  },
  80: {
    title: "The Utah Teapot",
    story: "Martin Newell needed a test model - complex enough to challenge, simple enough to understand. His teapot became legend, the digital grail of computer graphics...",
    audio: "side_quest_teapot.mp3", 
    reward: { xp: 200, coins: 150, special: "SACRED_GEOMETRY" },
    type: "artifact"
  },
  81: {
    title: "Phong's Shadow",
    story: "Bui Tuong Phong saw light differently. His shading algorithm made surfaces breathe with realistic illumination. In mathematical beauty, he found visual truth...",
    audio: "side_quest_phong.mp3",
    reward: { xp: 175, coins: 125, special: "ILLUMINATION_MASTERY" },
    type: "technique"
  },
  82: {
    title: "The Blender Fund", 
    story: "Ton Roosendaal's vision: free the tools, liberate creativity. From proprietary chains, he forged open-source freedom. The community became the creation...",
    audio: "side_quest_blender.mp3",
    reward: { xp: 250, coins: 200, special: "OPEN_SOURCE_SPIRIT" },
    type: "philosophy"
  },
  83: {
    title: "The Golden Ratio",
    story: "φ = 1.618... In this number lies nature's composition secret. From nautilus shells to galaxy spirals, the divine proportion guides all beautiful things...",
    audio: "side_quest_golden.mp3",
    reward: { xp: 300, coins: 250, special: "DIVINE_PROPORTION" },
    type: "mathematical"
  }
};

// XP and Coin calculation system
const PROGRESSION_SYSTEM = {
  baseXP: 100,
  xpMultiplier: 1.2,
  baseCoinValue: 50,
  coinMultiplier: 1.15,
  
  // Level calculation (FromSoft style - exponential)
  calculateLevel: (totalXP) => {
    return Math.floor(Math.sqrt(totalXP / 100)) + 1;
  },
  
  // Portfolio value calculation 
  calculatePortfolioValue: (completedTasks, level) => {
    const baseValue = completedTasks * 150;
    const levelBonus = level * 500;
    const masterworkBonus = completedTasks >= 49 ? 10000 : 0;
    return baseValue + levelBonus + masterworkBonus;
  },
  
  // Achievement thresholds
  achievements: {
    FIRST_STEPS: { threshold: 1, title: "First Steps", reward: 200 },
    APPRENTICE: { threshold: 10, title: "Digital Apprentice", reward: 500 },
    JOURNEYMAN: { threshold: 25, title: "Pixel Journeyman", reward: 1000 },
    MASTER: { threshold: 40, title: "Render Master", reward: 2000 },
    TRANSCENDENT: { threshold: 49, title: "Digital Ascension", reward: 5000 }
  }
};

// Story progression unlocks
const STORY_PROGRESSION = {
  // Main narrative beats triggered by milestone completions
  milestones: {
    1: "The ancient servers hum to life. Your journey into the digital realm begins...",
    5: "Mastery of basic forms grants you access to deeper mysteries...",
    10: "The first seal breaks. Advanced techniques become available...",
    20: "Sprint One complete. The Foundation Phase ends in triumph...",
    25: "Halfway through your trials. The machine spirits take notice...",
    35: "Sprint Two mastered. Environmental powers awakened...",
    40: "The final threshold approaches. Mastery within reach...",
    49: "All seals broken. You have achieved Digital Ascension..."
  },
  
  // Side quest unlocks (expansion content)
  sideQuests: {
    golaem: { unlock: 30, title: "The Crowd Mysteries" },
    maxIntegration: { unlock: 25, title: "The Ancient Alliances" },
    solidworks: { unlock: 35, title: "Engineering Transcendence" },
    integration: { unlock: 45, title: "The Final Integration" }
  }
};

export { MEMORY_STORIES, SIDE_QUEST_MEMORIES, PROGRESSION_SYSTEM, STORY_PROGRESSION };
