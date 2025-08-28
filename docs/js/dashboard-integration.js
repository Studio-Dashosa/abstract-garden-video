/**
 * Dashboard Integration Script
 * Connects GitHub issues with the complete game state system
 */

import { GameStateManager } from './game-state.js';

class DashboardIntegration {
    constructor() {
        this.gameState = new GameStateManager();
        this.issues = [];
        this.memories = [];
        this.stories = [];
        this.voEnabled = false;
        this.musicEnabled = false;
        
        this.init();
    }

    async init() {
        // Load issues from GitHub
        await this.loadIssues();
        
        // Load memories and stories
        await this.loadMemories();
        await this.loadStories();
        
        // Process completed issues
        this.processCompletedIssues();
        
        // Update UI
        this.updateDashboard();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start auto-refresh
        this.startAutoRefresh();
    }

    async loadIssues() {
        try {
            const repo = 'Studio-Dashosa/abstract-garden-video';
            
            // Try local data first
            try {
                const local = await fetch('./data/issues.json', { cache: 'no-store' });
                if (local.ok) {
                    this.issues = await local.json();
                } else {
                    throw new Error('No local data');
                }
            } catch (_) {
                // Fallback to GitHub API
                const response = await fetch(
                    `https://api.github.com/repos/${repo}/issues?state=all&per_page=100`,
                    { headers: { 'Accept': 'application/vnd.github.v3+json' } }
                );
                
                if (!response.ok) {
                    throw new Error(`GitHub API Error: ${response.status}`);
                }
                
                this.issues = await response.json();
            }
        } catch (error) {
            console.error('Error loading issues:', error);
            this.showError('Failed to load issues data');
        }
    }

    async loadMemories() {
        try {
            const response = await fetch('./memories.json');
            if (response.ok) {
                this.memories = await response.json();
            }
        } catch (error) {
            console.error('Error loading memories:', error);
        }
    }

    async loadStories() {
        try {
            const response = await fetch('./stories/stories.json');
            if (response.ok) {
                this.stories = await response.json();
            }
        } catch (error) {
            console.error('Error loading stories:', error);
        }
    }

    processCompletedIssues() {
        const currentState = this.gameState.getState();
        
        // Filter real task issues
        const taskIssues = this.issues.filter(issue => 
            !issue.pull_request && 
            issue.number >= 22 && 
            issue.number <= 77
        );
        
        // Process closed issues that haven't been processed yet
        const closedIssues = taskIssues.filter(issue => issue.state === 'closed');
        
        for (const issue of closedIssues) {
            if (!currentState.completedTasks.includes(issue.number)) {
                const result = this.gameState.completeTask(issue.number);
                
                if (result.success) {
                    this.showRewardNotification(result.rewards);
                }
            }
        }
        
        // Process side quest issues
        const sideQuestIssues = this.issues.filter(issue => 
            issue.labels.some(label => label.name === 'side-quest')
        );
        
        for (const issue of sideQuestIssues) {
            if (issue.state === 'closed') {
                // Extract quest ID from issue title (e.g., "Side Quest A1: ...")
                const match = issue.title.match(/Side Quest ([A-C]\d|BONUS\d):/);
                if (match) {
                    const questId = match[1];
                    if (!currentState.completedSideQuests.includes(questId)) {
                        const result = this.gameState.completeSideQuest(questId);
                        
                        if (result.success) {
                            this.showRewardNotification(result.rewards);
                        }
                    }
                }
            }
        }
    }

