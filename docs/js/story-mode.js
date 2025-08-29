// Story Mode - Sequential Memory Playback
class StoryMode {
    constructor(audioSystem) {
        this.audioSystem = audioSystem;
        this.currentMemoryIndex = 0;
        this.isPlaying = false;
        this.unlockedMemories = [];
        this.storyInterval = null;
    }
    
    start(completedTasks) {
        if (this.isPlaying) return;
        
        // Get all unlocked memories
        this.unlockedMemories = [];
        for (let i = 1; i <= Math.min(completedTasks, 49); i++) {
            this.unlockedMemories.push(i);
        }
        
        if (this.unlockedMemories.length === 0) {
            alert('No memories unlocked yet. Complete tasks to unlock memories.');
            return;
        }
        
        this.isPlaying = true;
        this.currentMemoryIndex = 0;
        this.showStoryModeUI();
        this.playNextMemory();
    }
    
    showStoryModeUI() {
        // Create fullscreen story mode overlay
        const overlay = document.createElement('div');
        overlay.id = 'story-mode-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #0A0806, #141210);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
        `;
        
        overlay.innerHTML = `
            <div style="max-width: 800px; text-align: center;">
                <h2 id="story-memory-title" style="font-family: 'Cinzel', serif; color: #B8860B; font-size: 2rem; margin-bottom: 1rem;">Loading...</h2>
                <div id="story-memory-text" style="font-family: 'Crimson Text', serif; color: #C4B5A0; font-size: 1.2rem; line-height: 1.8; margin-bottom: 2rem; min-height: 200px;"></div>
                <div id="story-progress" style="color: #8B8378; margin-bottom: 2rem;">
                    Memory <span id="current-memory">1</span> of <span id="total-memories">${this.unlockedMemories.length}</span>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button onclick="window.storyMode.previous()" style="padding: 0.75rem 1.5rem; background: #1C1A17; border: 1px solid #3A3532; color: #C4B5A0; cursor: pointer;">Previous</button>
                    <button onclick="window.storyMode.pause()" id="pause-btn" style="padding: 0.75rem 1.5rem; background: #1C1A17; border: 1px solid #3A3532; color: #C4B5A0; cursor: pointer;">Pause</button>
                    <button onclick="window.storyMode.next()" style="padding: 0.75rem 1.5rem; background: #1C1A17; border: 1px solid #3A3532; color: #C4B5A0; cursor: pointer;">Next</button>
                    <button onclick="window.storyMode.stop()" style="padding: 0.75rem 1.5rem; background: #8B0000; border: 1px solid #3A3532; color: #C4B5A0; cursor: pointer;">Exit</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }
    
    playNextMemory() {
        if (this.currentMemoryIndex >= this.unlockedMemories.length) {
            this.currentMemoryIndex = 0; // Loop back to start
        }
        
        const memoryId = this.unlockedMemories[this.currentMemoryIndex];
        const memory = window.memoryFragments[memoryId - 1];
        
        if (memory) {
            document.getElementById('story-memory-title').textContent = memory.title;
            
            // Typewriter effect for text
            this.typewriterEffect(memory.text, 'story-memory-text', () => {
                // Play narration
                if (this.audioSystem && this.audioSystem.voEnabled) {
                    this.audioSystem.playMemoryNarration(memory.text, memoryId);
                }
                
                // Auto-advance after 15 seconds
                this.storyInterval = setTimeout(() => {
                    this.currentMemoryIndex++;
                    this.playNextMemory();
                }, 15000);
            });
            
            document.getElementById('current-memory').textContent = this.currentMemoryIndex + 1;
        }
    }
    
    typewriterEffect(text, elementId, callback) {
        const element = document.getElementById(elementId);
        element.textContent = '';
        let index = 0;
        
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 30);
            } else if (callback) {
                callback();
            }
        };
        
        type();
    }
    
    pause() {
        if (this.storyInterval) {
            clearTimeout(this.storyInterval);
            this.storyInterval = null;
            document.getElementById('pause-btn').textContent = 'Resume';
            document.getElementById('pause-btn').onclick = () => this.resume();
        }
    }
    
    resume() {
        document.getElementById('pause-btn').textContent = 'Pause';
        document.getElementById('pause-btn').onclick = () => this.pause();
        this.playNextMemory();
    }
    
    next() {
        if (this.storyInterval) clearTimeout(this.storyInterval);
        this.currentMemoryIndex++;
        this.playNextMemory();
    }
    
    previous() {
        if (this.storyInterval) clearTimeout(this.storyInterval);
        this.currentMemoryIndex = Math.max(0, this.currentMemoryIndex - 1);
        this.playNextMemory();
    }
    
    stop() {
        this.isPlaying = false;
        if (this.storyInterval) clearTimeout(this.storyInterval);
        if (this.audioSystem) this.audioSystem.stopNarration();
        
        const overlay = document.getElementById('story-mode-overlay');
        if (overlay) overlay.remove();
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StoryMode;
} else {
    window.StoryMode = StoryMode;
}
