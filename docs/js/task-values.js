// Realistic Task Valuation System
// Based on actual complexity, time required, and market rates

const TASK_VALUES = {
    // Issue #70-74: Software Installation (Sprint 1 - Foundation)
    70: { xp: 10, coins: 5, value: 0, time: '30min', complexity: 'trivial', skill: 'none' }, // Install Maya
    71: { xp: 10, coins: 5, value: 0, time: '15min', complexity: 'trivial', skill: 'none' }, // Install Blender
    72: { xp: 10, coins: 5, value: 0, time: '30min', complexity: 'trivial', skill: 'none' }, // Install Houdini
    73: { xp: 25, coins: 10, value: 25, time: '15min', complexity: 'easy', skill: 'basic' }, // Test Maya - create sphere
    74: { xp: 25, coins: 10, value: 25, time: '15min', complexity: 'easy', skill: 'basic' }, // Test Blender - create sphere
    
    // Issue #75-77: Basic Modeling (Sprint 1)
    75: { xp: 50, coins: 25, value: 50, time: '1hr', complexity: 'easy', skill: 'modeling' }, // Create subdivided cube
    76: { xp: 40, coins: 20, value: 40, time: '30min', complexity: 'easy', skill: 'modeling' }, // Apply smoothing
    77: { xp: 30, coins: 15, value: 30, time: '15min', complexity: 'easy', skill: 'basic' }, // Export FBX
    
    // Issue #22-41: Animation Tasks (Sprint 2)
    22: { xp: 150, coins: 75, value: 200, time: '4hr', complexity: 'medium', skill: 'rigging' }, // Create rig
    23: { xp: 200, coins: 100, value: 300, time: '6hr', complexity: 'hard', skill: 'animation' }, // Animate walk cycle
    24: { xp: 175, coins: 85, value: 250, time: '5hr', complexity: 'hard', skill: 'animation' }, // Animate run cycle
    25: { xp: 100, coins: 50, value: 150, time: '3hr', complexity: 'medium', skill: 'animation' }, // Blend animations
    26: { xp: 250, coins: 125, value: 400, time: '8hr', complexity: 'hard', skill: 'animation' }, // Facial rigging
    27: { xp: 200, coins: 100, value: 350, time: '6hr', complexity: 'hard', skill: 'animation' }, // Lip sync
    28: { xp: 150, coins: 75, value: 200, time: '4hr', complexity: 'medium', skill: 'mocap' }, // Clean mocap data
    29: { xp: 300, coins: 150, value: 500, time: '10hr', complexity: 'expert', skill: 'dynamics' }, // Cloth simulation
    30: { xp: 275, coins: 135, value: 450, time: '8hr', complexity: 'hard', skill: 'dynamics' }, // Hair dynamics
    31: { xp: 350, coins: 175, value: 600, time: '12hr', complexity: 'expert', skill: 'fx' }, // Particle effects
    32: { xp: 400, coins: 200, value: 700, time: '14hr', complexity: 'expert', skill: 'fx' }, // Fluid simulation
    33: { xp: 225, coins: 110, value: 375, time: '7hr', complexity: 'hard', skill: 'animation' }, // Creature animation
    34: { xp: 300, coins: 150, value: 500, time: '10hr', complexity: 'expert', skill: 'rigging' }, // Advanced rigging
    35: { xp: 175, coins: 85, value: 250, time: '5hr', complexity: 'medium', skill: 'animation' }, // Props animation
    36: { xp: 200, coins: 100, value: 300, time: '6hr', complexity: 'hard', skill: 'animation' }, // Camera animation
    37: { xp: 150, coins: 75, value: 200, time: '4hr', complexity: 'medium', skill: 'animation' }, // Secondary animation
    38: { xp: 125, coins: 60, value: 175, time: '3hr', complexity: 'medium', skill: 'animation' }, // Timing adjustments
    39: { xp: 100, coins: 50, value: 150, time: '2hr', complexity: 'medium', skill: 'polish' }, // Polish pass
    40: { xp: 80, coins: 40, value: 100, time: '2hr', complexity: 'easy', skill: 'export' }, // Export animations
    41: { xp: 150, coins: 75, value: 200, time: '4hr', complexity: 'medium', skill: 'pipeline' }, // Animation pipeline
    
    // Issue #42-61: Polish & Advanced (Sprint 3)
    42: { xp: 125, coins: 60, value: 175, time: '3hr', complexity: 'medium', skill: 'lighting' }, // Basic lighting
    43: { xp: 200, coins: 100, value: 350, time: '6hr', complexity: 'hard', skill: 'lighting' }, // HDRI lighting
    44: { xp: 175, coins: 85, value: 300, time: '5hr', complexity: 'hard', skill: 'lighting' }, // Three-point lighting
    45: { xp: 250, coins: 125, value: 450, time: '8hr', complexity: 'hard', skill: 'shading' }, // Complex shaders
    46: { xp: 300, coins: 150, value: 500, time: '10hr', complexity: 'expert', skill: 'texturing' }, // Substance texturing
    47: { xp: 225, coins: 110, value: 400, time: '7hr', complexity: 'hard', skill: 'texturing' }, // UV mapping
    48: { xp: 175, coins: 85, value: 250, time: '5hr', complexity: 'medium', skill: 'materials' }, // Material library
    49: { xp: 400, coins: 200, value: 800, time: '16hr', complexity: 'expert', skill: 'rendering' }, // Final render setup
    50: { xp: 350, coins: 175, value: 600, time: '12hr', complexity: 'expert', skill: 'compositing' }, // Compositing
    51: { xp: 200, coins: 100, value: 300, time: '6hr', complexity: 'hard', skill: 'post' }, // Color grading
    52: { xp: 150, coins: 75, value: 200, time: '4hr', complexity: 'medium', skill: 'optimization' }, // Scene optimization
    53: { xp: 125, coins: 60, value: 175, time: '3hr', complexity: 'medium', skill: 'pipeline' }, // Asset management
    54: { xp: 100, coins: 50, value: 150, time: '2hr', complexity: 'easy', skill: 'documentation' }, // Documentation
    55: { xp: 175, coins: 85, value: 250, time: '5hr', complexity: 'medium', skill: 'review' }, // Review and feedback
    56: { xp: 225, coins: 110, value: 350, time: '7hr', complexity: 'hard', skill: 'polish' }, // Final polish
    57: { xp: 80, coins: 40, value: 100, time: '2hr', complexity: 'easy', skill: 'delivery' }, // Delivery prep
    
    // Issue #58-61: CAD/BIM Integration
    58: { xp: 300, coins: 150, value: 500, time: '10hr', complexity: 'expert', skill: 'cad' }, // SolidWorks design
    59: { xp: 350, coins: 175, value: 600, time: '12hr', complexity: 'expert', skill: 'bim' }, // Revit architecture
    60: { xp: 200, coins: 100, value: 300, time: '6hr', complexity: 'hard', skill: 'pipeline' }, // CAD integration
    61: { xp: 150, coins: 75, value: 200, time: '4hr', complexity: 'medium', skill: 'workflow' }, // Production workflow
    
    // Issue #62-65: Crowd Simulation (Golaem)
    62: { xp: 400, coins: 200, value: 750, time: '14hr', complexity: 'expert', skill: 'crowds' }, // Golaem setup
    63: { xp: 350, coins: 175, value: 600, time: '12hr', complexity: 'expert', skill: 'ai' }, // Behavior system
    64: { xp: 275, coins: 135, value: 450, time: '8hr', complexity: 'hard', skill: 'navigation' }, // Navigation mesh
    65: { xp: 500, coins: 250, value: 1000, time: '20hr', complexity: 'expert', skill: 'crowds' }, // 500 agents stadium
    
    // Issue #66-69: Final Integration
    66: { xp: 300, coins: 150, value: 500, time: '10hr', complexity: 'expert', skill: 'pipeline' }, // Pipeline unification
    67: { xp: 250, coins: 125, value: 400, time: '8hr', complexity: 'hard', skill: 'portfolio' }, // Portfolio assembly
    68: { xp: 450, coins: 225, value: 850, time: '16hr', complexity: 'expert', skill: 'advanced' }, // ACES/UDIM workflow
    69: { xp: 200, coins: 100, value: 300, time: '6hr', complexity: 'hard', skill: 'delivery' }, // Final integration
    
    // Issue #79-83: Side Quests (Historical/Technical)
    79: { xp: 200, coins: 100, value: 300, time: '6hr', complexity: 'hard', skill: 'research' }, // Sutherland's Constraint
    80: { xp: 150, coins: 75, value: 200, time: '4hr', complexity: 'medium', skill: 'history' }, // Utah Teapot
    81: { xp: 175, coins: 85, value: 250, time: '5hr', complexity: 'hard', skill: 'algorithms' }, // Phong's Shadow
    82: { xp: 125, coins: 60, value: 150, time: '3hr', complexity: 'medium', skill: 'opensource' }, // Blender Fund
    83: { xp: 200, coins: 100, value: 300, time: '6hr', complexity: 'hard', skill: 'mathematics' }, // Golden Ratio
};