    updateDashboard() {
        const state = this.gameState.getState();
        
        // Update main stats
        this.updateElement('portfolio-value', `$${state.portfolioValue.toLocaleString()}`);
        this.updateElement('monthly-income', `$${state.monthlyIncome.toLocaleString()}`);
        this.updateElement('level', state.level);
        this.updateElement('level-title', state.currentTitle);
        
        // Update XP and coins display
        this.updateElement('xp-display', `${state.xp.toLocaleString()} XP`);
        this.updateElement('coins-display', `${state.coins.toLocaleString()} 🪙`);
        
        // Update task progress
        const totalTasks = 49; // Main tasks
        const totalSideQuests = 18;
        const totalQuests = totalTasks + totalSideQuests;
        const completed = state.stats.tasksCompleted + state.stats.sideQuestsCompleted;
        
        this.updateElement('tasks-complete', `${completed}/${totalQuests}`);
        
        // Update main progress bar
        const progress = Math.round((completed / totalQuests) * 100);
        this.updateElement('progress-percentage', `${progress}%`);
        this.updateProgressBar('main-progress', progress);
        
        // Update progress message
        this.updateProgressMessage(progress, state);
        
        // Update sprint progress
        this.updateSprintProgress(state);
        
        // Update memory grid
        this.updateMemoryGrid(state);
        
        // Update story panels
        this.updateStoryPanels(state);
        
        // Check for achievements
        this.checkAchievements(state);
    }

    updateProgressMessage(progress, state) {
        const messages = [
            "Begin your journey. The render calls to you...",
            "First vertices placed. The digital realm stirs...",
            "Shaders awaken. Light begins to dance...",
            "The pipeline flows. Memories coalesce...",
            "Halfway through the trials. Power courses through your work...",
            "Mastery approaches. The machine spirits sing...",
            "Near completion. Reality bends to your will...",
            "Digital Ascension achieved. The cycle is complete."
        ];
        
        const index = Math.min(Math.floor(progress / 12.5), messages.length - 1);
        this.updateElement('progress-message', messages[index]);
    }

    updateSprintProgress(state) {
        // Sprint 1: Foundation (Issues 70-77)
        const sprint1Tasks = [70, 71, 72, 73, 74, 75, 76, 77];
        const sprint1Complete = sprint1Tasks.filter(t => 
            state.completedTasks.includes(t)
        ).length;
        this.updateSprint('sprint-1', sprint1Complete, 8);
        
        // Sprint 2: Core Skills (Issues 42-69)
        const sprint2Tasks = Array.from({length: 28}, (_, i) => i + 42);
        const sprint2Complete = sprint2Tasks.filter(t => 
            state.completedTasks.includes(t)
        ).length;
        this.updateSprint('sprint-2', sprint2Complete, 28);
        
        // Sprint 3: Advanced (Issues 22-41)
        const sprint3Tasks = Array.from({length: 20}, (_, i) => i + 22);
        const sprint3Complete = sprint3Tasks.filter(t => 
            state.completedTasks.includes(t)
        ).length;
        this.updateSprint('sprint-3', sprint3Complete, 20);
        
        // Side Quests
        this.updateSprint('side-quests', state.stats.sideQuestsCompleted, 18);
    }

    updateSprint(id, completed, total) {
        const element = document.getElementById(id);
        if (!element) return;
        
        const percent = Math.round((completed / total) * 100);
        const percentElement = element.querySelector('.sprint-header > div:nth-child(2)');
        const progressBar = element.querySelector('.sprint-progress-fill');
        
        if (percentElement) percentElement.textContent = `${percent}%`;
        if (progressBar) progressBar.style.width = `${percent}%`;
        
        if (percent === 100) {
            element.classList.add('completed');
        }
    }

    updateMemoryGrid(state) {
        const grid = document.getElementById('memory-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        for (let i = 1; i <= 49; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'memory-fragment';
            fragment.dataset.memoryId = i;
            
            const isUnlocked = state.unlockedMemories.includes(i);
            const isPurchased = state.purchasedMemories.includes(i);
            
            if (isUnlocked) {
                fragment.classList.add('unlocked');
                if (isPurchased) {
                    fragment.innerHTML = `<span class="memory-icon">💰</span>`;
                } else {
                    fragment.innerHTML = `<span class="memory-icon">⚡</span>`;
                }
                
                fragment.addEventListener('click', () => this.showMemory(i));
            } else {
                // Show cost to unlock
                const threshold = this.gameState.memoryThresholds.find(t => 
                    t.memoryId === i
                );
                
                fragment.innerHTML = `
                    <div class="memory-locked">
                        <div class="memory-number">${i}</div>
                        <div class="memory-cost">${threshold.coinCost}🪙</div>
                    </div>
                `;
                
                fragment.addEventListener('click', () => 
                    this.attemptMemoryPurchase(i)
                );
            }
            
            grid.appendChild(fragment);
        }
        
        // Update counter
        this.updateElement('memories-unlocked', state.stats.memoriesUnlocked);
    }

