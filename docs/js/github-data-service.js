// GitHub Data Service - Real API integration with relational data model
class GitHubDataService {
    constructor() {
        this.issues = [];
        this.userStats = {
            totalXP: 0,
            totalCoins: 0,
            level: 1,
            completedTasks: 0,
            portfolioValue: 0
        };
        this.rewardSystem = new RewardSystem();
        this.memorySystem = new MemorySystem();
    }

    async loadIssues() {
        try {
            const response = await fetch('https://api.github.com/repos/Studio-Dashosa/abstract-garden-video/issues?state=all&per_page=100', {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            this.issues = await response.json();
            this.calculateUserStats();
            return this.issues;
        } catch (error) {
            console.error('Failed to load GitHub issues:', error);
            return [];
        }
    }

    calculateUserStats() {
        let totalXP = 0;
        let totalCoins = 0;
        let completedTasks = 0;

        this.issues.forEach(issue => {
            if (issue.state === 'closed') {
                const rewards = this.rewardSystem.calculateRewards(issue);
                totalXP += rewards.xp;
                totalCoins += rewards.coins;
                completedTasks++;
            }
        });

        this.userStats = {
            totalXP,
            totalCoins,
            level: this.calculateLevel(totalXP),
            completedTasks,
            portfolioValue: this.calculatePortfolioValue(completedTasks, this.calculateLevel(totalXP))
        };
    }

    calculateLevel(totalXP) {
        // FromSoft-style exponential leveling
        return Math.floor(Math.sqrt(totalXP / 100)) + 1;
    }

    calculatePortfolioValue(completedTasks, level) {
        const baseValue = completedTasks * 150;
        const levelBonus = level * 500;
        const masterworkBonus = completedTasks >= 49 ? 10000 : 0;
        return baseValue + levelBonus + masterworkBonus;
    }

    getSprintStats() {
        const sprints = {
            'Sprint 1': { completed: 0, total: 0, xp: 0 },
            'Sprint 2': { completed: 0, total: 0, xp: 0 },
            'Sprint 3': { completed: 0, total: 0, xp: 0 }
        };

        this.issues.forEach(issue => {
            const sprintLabel = issue.labels.find(label => 
                label.name.includes('Sprint 1') || 
                label.name.includes('Sprint 2') || 
                label.name.includes('Sprint 3')
            );

            if (sprintLabel) {
                const sprintName = sprintLabel.name;
                sprints[sprintName].total++;
                
                if (issue.state === 'closed') {
                    sprints[sprintName].completed++;
                    sprints[sprintName].xp += this.rewardSystem.calculateRewards(issue).xp;
                }
            }
        });

        return sprints;
    }

    getSideQuests() {
        return this.issues.filter(issue => 
            issue.labels.some(label => label.name === 'side-quest')
        );
    }

    getUnlockedMemories() {
        return this.memorySystem.getUnlockedMemories(this.userStats.completedTasks);
    }

    getUserStats() {
        return this.userStats;
    }
}

// Reward calculation system based on issue complexity and type
class RewardSystem {
    constructor() {
        // Base rewards by sprint (difficulty scaling)
        this.sprintMultipliers = {
            'Sprint 1': { xp: 1.0, coins: 1.0 },    // Foundation - 100 XP base
            'Sprint 2': { xp: 1.5, coins: 1.3 },    // Animation - 150 XP base  
            'Sprint 3': { xp: 2.0, coins: 1.6 }     // Polish - 200 XP base
        };

        // Special issue type bonuses
        this.typeMultipliers = {
            'side-quest': { xp: 1.8, coins: 2.0 },  // Historical knowledge bonus
            'dashboard': { xp: 0.5, coins: 0.3 },   // Meta/admin task
            'integration': { xp: 2.5, coins: 1.8 }, // Complex integrations
            'rendering': { xp: 2.2, coins: 1.5 },   // Technical rendering
            'animation': { xp: 2.0, coins: 1.4 }    // Animation complexity
        };

        this.baseReward = {
            xp: 100,
            coins: 50
        };
    }

    calculateRewards(issue) {
        let xpMultiplier = 1.0;
        let coinMultiplier = 1.0;

        // Apply sprint difficulty scaling
        const sprintLabel = issue.labels.find(label => 
            label.name.includes('Sprint 1') || 
            label.name.includes('Sprint 2') || 
            label.name.includes('Sprint 3')
        );

        if (sprintLabel) {
            const multiplier = this.sprintMultipliers[sprintLabel.name];
            if (multiplier) {
                xpMultiplier *= multiplier.xp;
                coinMultiplier *= multiplier.coins;
            }
        }

        // Apply type-based bonuses
        issue.labels.forEach(label => {
            const typeMultiplier = this.typeMultipliers[label.name];
            if (typeMultiplier) {
                xpMultiplier *= typeMultiplier.xp;
                coinMultiplier *= typeMultiplier.coins;
            }
        });

        // Part-based complexity (higher parts = more complex)
        const partMatch = issue.title.match(/Part (\d+)/);
        if (partMatch) {
            const partNumber = parseInt(partMatch[1]);
            const complexityBonus = 1 + (partNumber * 0.05); // 5% per part number
            xpMultiplier *= complexityBonus;
            coinMultiplier *= complexityBonus;
        }

        return {
            xp: Math.round(this.baseReward.xp * xpMultiplier),
            coins: Math.round(this.baseReward.coins * coinMultiplier)
        };
    }
}

// Memory system that unlocks based on progression
class MemorySystem {
    constructor() {
        // Memory unlock thresholds (issue numbers that unlock memories)
        this.memoryUnlocks = {
            1: 'first_spark',
            5: 'sacred_geometry', 
            10: 'first_seal_breaks',
            15: 'light_bearer',
            20: 'sprint_one_mastery',
            25: 'material_truth',
            30: 'halfway_point',
            35: 'sprint_two_complete',
            40: 'motion_flows',
            45: 'final_threshold',
            49: 'digital_ascension'
        };

        this.sideQuestMemories = {
            79: 'sutherland_constraint',
            80: 'utah_teapot',
            81: 'phong_shadow', 
            82: 'blender_fund',
            83: 'golden_ratio'
        };
    }

    getUnlockedMemories(completedTasks) {
        const unlocked = [];
        
        // Check main progression memories
        Object.keys(this.memoryUnlocks).forEach(threshold => {
            if (completedTasks >= parseInt(threshold)) {
                unlocked.push({
                    id: threshold,
                    type: 'main',
                    memory: this.memoryUnlocks[threshold]
                });
            }
        });

        return unlocked;
    }

    getUnlockedSideQuests(completedSideQuests) {
        return completedSideQuests.map(issue => ({
            id: issue.number,
            type: 'side-quest',
            memory: this.sideQuestMemories[issue.number],
            title: issue.title,
            completed: issue.state === 'closed'
        }));
    }
}

// Export for use in dashboard
window.GitHubDataService = GitHubDataService;