// Calculate task value based on multiple factors
function calculateTaskValue(issueNumber, labels = [], body = '') {
    // Start with specific task value if defined
    let baseValue = TASK_VALUES[issueNumber] || { xp: 50, coins: 25, value: 100 };
    
    // Adjust based on additional factors
    let multiplier = 1.0;
    
    // Check for epic tasks
    if (labels.includes('epic')) multiplier *= 2.0;
    if (labels.includes('critical')) multiplier *= 1.5;
    if (labels.includes('bug')) multiplier *= 0.5; // Bugs are less valuable
    if (labels.includes('documentation')) multiplier *= 0.7;
    
    // Check body for complexity indicators
    const bodyLower = body.toLowerCase();
    if (bodyLower.includes('complex') || bodyLower.includes('advanced')) multiplier *= 1.3;
    if (bodyLower.includes('simple') || bodyLower.includes('basic')) multiplier *= 0.8;
    if (bodyLower.includes('multiple') || bodyLower.includes('integrate')) multiplier *= 1.2;
    
    return {
        xp: Math.round(baseValue.xp * multiplier),
        coins: Math.round(baseValue.coins * multiplier),
        value: Math.round(baseValue.value * multiplier),
        time: baseValue.time,
        complexity: baseValue.complexity,
        skill: baseValue.skill
    };
}

