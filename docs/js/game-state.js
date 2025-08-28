/**
 * Complete Game State Manager for Abstract Garden
 * Manages XP, Coins, Memory Unlocking, and Story Progression
 */

class GameStateManager {
    constructor() {
        this.state = this.loadState() || this.getDefaultState();
        this.taskValues = this.getTaskValues();
        this.memoryThresholds = this.getMemoryThresholds();
        this.sideQuestGroups = this.getSideQuestGroups();
    }

    getDefaultState() {
        return {
            xp: 0,
            coins: 0,
            level: 1,
            completedTasks: [],
            completedSideQuests: [],
            unlockedMemories: [],
            purchasedMemories: [],
            unlockedStories: [],
            currentTitle: "Beginner",
            portfolioValue: 0,
            monthlyIncome: 0,
            achievements: [],
            stats: {
                tasksCompleted: 0,
                sideQuestsCompleted: 0,
                storiesCompleted: 0,
                totalXP: 0,
                totalCoins: 0,
                memoriesUnlocked: 0
            }
        };
    }

    getTaskValues() {
        // Main task values based on complexity
        const mainTasks = {
            // Sprint 1: Foundation (Issues 70-77) - $75 each
            70: { xp: 100, coins: 75, name: "Install Maya 2024" },
            71: { xp: 100, coins: 75, name: "Create first cube" },
            72: { xp: 100, coins: 75, name: "Apply first material" },
            73: { xp: 100, coins: 75, name: "Create first keyframe" },
            74: { xp: 100, coins: 75, name: "Import reference image" },
            75: { xp: 100, coins: 75, name: "Install After Effects 2024" },
            76: { xp: 100, coins: 75, name: "Create first composition" },
            77: { xp: 100, coins: 75, name: "Export first video" },
            
            // Sprint 2: Core Skills (Issues 42-69) - $95-125 each
            42: { xp: 150, coins: 95, name: "Model simple tree" },
            43: { xp: 150, coins: 95, name: "UV unwrap basics" },
            44: { xp: 150, coins: 95, name: "Texture tree bark" },
            45: { xp: 150, coins: 95, name: "Create leaves" },
            46: { xp: 200, coins: 105, name: "Animate tree sway" },
            47: { xp: 200, coins: 105, name: "Light forest scene" },
            48: { xp: 200, coins: 105, name: "Add fog effect" },
            49: { xp: 200, coins: 105, name: "Composite layers" },
            50: { xp: 200, coins: 115, name: "Color correction" },
            51: { xp: 200, coins: 115, name: "Add glow effects" },
            52: { xp: 250, coins: 125, name: "Particle leaves" },
            53: { xp: 250, coins: 125, name: "Wind simulation" },
            54: { xp: 250, coins: 125, name: "Render optimization" },
            55: { xp: 250, coins: 125, name: "Camera animation" },
            56: { xp: 250, coins: 125, name: "Depth of field" },
            57: { xp: 250, coins: 125, name: "Motion blur" },
            58: { xp: 250, coins: 125, name: "Audio sync" },
            59: { xp: 250, coins: 125, name: "Beat detection" },
            60: { xp: 250, coins: 125, name: "Visual rhythm" },
            61: { xp: 300, coins: 125, name: "Master comp" },
            62: { xp: 300, coins: 125, name: "Export settings" },
            63: { xp: 300, coins: 125, name: "Quality control" },
            64: { xp: 300, coins: 125, name: "Optimization pass" },
            65: { xp: 300, coins: 125, name: "Final render" },
            66: { xp: 300, coins: 125, name: "Portfolio prep" },
            67: { xp: 300, coins: 125, name: "Documentation" },
            68: { xp: 300, coins: 125, name: "Making of video" },
            69: { xp: 300, coins: 125, name: "Project archive" },
            
            // Sprint 3: Advanced (Issues 22-41) - $135-165 each
            22: { xp: 350, coins: 135, name: "Procedural modeling" },
            23: { xp: 350, coins: 135, name: "L-systems" },
            24: { xp: 350, coins: 135, name: "MASH networks" },
            25: { xp: 350, coins: 135, name: "Python scripting" },
            26: { xp: 400, coins: 145, name: "Custom shaders" },
            27: { xp: 400, coins: 145, name: "Arnold renderer" },
            28: { xp: 400, coins: 145, name: "Substance integration" },
            29: { xp: 400, coins: 145, name: "Nuke compositing" },
            30: { xp: 450, coins: 155, name: "Houdini FX" },
            31: { xp: 450, coins: 155, name: "Fluid simulation" },
            32: { xp: 450, coins: 155, name: "Cloth dynamics" },
            33: { xp: 450, coins: 155, name: "Hair systems" },
            34: { xp: 500, coins: 165, name: "Crowd simulation" },
            35: { xp: 500, coins: 165, name: "Environment tools" },
            36: { xp: 500, coins: 165, name: "Pipeline automation" },
            37: { xp: 500, coins: 165, name: "Render farm setup" },
            38: { xp: 500, coins: 165, name: "Version control" },
            39: { xp: 500, coins: 165, name: "Team workflow" },
            40: { xp: 500, coins: 165, name: "Final masterwork" },
            41: { xp: 500, coins: 165, name: "Exhibition ready" }
        };

        return mainTasks;
    }

