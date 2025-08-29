/**
 * Issue Sync Engine
 * Real-time synchronization between GitHub issues and game state
 */

class IssueSyncEngine {
    constructor() {
        this.syncInterval = 30000; // 30 seconds
        this.lastSync = null;
        this.webhookEndpoint = null;
        this.gameState = null;
    }

    /**
     * Initialize the sync engine
     */
    async init() {
        console.log('🔄 Initializing Issue Sync Engine...');
        
        // Load game state
        if (window.gameStateManager) {
            this.gameState = window.gameStateManager;
        }
        
        // Perform initial sync
        await this.syncIssues();
        
        // Start auto-sync
        this.startAutoSync();
        
        // Listen for manual updates
        this.listenForManualSync();
        
        console.log('✅ Issue Sync Engine ready!');
    }

    /**
     * Sync issues with GitHub
     */
    async syncIssues() {
        try {
            console.log('🔄 Syncing with GitHub...');
            
            // Fetch latest issues
            const issues = await this.fetchIssues();
            
            // Process each issue
            for (const issue of issues) {
                await this.processIssue(issue);
            }
            
            // Update last sync time
            this.lastSync = new Date();
            
            // Trigger UI update
            this.triggerUIUpdate();
            
            console.log(`✅ Synced ${issues.length} issues`);
            
        } catch (error) {
            console.error('❌ Sync failed:', error);
        }
    }

    /**
     * Fetch issues from GitHub
     */
    async fetchIssues() {
        const repo = 'Studio-Dashosa/abstract-garden-video';
        
        // Try local cache first
        try {
            const response = await fetch('./data/issues.json');
            if (response.ok) {
                return await response.json();
            }
        } catch (e) {
            console.log('Local cache miss, fetching from GitHub...');
        }
        
        // Fetch from GitHub API
        const response = await fetch(
            `https://api.github.com/repos/${repo}/issues?state=all&per_page=100`,
            { headers: { 'Accept': 'application/vnd.github.v3+json' } }
        );
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        return await response.json();
    }

    /**
     * Process a single issue
     */
    async processIssue(issue) {
        if (!this.gameState) return;
        
        // Skip pull requests
        if (issue.pull_request) return;
        
        // Determine issue type and value
        const issueData = this.analyzeIssue(issue);
        
        // Award rewards if completed
        if (issue.state === 'closed') {
            this.awardRewards(issueData);
        }
        
        // Check for achievements
        this.checkAchievements(issue);
    }

    /**
     * Analyze issue for game data
     */
    analyzeIssue(issue) {
        const labels = issue.labels ? issue.labels.map(l => l.name) : [];
        
        let type = 'main';
        let xpValue = 100;
        let coinValue = 75;
        let storyTrigger = null;
        
        // Check for side quest
        if (labels.includes('side-quest')) {
            type = 'side';
            xpValue = 150;
            coinValue = 100;
            
            // Check covenant type
            if (labels.includes('forgotten-women')) {
                storyTrigger = 'story_forgotten_women';
            } else if (labels.includes('eastern-masters')) {
                storyTrigger = 'story_eastern_masters';
            } else if (labels.includes('open-source')) {
                storyTrigger = 'story_open_source';
            }
        }
        
        // Check sprint level
        if (labels.includes('Sprint 1')) {
            xpValue *= 0.8; // Easier tasks
        } else if (labels.includes('Sprint 3')) {
            xpValue *= 1.2; // Harder tasks
        }
        
        return {
            id: issue.number,
            title: issue.title,
            type,
            xpValue,
            coinValue,
            storyTrigger,
            labels,
            state: issue.state,
            closedAt: issue.closed_at
        };
    }

    /**
     * Award rewards for completed issue
     */
    awardRewards(issueData) {
        if (!this.gameState) return;
        
        const state = this.gameState.getState();
        
        // Check if already processed
        if (state.processedIssues && state.processedIssues.includes(issueData.id)) {
            return;
        }
        
        // Award XP and coins
        this.gameState.addXP(issueData.xpValue);
        this.gameState.addCoins(issueData.coinValue);
        
        // Mark as processed
        if (!state.processedIssues) state.processedIssues = [];
        state.processedIssues.push(issueData.id);
        this.gameState.saveState();
        
        // Show notification
        this.showRewardNotification(issueData);
        
        // Trigger story if applicable
        if (issueData.storyTrigger) {
            this.triggerStory(issueData.storyTrigger);
        }
    }

    /**
     * Check for achievements
     */
    checkAchievements(issue) {
        if (!this.gameState) return;
        
        const state = this.gameState.getState();
        const completedCount = state.processedIssues ? state.processedIssues.length : 0;
        
        // Achievement milestones
        const achievements = [
            { count: 1, name: 'First Steps', xp: 50 },
            { count: 5, name: 'Getting Started', xp: 100 },
            { count: 10, name: 'Making Progress', xp: 200 },
            { count: 25, name: 'Halfway There', xp: 500 },
            { count: 49, name: 'Memory Master', xp: 1000 },
            { count: 78, name: 'Complete Mastery', xp: 2000 }
        ];
        
        for (const achievement of achievements) {
            if (completedCount === achievement.count) {
                this.unlockAchievement(achievement);
            }
        }
    }

    /**
     * Show reward notification
     */
    showRewardNotification(issueData) {
        const notification = document.createElement('div');
        notification.className = 'reward-notification';
        notification.innerHTML = `
            <div class="reward-title">Task Complete!</div>
            <div class="reward-xp">+${issueData.xpValue} XP</div>
            <div class="reward-coins">+${issueData.coinValue} Coins</div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate and remove
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    /**
     * Unlock achievement
     */
    unlockAchievement(achievement) {
        console.log(`🏆 Achievement Unlocked: ${achievement.name}`);
        
        // Award bonus XP
        if (this.gameState) {
            this.gameState.addXP(achievement.xp);
        }
        
        // Show achievement notification
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-reward">+${achievement.xp} Bonus XP</div>
        `;
        
        document.body.appendChild(notification);
        
        // Play sound if available
        if (window.audioSystem) {
            window.audioSystem.playAchievementSound();
        }
        
        // Remove after animation
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    /**
     * Trigger story unlock
     */
    triggerStory(storyId) {
        console.log(`📖 Story Triggered: ${storyId}`);
        
        // Implement story unlock logic
        if (window.storySystem) {
            window.storySystem.unlockStory(storyId);
        }
    }

    /**
     * Trigger UI update
     */
    triggerUIUpdate() {
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('issuesUpdated', {
            detail: { 
                lastSync: this.lastSync,
                issueCount: this.issues ? this.issues.length : 0
            }
        }));
    }

    /**
     * Start auto-sync
     */
    startAutoSync() {
        setInterval(() => {
            this.syncIssues();
        }, this.syncInterval);
    }

    /**
     * Listen for manual sync requests
     */
    listenForManualSync() {
        // Keyboard shortcut: Ctrl+R
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                this.syncIssues();
            }
        });
        
        // Custom event listener
        window.addEventListener('requestSync', () => {
            this.syncIssues();
        });
    }
}

// Initialize on load
window.issueSyncEngine = new IssueSyncEngine();
document.addEventListener('DOMContentLoaded', () => {
    window.issueSyncEngine.init();
});

// Export for module use
export { IssueSyncEngine };