    updateStoryPanels(state) {
        // Create story status panels
        const storyContainer = document.getElementById('story-panels');
        if (!storyContainer) return;
        
        const stories = [
            { id: 4, name: "The Forgotten Women", group: "A" },
            { id: 5, name: "The Eastern Masters", group: "B" },
            { id: 6, name: "The Open Source Heroes", group: "C" }
        ];
        
        storyContainer.innerHTML = '';
        
        for (const story of stories) {
            const isUnlocked = state.unlockedStories.includes(`Story ${story.id}: ${story.name}`);
            const group = this.gameState.sideQuestGroups[story.group];
            const completedQuests = group.quests.filter(q => 
                state.completedSideQuests.includes(q.id)
            ).length;
            
            const panel = document.createElement('div');
            panel.className = `story-panel ${isUnlocked ? 'unlocked' : ''}`;
            
            panel.innerHTML = `
                <h3>Story ${story.id}: ${story.name}</h3>
                <div class="story-progress">
                    <div class="story-progress-bar">
                        <div class="story-progress-fill" style="width: ${(completedQuests / group.quests.length) * 100}%"></div>
                    </div>
                    <span>${completedQuests}/${group.quests.length} quests</span>
                </div>
                ${isUnlocked ? '<div class="story-status">✨ UNLOCKED</div>' : ''}
            `;
            
            if (isUnlocked) {
                panel.addEventListener('click', () => this.playStory(story.id));
            }
            
            storyContainer.appendChild(panel);
        }
    }

    showMemory(memoryId) {
        const memory = this.memories.find(m => m.id === memoryId);
        if (!memory) return;
        
        // Show memory modal
        const modal = document.getElementById('story-modal');
        const title = document.getElementById('story-title');
        const content = document.getElementById('story-content');
        
        title.textContent = `Memory Fragment ${memoryId}`;
        content.innerHTML = `
            <div class="memory-text">${memory.text}</div>
            <div class="memory-meta">
                <span class="memory-source">${memory.source || 'Ancient Knowledge'}</span>
                <span class="memory-year">${memory.year || 'Time Unknown'}</span>
            </div>
        `;
        
        modal.style.display = 'block';
        
        // Play narration if enabled
        if (this.voEnabled && memory.audioUrl) {
            this.playNarration(memory.audioUrl);
        }
    }

    attemptMemoryPurchase(memoryId) {
        const state = this.gameState.getState();
        
        if (state.unlockedMemories.includes(memoryId)) {
            this.showNotification('Memory already unlocked!', 'info');
            return;
        }
        
        const threshold = this.gameState.memoryThresholds.find(t => 
            t.memoryId === memoryId
        );
        
        if (state.coins < threshold.coinCost) {
            this.showNotification(
                `Need ${threshold.coinCost} coins (have ${state.coins})`,
                'error'
            );
            return;
        }
        
        // Confirm purchase
        const confirmed = confirm(
            `Unlock Memory ${memoryId} for ${threshold.coinCost} coins?\n` +
            `You have ${state.coins} coins.`
        );
        
        if (confirmed) {
            const result = this.gameState.purchaseMemory(memoryId);
            if (result.success) {
                this.showNotification(
                    `Memory ${memoryId} unlocked! ${result.remainingCoins} coins remaining.`,
                    'success'
                );
                this.updateDashboard();
            }
        }
    }

    showRewardNotification(rewards) {
        let message = `+${rewards.xp} XP, +${rewards.coins} coins`;
        
        if (rewards.leveledUp) {
            message += `\n🎉 LEVEL UP! Now level ${rewards.newLevel}: ${rewards.newTitle}`;
        }
        
        if (rewards.unlockedMemories && rewards.unlockedMemories.length > 0) {
            message += `\n🧠 Unlocked ${rewards.unlockedMemories.length} memory fragments!`;
        }
        
        if (rewards.storyUnlocked) {
            message += `\n📖 Story unlocked: ${rewards.storyUnlocked}`;
        }
        
        this.showNotification(message, 'reward');
    }