    getMemoryThresholds() {
        // XP thresholds for unlocking each memory fragment
        const thresholds = [];
        for (let i = 1; i <= 49; i++) {
            // Progressive XP requirements
            const baseXP = 100;
            const scaling = 1.15; // Each memory requires 15% more XP than the last
            thresholds.push({
                memoryId: i,
                xpRequired: Math.floor(baseXP * Math.pow(scaling, i - 1)),
                coinCost: Math.floor(50 + (i * 10)) // Can unlock early with coins
            });
        }
        return thresholds;
    }

    getSideQuestGroups() {
        return {
            A: {
                name: "The Light Pen Legacy",
                prerequisite: 5, // Complete 5 main tasks
                unlocks: "Story 4: The Forgotten Women",
                quests: [
                    { id: "A1", xp: 200, coins: 75, name: "Sutherland's Constraint" },
                    { id: "A2", xp: 250, coins: 95, name: "The Utah Teapot Ritual" },
                    { id: "A3", xp: 225, coins: 85, name: "PARC's Secret" },
                    { id: "A4", xp: 275, coins: 105, name: "Pixar's First Artist" },
                    { id: "A5", xp: 240, coins: 90, name: "Hidden Calculations" }
                ]
            },
            B: {
                name: "Eastern Innovations",
                prerequisite: 10, // Complete 10 main tasks
                unlocks: "Story 5: The Eastern Masters",
                quests: [
                    { id: "B1", xp: 250, coins: 95, name: "Phong's Shadow" },
                    { id: "B2", xp: 275, coins: 105, name: "The Anime Pipeline" },
                    { id: "B3", xp: 290, coins: 110, name: "Sony's Transformation" },
                    { id: "B4", xp: 250, coins: 95, name: "The Lost L-System" },
                    { id: "B5", xp: 300, coins: 115, name: "Nintendo's Secret" }
                ]
            },
            C: {
                name: "Liberation Movement",
                prerequisite: 15, // Complete 15 main tasks
                unlocks: "Story 6: The Open Source Heroes",
                quests: [
                    { id: "C1", xp: 325, coins: 125, name: "The Blender Fund" },
                    { id: "C2", xp: 350, coins: 135, name: "Linux Render Farm" },
                    { id: "C3", xp: 300, coins: 115, name: "The GIMP Alternative" },
                    { id: "C4", xp: 375, coins: 145, name: "Academic Freedom" },
                    { id: "C5", xp: 400, coins: 160, name: "The Commons" }
                ]
            },
            BONUS: {
                name: "Bonus Quests",
                prerequisite: null, // Random triggers
                unlocks: "Special Memories",
                quests: [
                    { id: "BONUS1", xp: 500, coins: 200, name: "Golden Ratio", trigger: "Fibonacci used" },
                    { id: "BONUS2", xp: 400, coins: 150, name: "The Glitch Art", trigger: "Render error" },
                    { id: "BONUS3", xp: 750, coins: 300, name: "The Lost Frame", trigger: "30 tasks complete" }
                ]
            }
        };
    }

    calculateLevel(xp) {
        // FromSoft-style level calculation
        const levelThresholds = [
            0,     // Level 1
            100,   // Level 2
            300,   // Level 3
            600,   // Level 4
            1000,  // Level 5
            1500,  // Level 6
            2100,  // Level 7
            2800,  // Level 8
            3600,  // Level 9
            4500,  // Level 10
            5500,  // Level 11
            6600,  // Level 12
            7800,  // Level 13
            9100,  // Level 14
            10500, // Level 15
            12000, // Level 16
            13600, // Level 17
            15300, // Level 18
            17100, // Level 19
            19000  // Level 20 (Max)
        ];

        for (let i = levelThresholds.length - 1; i >= 0; i--) {
            if (xp >= levelThresholds[i]) {
                return i + 1;
            }
        }
        return 1;
    }