// Get cumulative portfolio value
function getPortfolioValue(completedTasks) {
    let total = 0;
    let breakdown = {
        modeling: 0,
        animation: 0,
        rendering: 0,
        simulation: 0,
        pipeline: 0
    };
    
    completedTasks.forEach(taskNumber => {
        const value = TASK_VALUES[taskNumber];
        if (value) {
            total += value.value;
            
            // Categorize value
            switch(value.skill) {
                case 'modeling':
                case 'texturing':
                case 'materials':
                    breakdown.modeling += value.value;
                    break;
                case 'animation':
                case 'rigging':
                case 'mocap':
                    breakdown.animation += value.value;
                    break;
                case 'rendering':
                case 'lighting':
                case 'shading':
                case 'compositing':
                    breakdown.rendering += value.value;
                    break;
                case 'dynamics':
                case 'fx':
                case 'crowds':
                case 'ai':
                    breakdown.simulation += value.value;
                    break;
                default:
                    breakdown.pipeline += value.value;
            }
        }
    });
    
    return {
        total,
        breakdown,
        monthlyPotential: Math.round(total * 0.2), // 20% monthly licensing
        marketValue: Math.round(total * 1.5) // 50% markup for commercial use
    };
}

// Export for use in dashboard
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TASK_VALUES, calculateTaskValue, getPortfolioValue };
}