    checkAchievements(state) {
        const achievements = [
            { 
                id: 'first_blood',
                name: 'First Blood',
                condition: state.stats.tasksCompleted >= 1,
                description: 'Complete your first task'
            },
            {
                id: 'memory_keeper',
                name: 'Memory Keeper',
                condition: state.stats.memoriesUnlocked >= 25,
                description: 'Unlock 25 memory fragments'
            },
            {
                id: 'story_master',
                name: 'Story Master',
                condition: state.stats.storiesCompleted >= 3,
                description: 'Unlock all side quest stories'
            },
            {
                id: 'digital_deity',
                name: 'Digital Deity',
                condition: state.level >= 20,
                description: 'Reach level 20'
            },
            {
                id: 'completionist',
                name: 'Completionist',
                condition: state.stats.tasksCompleted >= 49 && state.stats.sideQuestsCompleted >= 18,
                description: 'Complete all tasks and side quests'
            }
        ];
        
        for (const achievement of achievements) {
            if (achievement.condition && !state.achievements.includes(achievement.id)) {
                state.achievements.push(achievement.id);
                this.gameState.saveState();
                this.showAchievement(achievement);
            }
        }
    }

    showAchievement(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-content">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        document.querySelector('.container').prepend(errorDiv);
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    updateProgressBar(id, percent) {
        const element = document.getElementById(id);
        if (element) {
            element.style.width = `${percent}%`;
        }
    }

    setupEventListeners() {
        // Voice Over toggle
        const voToggle = document.getElementById('vo-toggle');
        if (voToggle) {
            voToggle.addEventListener('click', () => {
                this.voEnabled = !this.voEnabled;
                voToggle.textContent = `🎙️ British VO: ${this.voEnabled ? 'ON' : 'OFF'}`;
                voToggle.classList.toggle('active', this.voEnabled);
            });
        }
        
        // Music toggle
        const musicToggle = document.getElementById('music-toggle');
        if (musicToggle) {
            musicToggle.addEventListener('click', () => {
                this.musicEnabled = !this.musicEnabled;
                musicToggle.textContent = `🎵 Ambient Music: ${this.musicEnabled ? 'ON' : 'OFF'}`;
                musicToggle.classList.toggle('active', this.musicEnabled);
                
                if (this.musicEnabled) {
                    this.startAmbientMusic();
                } else {
                    this.stopAmbientMusic();
                }
            });
        }
        
        // Story mode button
        const storyMode = document.getElementById('story-mode');
        if (storyMode) {
            storyMode.addEventListener('click', () => {
                window.location.href = './audio-narrator.html';
            });
        }
        
        // Close modal
        const modal = document.getElementById('story-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }

    startAmbientMusic() {
        if (!this.audioElement) {
            this.audioElement = new Audio('./audio/ambient.mp3');
            this.audioElement.loop = true;
            this.audioElement.volume = 0.3;
        }
        this.audioElement.play();
    }

    stopAmbientMusic() {
        if (this.audioElement) {
            this.audioElement.pause();
        }
    }

    playNarration(url) {
        if (this.narrationAudio) {
            this.narrationAudio.pause();
        }
        
        this.narrationAudio = new Audio(url);
        this.narrationAudio.play();
    }

    startAutoRefresh() {
        // Refresh every 5 minutes
        setInterval(() => {
            this.loadIssues().then(() => {
                this.processCompletedIssues();
                this.updateDashboard();
            });
        }, 5 * 60 * 1000);
    }
}

// Initialize dashboard when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.dashboard = new DashboardIntegration();
    });
} else {
    window.dashboard = new DashboardIntegration();
}

// Export for debugging
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardIntegration;
} else {
    window.DashboardIntegration = DashboardIntegration;
}