    getTitle(level) {
        const titles = [
            "Hollow",                  // 1
            "Undead",                  // 2
            "Pilgrim",                 // 3
            "Bearer of Light",         // 4
            "Seeker",                  // 5
            "Keeper of Fragments",     // 6
            "Digital Wanderer",        // 7
            "Code Weaver",            // 8
            "Render Knight",          // 9
            "Shader Sorcerer",        // 10
            "Pipeline Architect",     // 11
            "Memory Guardian",        // 12
            "Digital Sage",           // 13
            "Reality Sculptor",       // 14
            "Quantum Artist",         // 15
            "Ascended Creator",       // 16
            "Master of Vertices",     // 17
            "Lord of Pixels",         // 18
            "Digital Deity",          // 19
            "Eternal Fragment"        // 20
        ];
        return titles[Math.min(level - 1, titles.length - 1)];
    }

    completeTask(issueNumber) {
        if (this.state.completedTasks.includes(issueNumber)) {
            return { success: false, message: "Task already completed" };
        }

        const task = this.taskValues[issueNumber];
        if (!task) {
            return { success: false, message: "Unknown task" };
        }

        // Award XP and coins
        this.state.xp += task.xp;
        this.state.coins += task.coins;
        this.state.completedTasks.push(issueNumber);
        this.state.stats.tasksCompleted++;
        this.state.stats.totalXP += task.xp;
        this.state.stats.totalCoins += task.coins;

        // Update level
        const newLevel = this.calculateLevel(this.state.xp);
        const leveledUp = newLevel > this.state.level;
        this.state.level = newLevel;
        this.state.currentTitle = this.getTitle(newLevel);

        // Check for memory unlocks
        const unlockedMemories = this.checkMemoryUnlocks();

        // Check for side quest eligibility
        const availableSideQuests = this.checkSideQuestEligibility();

        // Check for bonus quest triggers
        const bonusQuests = this.checkBonusQuestTriggers();

        // Update portfolio value
        this.updatePortfolioValue();

        // Save state
        this.saveState();

        return {
            success: true,
            rewards: {
                xp: task.xp,
                coins: task.coins,
                leveledUp,
                newLevel,
                newTitle: this.state.currentTitle,
                unlockedMemories,
                availableSideQuests,
                bonusQuests
            }
        };
    }

    completeSideQuest(questId) {
        if (this.state.completedSideQuests.includes(questId)) {
            return { success: false, message: "Side quest already completed" };
        }

        // Find the quest
        let quest = null;
        let groupKey = null;
        for (const [key, group] of Object.entries(this.sideQuestGroups)) {
            const found = group.quests.find(q => q.id === questId);
            if (found) {
                quest = found;
                groupKey = key;
                break;
            }
        }

        if (!quest) {
            return { success: false, message: "Unknown side quest" };
        }

        // Check prerequisites
        const group = this.sideQuestGroups[groupKey];
        if (group.prerequisite && this.state.stats.tasksCompleted < group.prerequisite) {
            return { 
                success: false, 
                message: `Need ${group.prerequisite} completed tasks to unlock this quest` 
            };
        }

        // Award rewards
        this.state.xp += quest.xp;
        this.state.coins += quest.coins;
        this.state.completedSideQuests.push(questId);
        this.state.stats.sideQuestsCompleted++;
        this.state.stats.totalXP += quest.xp;
        this.state.stats.totalCoins += quest.coins;

        // Check if group is complete
        const groupQuests = group.quests.map(q => q.id);
        const groupComplete = groupQuests.every(id => 
            this.state.completedSideQuests.includes(id)
        );

        if (groupComplete && !this.state.unlockedStories.includes(group.unlocks)) {
            this.state.unlockedStories.push(group.unlocks);
            this.state.stats.storiesCompleted++;
        }

        // Update level
        const newLevel = this.calculateLevel(this.state.xp);
        const leveledUp = newLevel > this.state.level;
        this.state.level = newLevel;
        this.state.currentTitle = this.getTitle(newLevel);

        // Check for memory unlocks
        const unlockedMemories = this.checkMemoryUnlocks();

        // Update portfolio value
        this.updatePortfolioValue();

        // Save state
        this.saveState();

        return {
            success: true,
            rewards: {
                xp: quest.xp,
                coins: quest.coins,
                leveledUp,
                newLevel,
                newTitle: this.state.currentTitle,
                unlockedMemories,
                storyUnlocked: groupComplete ? group.unlocks : null
            }
        };
    }

    checkMemoryUnlocks() {
        const unlocked = [];
        
        for (const threshold of this.memoryThresholds) {
            if (!this.state.unlockedMemories.includes(threshold.memoryId) &&
                this.state.xp >= threshold.xpRequired) {
                this.state.unlockedMemories.push(threshold.memoryId);
                this.state.stats.memoriesUnlocked++;
                unlocked.push(threshold.memoryId);
            }
        }
        
        return unlocked;
    }

