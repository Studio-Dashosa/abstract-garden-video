// Real Asset Values Based on Market Research
// Each task creates actual sellable 3D assets with precise market value

const ASSET_VALUES = {
    // Part 1 - Foundation ($195 total)
    70: { asset: "Software template", value: 30, category: "foundation" },
    71: { asset: "Software template", value: 30, category: "foundation" },
    72: { asset: "Software template", value: 30, category: "foundation" },
    73: { asset: "Test sphere model", value: 5, category: "foundation" },
    74: { asset: "Test sphere model", value: 5, category: "foundation" },
    75: { asset: "Test sphere model", value: 5, category: "foundation" },
    76: { asset: "Basic primitives pack", value: 25, category: "foundation" },
    77: { asset: "Pipeline setup guide", value: 65, category: "foundation" },
    
    // Part 2 - Core Assets ($1,485 total)
    // Environment Kit
    42: { asset: "Hero tree model", value: 75, category: "models" },
    43: { asset: "Environment kit piece", value: 30, category: "environment" },
    44: { asset: "Environment kit piece", value: 30, category: "environment" },
    45: { asset: "Environment kit piece", value: 30, category: "environment" },
    46: { asset: "Environment kit piece", value: 30, category: "environment" },
    
    // Secondary Models
    47: { asset: "Secondary model", value: 45, category: "models" },
    48: { asset: "Secondary model", value: 45, category: "models" },
    49: { asset: "Secondary model", value: 45, category: "models" },
    50: { asset: "Secondary model", value: 45, category: "models" },
    51: { asset: "Secondary model", value: 45, category: "models" },
    
    // Modular Building Kit
    52: { asset: "Modular building piece", value: 85, category: "architecture" },
    
    // Procedural Shaders
    53: { asset: "Procedural shader", value: 65, category: "shaders" },
    54: { asset: "Procedural shader", value: 65, category: "shaders" },
    55: { asset: "Procedural shader", value: 65, category: "shaders" },
    
    // Texture Packs
    56: { asset: "Texture pack", value: 45, category: "textures" },
    57: { asset: "Texture pack", value: 45, category: "textures" },
    58: { asset: "Texture pack", value: 45, category: "textures" },
    59: { asset: "Texture pack", value: 45, category: "textures" },
    
    // Rigged Assets
    60: { asset: "Rigged tree", value: 95, category: "rigged" },
    
    // Animation Cycles
    61: { asset: "Animation cycle", value: 85, category: "animation" },
    62: { asset: "Animation cycle", value: 85, category: "animation" },
    63: { asset: "Animation cycle", value: 85, category: "animation" },
    
    // Lighting Presets
    64: { asset: "Lighting preset", value: 35, category: "lighting" },
    65: { asset: "Lighting preset", value: 35, category: "lighting" },
    66: { asset: "Lighting preset", value: 35, category: "lighting" },
    
    // Material Library
    67: { asset: "Material library", value: 55, category: "materials" },
    68: { asset: "Material library", value: 55, category: "materials" },
    69: { asset: "Complete material pack", value: 120, category: "materials" },
    
    // Part 3 - Premium Content ($1,320 total)
    // Particle Effects
    22: { asset: "Particle effect", value: 65, category: "effects" },
    23: { asset: "Particle effect", value: 65, category: "effects" },
    24: { asset: "Particle effect", value: 65, category: "effects" },
    
    // Procedural Setups
    25: { asset: "Procedural setup", value: 95, category: "procedural" },
    26: { asset: "Procedural setup", value: 95, category: "procedural" },
    
    // Simulation Caches
    27: { asset: "Simulation cache", value: 55, category: "simulation" },
    28: { asset: "Simulation cache", value: 55, category: "simulation" },
    29: { asset: "Simulation cache", value: 55, category: "simulation" },
    
    // HDRI Pack
    30: { asset: "HDRI environment", value: 75, category: "hdri" },
    31: { asset: "HDRI environment", value: 75, category: "hdri" },
    
    // Complete Scene Files
    32: { asset: "Complete scene file", value: 250, category: "scene" },
    
    // Tutorial Content
    33: { asset: "Tutorial segment", value: 32, category: "tutorial" },
    34: { asset: "Tutorial segment", value: 32, category: "tutorial" },
    35: { asset: "Tutorial segment", value: 33, category: "tutorial" },
    
    // Full Project Files
    36: { asset: "Project file bundle", value: 65, category: "project" },
    37: { asset: "Project file bundle", value: 66, category: "project" },
    38: { asset: "Project file bundle", value: 66, category: "project" },
    
    // Bonus Content
    39: { asset: "Bonus asset", value: 25, category: "bonus" },
    40: { asset: "Bonus asset", value: 25, category: "bonus" },
    41: { asset: "Bonus asset", value: 26, category: "bonus" },
    
    // Side Quests - Additional Premium Assets
    79: { asset: "Historical recreation", value: 75, category: "special" },
    80: { asset: "Utah Teapot variant", value: 45, category: "special" },
    81: { asset: "Phong shader study", value: 85, category: "special" },
    82: { asset: "Open source tribute", value: 55, category: "special" },
    83: { asset: "Golden ratio tool", value: 95, category: "special" }
};

// Calculate actual portfolio value
function calculateRealPortfolioValue(completedTaskNumbers) {
    let totalValue = 0;
    let categoryBreakdown = {};
    
    completedTaskNumbers.forEach(taskNum => {
        const asset = ASSET_VALUES[taskNum];
        if (asset) {
            totalValue += asset.value;
            categoryBreakdown[asset.category] = (categoryBreakdown[asset.category] || 0) + asset.value;
        }
    });
    
    return {
        totalValue: totalValue,
        monthlyPotential: Math.round(totalValue * 0.20), // 20% monthly sell rate
        afterFees: Math.round(totalValue * 0.20 * 0.65), // After CGTrader fees
        categories: categoryBreakdown
    };
}

// Get marketplace recommendations
function getMarketplaceRecommendations(category) {
    const recommendations = {
        'models': 'Best on CGTrader and TurboSquid',
        'environment': 'Unity Asset Store and Unreal Marketplace',
        'shaders': 'Gumroad and ArtStation',
        'animation': 'Mixamo and CGTrader',
        'effects': 'Unity Asset Store',
        'hdri': 'HDRI Haven and Gumroad',
        'tutorial': 'Gumroad and Udemy'
    };
    return recommendations[category] || 'CGTrader (primary marketplace)';
}