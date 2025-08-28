// British VO Audio System with Dragon Age style ambient music
class NarrativeAudioSystem {
  constructor() {
    this.currentAudio = null;
    this.ambientLoop = null;
    this.voiceEnabled = true;
    this.musicEnabled = true;
    this.initialized = false;
    
    this.audioContext = null;
    this.gainNode = null;
    this.ambientGain = null;
    
    this.init();
  }
  
  async init() {
    try {
      // Initialize Web Audio API for better control
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.ambientGain = this.audioContext.createGain();
      
      // Set initial volumes
      this.gainNode.gain.value = 0.8; // VO volume
      this.ambientGain.gain.value = 0.3; // Ambient music volume
      
      this.gainNode.connect(this.audioContext.destination);
      this.ambientGain.connect(this.audioContext.destination);
      
      // Start ambient loop
      this.startAmbientMusic();
      
      this.initialized = true;
      console.log("Narrative Audio System initialized");
    } catch (error) {
      console.warn("Audio system initialization failed:", error);
    }
  }
  
  startAmbientMusic() {
    if (!this.musicEnabled) return;
    
    // Create ambient music loop (Dragon Age style)
    const ambientUrl = './audio/ambient/digital_garden_ambient.mp3';
    
    this.ambientLoop = new Audio(ambientUrl);
    this.ambientLoop.loop = true;
    this.ambientLoop.volume = 0.3;
    
    // Fade in ambient music
    this.ambientLoop.play().catch(() => {
      console.log("Ambient music will start on user interaction");
    });
  }
  
  async playMemoryStory(memoryId, storyData) {
    if (!this.voiceEnabled || !storyData) return;
    
    try {
      // Stop any current audio
      this.stopCurrentAudio();
      
      // British VO file path
      const voiceUrl = `./audio/vo/${storyData.audio}`;
      
      // Create new audio element
      this.currentAudio = new Audio(voiceUrl);
      this.currentAudio.volume = 0.8;
      
      // Add atmospheric reverb effect if Web Audio is available
      if (this.audioContext && this.audioContext.state === 'running') {
        const source = this.audioContext.createMediaElementSource(this.currentAudio);
        const reverb = this.createReverbEffect();
        
        source.connect(reverb);
        reverb.connect(this.gainNode);
      }
      
      // Display story text with typing effect
      this.displayStoryText(storyData.title, storyData.story);
      
      // Play the audio
      await this.currentAudio.play();
      
      // Handle completion
      this.currentAudio.onended = () => {
        this.onStoryComplete(memoryId, storyData.reward);
      };
      
    } catch (error) {
      console.warn("Could not play VO audio:", error);
      // Fallback to text-only display
      this.displayStoryText(storyData.title, storyData.story);
      setTimeout(() => this.onStoryComplete(memoryId, storyData.reward), 3000);
    }
  }
  
  createReverbEffect() {
    const convolver = this.audioContext.createConvolver();
    
    // Create impulse response for cathedral-like reverb
    const length = this.audioContext.sampleRate * 2;
    const impulse = this.audioContext.createBuffer(2, length, this.audioContext.sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const decay = Math.pow(1 - i / length, 2);
        channelData[i] = (Math.random() * 2 - 1) * decay;
      }
    }
    
    convolver.buffer = impulse;
    return convolver;
  }
  
  displayStoryText(title, story) {
    // Create modal overlay for story display
    const modal = document.createElement('div');
    modal.className = 'story-modal';
    modal.innerHTML = `
      <div class="story-content">
        <div class="story-glow"></div>
        <h2 class="story-title">${title}</h2>
        <p class="story-text" id="story-text-content"></p>
        <div class="story-controls">
          <button onclick="this.closest('.story-modal').remove()" class="story-close">Continue Journey</button>
        </div>
      </div>
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Typing effect
    this.typeWriter(story, document.getElementById('story-text-content'));
  }
  
  typeWriter(text, element, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }
  
  onStoryComplete(memoryId, reward) {
    // Award XP and coins
    this.awardReward(reward);
    
    // Mark memory as collected
    this.markMemoryCollected(memoryId);
    
    // Update progress display
    this.updateProgressDisplay();
    
    // Play completion sound
    this.playCompletionSound();
  }
  
  awardReward(reward) {
    // Get current progress from localStorage
    const progress = JSON.parse(localStorage.getItem('digitalGardenProgress') || '{}');
    
    progress.totalXP = (progress.totalXP || 0) + (reward.xp || 0);
    progress.totalCoins = (progress.totalCoins || 0) + (reward.coins || 0);
    progress.lastReward = reward;
    
    if (reward.achievement) {
      progress.achievements = progress.achievements || [];
      if (!progress.achievements.includes(reward.achievement)) {
        progress.achievements.push(reward.achievement);
        this.showAchievement(reward.achievement);
      }
    }
    
    localStorage.setItem('digitalGardenProgress', JSON.stringify(progress));
  }
  
  markMemoryCollected(memoryId) {
    const progress = JSON.parse(localStorage.getItem('digitalGardenProgress') || '{}');
    progress.collectedMemories = progress.collectedMemories || [];
    
    if (!progress.collectedMemories.includes(memoryId)) {
      progress.collectedMemories.push(memoryId);
    }
    
    localStorage.setItem('digitalGardenProgress', JSON.stringify(progress));
  }
  
  playCompletionSound() {
    // FromSoft-style completion chime
    const audio = new Audio('./audio/sfx/memory_unlock.mp3');
    audio.volume = 0.6;
    audio.play().catch(() => {});
  }
  
  showAchievement(achievementId) {
    // Achievement popup notification
    const achievement = document.createElement('div');
    achievement.className = 'achievement-popup';
    achievement.innerHTML = `
      <div class="achievement-content">
        <div class="achievement-icon">⚡</div>
        <div class="achievement-text">
          <h3>Achievement Unlocked!</h3>
          <p>${achievementId.replace('_', ' ')}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(achievement);
    
    setTimeout(() => {
      achievement.classList.add('fade-out');
      setTimeout(() => achievement.remove(), 1000);
    }, 3000);
  }
  
  stopCurrentAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }
  
  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    if (!this.voiceEnabled) {
      this.stopCurrentAudio();
    }
  }
  
  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (this.ambientLoop) {
      if (this.musicEnabled) {
        this.ambientLoop.play().catch(() => {});
      } else {
        this.ambientLoop.pause();
      }
    }
  }
  
  updateProgressDisplay() {
    // Trigger dashboard refresh
    if (window.fetchDashboardData) {
      window.fetchDashboardData();
    }
  }
}

// Initialize audio system
window.narrativeAudio = new NarrativeAudioSystem();

// Export for use in dashboard
window.NarrativeAudioSystem = NarrativeAudioSystem;
