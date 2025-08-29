/**
 * Task Value System - Varied XP/Coin rewards based on complexity
 * Each task has drastically different values based on difficulty
 */

const TASK_VALUES = {
  // Sprint 1 - Foundation (Issues #70-77) - Lower values for learning tasks
  70: { xp: 50, coins: 25, name: "Install Maya 2024", difficulty: "Tutorial", value: "$15" },
  71: { xp: 50, coins: 25, name: "Install Blender 3.6", difficulty: "Tutorial", value: "$15" },
  72: { xp: 75, coins: 35, name: "Install Houdini", difficulty: "Tutorial", value: "$20" },
  73: { xp: 100, coins: 50, name: "Test Maya", difficulty: "Basic", value: "$30" },
  74: { xp: 100, coins: 50, name: "Test Blender", difficulty: "Basic", value: "$30" },
  75: { xp: 200, coins: 100, name: "Create base geometry", difficulty: "Intermediate", value: "$60" },
  76: { xp: 150, coins: 75, name: "Apply smoothing", difficulty: "Basic", value: "$45" },
  77: { xp: 150, coins: 75, name: "Export FBX", difficulty: "Basic", value: "$45" },

  // Sprint 2 - Development (Issues #31-56) - Medium values for production work
  31: { xp: 300, coins: 150, name: "Model simple furniture", difficulty: "Intermediate", value: "$90" },
  32: { xp: 250, coins: 125, name: "Create UV maps", difficulty: "Intermediate", value: "$75" },
  33: { xp: 350, coins: 175, name: "Apply textures", difficulty: "Intermediate", value: "$105" },
  34: { xp: 400, coins: 200, name: "Set up shaders", difficulty: "Advanced", value: "$120" },
  35: { xp: 500, coins: 250, name: "Create robot model", difficulty: "Advanced", value: "$150" },
  36: { xp: 450, coins: 225, name: "Rig character", difficulty: "Advanced", value: "$135" },
  37: { xp: 350, coins: 175, name: "Animate walk cycle", difficulty: "Intermediate", value: "$105" },
  38: { xp: 400, coins: 200, name: "Animate actions", difficulty: "Advanced", value: "$120" },
  39: { xp: 600, coins: 300, name: "Build underwater city", difficulty: "Expert", value: "$180" },
  40: { xp: 500, coins: 250, name: "Design modular buildings", difficulty: "Advanced", value: "$150" },
  41: { xp: 450, coins: 225, name: "Create street props", difficulty: "Advanced", value: "$135" },
  42: { xp: 550, coins: 275, name: "Build complete scene", difficulty: "Expert", value: "$165" },
  43: { xp: 300, coins: 150, name: "Three-point lighting", difficulty: "Intermediate", value: "$90" },
  44: { xp: 350, coins: 175, name: "HDRI setup", difficulty: "Intermediate", value: "$105" },
  45: { xp: 400, coins: 200, name: "Light animation", difficulty: "Advanced", value: "$120" },
  46: { xp: 450, coins: 225, name: "Atmosphere effects", difficulty: "Advanced", value: "$135" },
  47: { xp: 250, coins: 125, name: "Basic materials", difficulty: "Intermediate", value: "$75" },
  48: { xp: 500, coins: 250, name: "Car paint shader", difficulty: "Advanced", value: "$150" },
  49: { xp: 600, coins: 300, name: "Glass refraction", difficulty: "Expert", value: "$180" },
  50: { xp: 550, coins: 275, name: "Layered textures", difficulty: "Expert", value: "$165" },
  51: { xp: 350, coins: 175, name: "Arnold render", difficulty: "Intermediate", value: "$105" },
  52: { xp: 400, coins: 200, name: "Optimize settings", difficulty: "Advanced", value: "$120" },
  53: { xp: 450, coins: 225, name: "Create AOVs", difficulty: "Advanced", value: "$135" },
  54: { xp: 500, coins: 250, name: "Batch render", difficulty: "Advanced", value: "$150" },
  55: { xp: 700, coins: 350, name: "Particle dust", difficulty: "Expert", value: "$210" },
  56: { xp: 800, coins: 400, name: "Fire simulation", difficulty: "Master", value: "$240" },

  // Sprint 3 - Polish & Advanced (Issues #57-69) - High values for complex tasks
  57: { xp: 900, coins: 450, name: "Ocean simulation", difficulty: "Master", value: "$270" },
  58: { xp: 600, coins: 300, name: "SolidWorks design", difficulty: "Expert", value: "$180" },
  59: { xp: 650, coins: 325, name: "Revit architecture", difficulty: "Expert", value: "$195" },
  60: { xp: 500, coins: 250, name: "CAD integration", difficulty: "Advanced", value: "$150" },
  61: { xp: 450, coins: 225, name: "Production workflow", difficulty: "Advanced", value: "$135" },
  62: { xp: 1000, coins: 500, name: "Golaem crowds", difficulty: "Master", value: "$300" },
  63: { xp: 850, coins: 425, name: "Behavior system", difficulty: "Master", value: "$255" },
  64: { xp: 750, coins: 375, name: "Navigation mesh", difficulty: "Expert", value: "$225" },
  65: { xp: 1200, coins: 600, name: "Stadium crowd", difficulty: "Master", value: "$360" },
  66: { xp: 800, coins: 400, name: "Pipeline unification", difficulty: "Master", value: "$240" },
  67: { xp: 550, coins: 275, name: "Portfolio package", difficulty: "Expert", value: "$165" },
  68: { xp: 1100, coins: 550, name: "Advanced techniques", difficulty: "Master", value: "$330" },
  69: { xp: 400, coins: 200, name: "Final integration", difficulty: "Advanced", value: "$120" },

  // Special tasks
  78: { xp: 0, coins: 0, name: "Dashboard (Auto)", difficulty: "System", value: "$0" },

  // Default for any unmapped tasks
  default: { xp: 100, coins: 50, name: "Unknown Task", difficulty: "Basic", value: "$30" }
};

