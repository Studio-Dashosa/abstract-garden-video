// Actual Task Values from Documentation
const TASK_VALUES = {
    // Sprint 1: Foundation (Issues 70-77)
    70: { xp: 25, coins: 10, time: '15min' },  // Install Blender
    71: { xp: 25, coins: 10, time: '15min' },  // Setup workspace
    72: { xp: 50, coins: 25, time: '30min' },  // Create first cube
    73: { xp: 50, coins: 25, time: '30min' },  // Apply material
    74: { xp: 75, coins: 50, time: '45min' },  // Basic lighting
    75: { xp: 100, coins: 75, time: '1hr' },   // First render
    76: { xp: 25, coins: 10, time: '10min' },  // Save project
    77: { xp: 50, coins: 25, time: '15min' },  // Join community
    
    // Sprint 2: Core Skills (Issues 42-69)
    42: { xp: 100, coins: 60, time: '2hr' },   // Basic modeling
    43: { xp: 100, coins: 60, time: '2hr' },
    44: { xp: 100, coins: 60, time: '2hr' },
    45: { xp: 100, coins: 60, time: '2hr' },
    46: { xp: 150, coins: 90, time: '3hr' },   // UV unwrapping
    47: { xp: 150, coins: 90, time: '3hr' },
    48: { xp: 150, coins: 90, time: '3hr' },
    49: { xp: 150, coins: 90, time: '3hr' },
    50: { xp: 200, coins: 120, time: '4hr' },  // Texturing
    51: { xp: 200, coins: 120, time: '4hr' },
    52: { xp: 200, coins: 120, time: '4hr' },
    53: { xp: 200, coins: 120, time: '4hr' },
    54: { xp: 250, coins: 150, time: '5hr' },  // Animation basics
    55: { xp: 250, coins: 150, time: '5hr' },
    56: { xp: 250, coins: 150, time: '5hr' },
    57: { xp: 250, coins: 150, time: '5hr' },
    58: { xp: 300, coins: 180, time: '6hr' },  // Rigging
    59: { xp: 300, coins: 180, time: '6hr' },
    60: { xp: 300, coins: 180, time: '6hr' },
    61: { xp: 300, coins: 180, time: '6hr' },
    62: { xp: 350, coins: 210, time: '7hr' },  // Lighting/Rendering
    63: { xp: 350, coins: 210, time: '7hr' },
    64: { xp: 350, coins: 210, time: '7hr' },
    65: { xp: 350, coins: 210, time: '7hr' },
    66: { xp: 400, coins: 240, time: '8hr' },  // Compositing
    67: { xp: 400, coins: 240, time: '8hr' },
    68: { xp: 400, coins: 240, time: '8hr' },
    69: { xp: 400, coins: 240, time: '8hr' },
    
    // Sprint 3: Advanced (Issues 22-41)
    22: { xp: 500, coins: 300, time: '10hr' }, // Character animation
    23: { xp: 500, coins: 300, time: '10hr' },
    24: { xp: 500, coins: 300, time: '10hr' },
    25: { xp: 500, coins: 300, time: '10hr' },
    26: { xp: 750, coins: 450, time: '15hr' }, // Dynamics/Simulation
    27: { xp: 750, coins: 450, time: '15hr' },
    28: { xp: 750, coins: 450, time: '15hr' },
    29: { xp: 750, coins: 450, time: '15hr' },
    30: { xp: 600, coins: 360, time: '12hr' }, // Procedural modeling
    31: { xp: 600, coins: 360, time: '12hr' },
    32: { xp: 600, coins: 360, time: '12hr' },
    33: { xp: 600, coins: 360, time: '12hr' },
    34: { xp: 800, coins: 480, time: '16hr' }, // Pipeline integration
    35: { xp: 800, coins: 480, time: '16hr' },
    36: { xp: 800, coins: 480, time: '16hr' },
    37: { xp: 800, coins: 480, time: '16hr' },
    38: { xp: 1000, coins: 600, time: '20hr' }, // Final projects
    39: { xp: 1000, coins: 600, time: '20hr' },
    40: { xp: 1000, coins: 600, time: '20hr' },
    41: { xp: 1000, coins: 600, time: '20hr' },
    
    // Side Quests (when available)
    79: { xp: 150, coins: 100, time: '2hr' },
    80: { xp: 150, coins: 100, time: '2hr' },
    81: { xp: 200, coins: 120, time: '3hr' },
    82: { xp: 250, coins: 150, time: '4hr' },
    83: { xp: 350, coins: 210, time: '5hr' }
};

// Portfolio value calculation from documentation
function calculatePortfolioValue(completedTaskNumbers) {
    let baseValue = completedTaskNumbers.length * 100;
    
    // Count side quests
    const sideQuests = completedTaskNumbers.filter(n => n >= 79 && n <= 83).length;
    const sideQuestBonus = sideQuests * 75;
    
    // Calculate level from XP
    const totalXP = completedTaskNumbers.reduce((sum, n) => {
        return sum + (TASK_VALUES[n]?.xp || 50);
    }, 0);
    const level = calculateLevel(totalXP);
    const levelBonus = Math.floor(level / 5) * 500;
    
    // Story bonus (stories unlock at certain milestones)
    let storyBonus = 0;
    if (completedTaskNumbers.length >= 10) storyBonus += 200; // Story 2
    if (completedTaskNumbers.length >= 20) storyBonus += 200; // Story 3
    // Side quest group stories would add more
    
    // Masterwork bonus only at 100% completion (all 67 tasks)
    const masterworkBonus = completedTaskNumbers.length === 67 ? 5000 : 0;
    
    return {
        base: baseValue,
        sideQuests: sideQuestBonus,
        level: levelBonus,
        story: storyBonus,
        masterwork: masterworkBonus,
        total: baseValue + sideQuestBonus + levelBonus + storyBonus + masterworkBonus
    };
}

// Level calculation from documentation
function calculateLevel(totalXP) {
    if (totalXP < 100) return 1;
    if (totalXP < 300) return 2;
    if (totalXP < 600) return 3;
    if (totalXP < 1000) return 4;
    if (totalXP < 1500) return 5;
    
    // After level 5, uses formula
    return Math.floor(5 + Math.sqrt((totalXP - 1500) / 500));
}

// Memory unlock thresholds
const MEMORY_THRESHOLDS = [
    0,     // Memory 1
    50,    // Memory 2
    100,   // Memory 3
    200,   // Memory 4
    350,   // Memory 5
    500,
    700,
    900,
    1200,
    1500,  // Memory 10
    1800,
    2200,
    2600,
    3000,
    3500,  // Memory 15
    4000,
    4500,
    5000,
    5500,
    6000,  // Memory 20
    6500,
    7000,
    7500,
    8000,
    8500,  // Memory 25
    9000,
    9500,
    10000,
    11000,
    12000, // Memory 30
    13000,
    14000,
    15000,
    16000,
    17000, // Memory 35
    18000,
    19000,
    20000,
    21000,
    22000, // Memory 40
    23000,
    24000,
    25000,
    26000,
    27000, // Memory 45
    28000,
    29000,
    29500,
    30000  // Memory 49
];
