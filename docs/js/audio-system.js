// Audio System with REAL Audio Files
class AudioSystem {
    constructor() {
        this.voEnabled = false;
        this.musicEnabled = false;
        this.currentVoice = 'british-witch';
        this.ambientAudio = null;
        this.storyAudio = null;
        this.voiceAudio = null;
        this.isInitialized = false;
        
        // Voice options for British narrator
        this.voiceOptions = {
            'british-witch': {
                pitch: 0.9,
                rate: 0.85,
                volume: 0.8,
                voice: 'Google UK English Female'
            },
            'british-noble': {
                pitch: 1.0,
                rate: 0.9,
                volume: 0.8,
                voice: 'Google UK English Male'
            },
            'british-mystic': {
                pitch: 0.8,
                rate: 0.75,
                volume: 0.7,
                voice: 'Google UK English Female'
            }
        };
        
        this.init();
    }
    
    init() {
        // Create ambient audio element with REAL file
        this.ambientAudio = new Audio('audio/ambient music for dashboard.mp3');
        this.ambientAudio.loop = true;
        this.ambientAudio.volume = 0.3;
        
        // Create story music element with REAL file
        this.storyAudio = new Audio('audio/background music for stories.mp3');
        this.storyAudio.loop = true;
        this.storyAudio.volume = 0.25;
        
        // Preload audio files
        this.ambientAudio.load();
        this.storyAudio.load();
        
        console.log('Audio System initialized with real audio files');
        this.isInitialized = true;
    }
    
    async playMemoryNarration(memoryText, memoryId) {
        if (!this.voEnabled) return;
        
        // Stop any current narration
        this.stopNarration();
        
        // Start story background music
        if (this.musicEnabled && this.storyAudio) {
            try {
                this.storyAudio.play();
                this.fadeIn(this.storyAudio, 0.25, 1000);
            } catch (e) {
                console.log('Story music playback failed:', e);
            }
        }
        
        // Check if we have a pre-recorded VO file
        const voFile = `audio/vo/memory_${memoryId}.mp3`;
        
        try {
            // Try to load pre-recorded audio
            const response = await fetch(voFile);
            if (response.ok) {
                this.voiceAudio = new Audio(voFile);
                this.voiceAudio.volume = 0.8;
                await this.voiceAudio.play();
                return;
            }
        } catch (e) {
            // Fall back to speech synthesis
        }
        
        // Fallback to Web Speech API with British accent
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(memoryText);
            const voices = speechSynthesis.getVoices();
            
            // Find British voice
            const britishVoice = voices.find(voice => 
                voice.lang === 'en-GB' && voice.name.includes('Female')
            ) || voices.find(voice => voice.lang === 'en-GB');
            
            if (britishVoice) {
                utterance.voice = britishVoice;
            }
            
            const voiceConfig = this.voiceOptions[this.currentVoice];
            utterance.pitch = voiceConfig.pitch;
            utterance.rate = voiceConfig.rate;
            utterance.volume = voiceConfig.volume;
            
            // Add dramatic pauses for FromSoft style
            const dramaticText = memoryText
                .replace(/\./g, '...')
                .replace(/,/g, ',,')
                .replace(/:/g, ':::');
            
            utterance.text = dramaticText;
            speechSynthesis.speak(utterance);
        }
    }
    
    stopNarration() {
        if (this.voiceAudio) {
            this.voiceAudio.pause();
            this.voiceAudio = null;
        }
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
        // Fade out story music
        if (this.storyAudio && !this.storyAudio.paused) {
            this.fadeOut(this.storyAudio, 1000, () => {
                this.storyAudio.pause();
            });
        }
    }
    
    async startAmbientMusic() {
        if (!this.musicEnabled || !this.ambientAudio) return;
        
        try {
            // Use the REAL ambient music file
            await this.ambientAudio.play();
            this.fadeIn(this.ambientAudio, 0.3, 2000);
            console.log('Playing real ambient music');
        } catch (e) {
            console.log('Ambient music playback failed:', e);
            // User needs to interact with page first
        }
    }
    
    stopAmbientMusic() {
        if (!this.ambientAudio) return;
        
        this.fadeOut(this.ambientAudio, 2000, () => {
            this.ambientAudio.pause();
        });
    }
    
    fadeIn(audio, targetVolume, duration) {
        audio.volume = 0;
        const increment = targetVolume / (duration / 50);
        
        const fade = setInterval(() => {
            if (audio.volume < targetVolume - increment) {
                audio.volume += increment;
            } else {
                audio.volume = targetVolume;
                clearInterval(fade);
            }
        }, 50);
    }
    
    fadeOut(audio, duration, callback) {
        const decrement = audio.volume / (duration / 50);
        
        const fade = setInterval(() => {
            if (audio.volume > decrement) {
                audio.volume -= decrement;
            } else {
                audio.volume = 0;
                clearInterval(fade);
                if (callback) callback();
            }
        }, 50);
    }
    
    toggleVO() {
        this.voEnabled = !this.voEnabled;
        if (!this.voEnabled) {
            this.stopNarration();
        }
        return this.voEnabled;
    }
    
    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (this.musicEnabled) {
            this.startAmbientMusic();
        } else {
            this.stopAmbientMusic();
            if (this.storyAudio && !this.storyAudio.paused) {
                this.fadeOut(this.storyAudio, 1000, () => {
                    this.storyAudio.pause();
                });
            }
        }
        return this.musicEnabled;
    }
    
    setVoice(voiceType) {
        if (this.voiceOptions[voiceType]) {
            this.currentVoice = voiceType;
        }
    }
    
    // Play sound effects - FromSoft style
    playSound(soundType) {
        const sounds = {
            'soul-collected': 440,  // A4 note - soul collection
            'level-up': 880,        // A5 note - level up fanfare
            'memory-unlock': 660,    // E5 note - memory revealed
            'quest-complete': 550,   // C#5 note - quest completion
            'bonfire-lit': 330,      // E4 note - bonfire activation
            'covenant-joined': 392,  // G4 note - covenant joined
            'item-acquired': 494     // B4 note - item obtained
        };
        
        if (sounds[soundType]) {
            this.playTone(sounds[soundType], 200);
        }
    }
    
    playTone(frequency, duration) {
        // Use Web Audio API for simple tones
        if (!window.AudioContext && !window.webkitAudioContext) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        // Envelope for more pleasant sound
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioSystem;
} else {
    window.AudioSystem = AudioSystem;
}