    purchaseMemory(memoryId) {
        if (this.state.unlockedMemories.includes(memoryId)) {
            return { success: false, message: "Memory already unlocked" };
        }

        const threshold = this.memoryThresholds.find(t => t.memoryId === memoryId);
        if (!threshold) {
            return { success: false, message: "Unknown memory" };
        }

        if (this.state.coins < threshold.coinCost) {
            return { 
                success: false, 
                message: `Need ${threshold.coinCost} coins (have ${this.state.coins})` 
            };
        }

        // Purchase the memory
        this.state.coins -= threshold.coinCost;
        this.state.unlockedMemories.push(memoryId);
        this.state.purchasedMemories.push(memoryId);
        this.state.stats.memoriesUnlocked++;

        // Save state
        this.saveState();

        return {
            success: true,
            spent: threshold.coinCost,
            remainingCoins: this.state.coins
        };
    }

    checkSideQuestEligibility() {
        const available = [];
        
        for (const [key, group] of Object.entries(this.sideQuestGroups)) {
            if (key === 'BONUS') continue; // Bonus quests have special triggers
            
            if (group.prerequisite && this.state.stats.tasksCompleted >= group.prerequisite) {
                const incomplete = group.quests.filter(q => 
                    !this.state.completedSideQuests.includes(q.id)
                );
                if (incomplete.length > 0) {
                    available.push({
                        group: group.name,
                        quests: incomplete
                    });
                }
            }
        }
        
        return available;
    }

    checkBonusQuestTriggers() {
        const triggered = [];
        const bonusGroup = this.sideQuestGroups.BONUS;
        
        // Check each bonus quest trigger
        for (const quest of bonusGroup.quests) {
            if (this.state.completedSideQuests.includes(quest.id)) continue;
            
            let triggered = false;
            
            switch (quest.id) {
                case 'BONUS1': // Golden Ratio - after using Fibonacci
                    // This would be triggered by specific task completion
                    triggered = this.state.completedTasks.includes(24); // MASH networks task
                    break;
                    
                case 'BONUS2': // Glitch Art - after render error
                    // Random chance after any render task
                    const renderTasks = [54, 57, 65]; // Render-related tasks
                    triggered = renderTasks.some(t => this.state.completedTasks.includes(t)) && 
                               Math.random() < 0.3;
                    break;
                    
                case 'BONUS3': // Lost Frame - after 30 tasks
                    triggered = this.state.stats.tasksCompleted >= 30;
                    break;
            }
            
            if (triggered) {
                triggered.push(quest);
            }
        }
        
        return triggered;
    }

    updatePortfolioValue() {
        // Calculate total portfolio value
        const baseValue = this.state.stats.tasksCompleted * 100;
        const sideQuestBonus = this.state.stats.sideQuestsCompleted * 75;
        const levelBonus = Math.floor(this.state.level / 5) * 500;
        const storyBonus = this.state.stats.storiesCompleted * 200;
        
        // Masterwork bonus for completing everything
        const masterworkBonus = 
            (this.state.stats.tasksCompleted >= 49 && 
             this.state.stats.sideQuestsCompleted >= 18) ? 5000 : 0;
        
        this.state.portfolioValue = 
            baseValue + sideQuestBonus + levelBonus + storyBonus + masterworkBonus;
        
        // Monthly income is 20% of portfolio value
        this.state.monthlyIncome = Math.floor(this.state.portfolioValue * 0.2);
    }

    getState() {
        return { ...this.state };
    }

    saveState() {
        localStorage.setItem('abstractGardenGameState', JSON.stringify(this.state));
    }

    loadState() {
        const saved = localStorage.getItem('abstractGardenGameState');
        return saved ? JSON.parse(saved) : null;
    }

    resetState() {
        this.state = this.getDefaultState();
        this.saveState();
    }

    // Debug methods
    debugAddXP(amount) {
        this.state.xp += amount;
        this.state.stats.totalXP += amount;
        this.state.level = this.calculateLevel(this.state.xp);
        this.state.currentTitle = this.getTitle(this.state.level);
        this.checkMemoryUnlocks();
        this.saveState();
    }

    debugAddCoins(amount) {
        this.state.coins += amount;
        this.state.stats.totalCoins += amount;
        this.saveState();
    }

    debugUnlockAllMemories() {
        for (let i = 1; i <= 49; i++) {
            if (!this.state.unlockedMemories.includes(i)) {
                this.state.unlockedMemories.push(i);
                this.state.stats.memoriesUnlocked++;
            }
        }
        this.saveState();
    }
}

// Export for use in dashboard
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameStateManager;
} else {
    window.GameStateManager = GameStateManager;
}