// Difficulty multipliers for special conditions
const DIFFICULTY_COLORS = {
  "Tutorial": "#4CAF50",      // Green
  "Basic": "#8BC34A",         // Light Green
  "Intermediate": "#FFD700",  // Gold
  "Advanced": "#FF9800",      // Orange
  "Expert": "#FF5722",        // Deep Orange
  "Master": "#F44336",        // Red
  "System": "#9E9E9E"         // Gray
};

// Memory unlock thresholds based on total XP
const MEMORY_UNLOCK_THRESHOLDS = [
  { xp: 0, memories: 1, title: "The First Vertex" },
  { xp: 100, memories: 2, title: "Early Experiments" },
  { xp: 250, memories: 3, title: "The Utah Teapot" },
  { xp: 500, memories: 5, title: "Pixar's Genesis" },
  { xp: 750, memories: 7, title: "SGI Revolution" },
  { xp: 1000, memories: 10, title: "ILM's Magic" },
  { xp: 1500, memories: 13, title: "Maya's Birth" },
  { xp: 2000, memories: 16, title: "The Digital Frontier" },
  { xp: 2500, memories: 20, title: "Shrek's Innovation" },
  { xp: 3000, memories: 24, title: "The Matrix Effect" },
  { xp: 3500, memories: 28, title: "Real-time Revolution" },
  { xp: 4000, memories: 32, title: "Avatar's Vision" },
  { xp: 5000, memories: 36, title: "Procedural Power" },
  { xp: 6000, memories: 40, title: "Neural Rendering" },
  { xp: 7500, memories: 44, title: "The Metaverse" },
  { xp: 10000, memories: 49, title: "Complete Mastery" }
];

// Coin costs for early memory unlocks
const MEMORY_COIN_COSTS = {
  base: 100,  // Base cost for first memory
  multiplier: 1.5  // Each subsequent memory costs 1.5x more
};

// Calculate coin cost for unlocking a specific memory
function getMemoryUnlockCost(memoryIndex) {
  return Math.floor(MEMORY_COIN_COSTS.base * Math.pow(MEMORY_COIN_COSTS.multiplier, memoryIndex - 1));
}

// Get current memory unlock level based on XP
function getMemoryUnlockLevel(totalXP) {
  let unlockedMemories = 0;
  let currentTitle = "Hollow";
  
  for (const threshold of MEMORY_UNLOCK_THRESHOLDS) {
    if (totalXP >= threshold.xp) {
      unlockedMemories = threshold.memories;
      currentTitle = threshold.title;
    } else {
      break;
    }
  }
  
  return { unlockedMemories, currentTitle };
}

// Calculate portfolio value based on completed tasks
function calculatePortfolioValue(completedTaskIds) {
  let totalValue = 0;
  completedTaskIds.forEach(id => {
    const task = TASK_VALUES[id] || TASK_VALUES.default;
    const value = parseInt(task.value.replace('$', ''));
    totalValue += value;
  });
  return totalValue;
}

// Get task by ID with fallback
function getTaskValue(taskId) {
  return TASK_VALUES[taskId] || TASK_VALUES.default;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TASK_VALUES,
    DIFFICULTY_COLORS,
    MEMORY_UNLOCK_THRESHOLDS,
    getMemoryUnlockCost,
    getMemoryUnlockLevel,
    calculatePortfolioValue,
    getTaskValue
  };
}