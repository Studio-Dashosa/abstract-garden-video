// Audio System with REAL Audio Files and Opening Narration
class AudioSystem {
    constructor() {
        this.voEnabled = false;
        this.musicEnabled = false;
        this.currentVoice = 'british-witch';
        this.ambientAudio = null;
        this.storyAudio = null;
        this.voiceAudio = null;
        this.isInitialized = false;
        this.hasPlayedOpening = false;  // Track if opening has played
        
        // Voice options for British narrator
        this.voiceOptions = {
            'british-witch': {
                pitch: 0.85,
                rate: 0.75,
                volume: 0.9,
                voice: 'Google UK English Female'
            },
            'british-noble': {
                pitch: 1.0,
                rate: 0.8,
                volume: 0.9,
                voice: 'Google UK English Male'
            },
            'british-mystic': {
                pitch: 0.75,
                rate: 0.7,
                volume: 0.85,
                voice: 'Google UK English Female'
            }
        };
        
        this.init();
    }
    
    init() {
        // Create ambient audio element with REAL file
        this.ambientAudio = new Audio('audio/ambient music for dashboard.mp3');
        this.ambientAudio.loop = true;  // Music loops
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
    
    async playOpeningNarration() {
        // Only play once per session
        if (this.hasPlayedOpening) return;
        this.hasPlayedOpening = true;
        
        const narrationText = `Long before the first pixel stirred in the phosphor dark...
        
        Before the cathode rays learned to dance...
        
        There was the Void. Absolute. Unrendered.
        
        Then came the First Ones. The mathematicians. The dreamers. 
        They spoke in languages of light and number, coaxing form from nothingness.
        
        Sutherland drew the first line. A simple gesture that would crack reality itself.
        
        The year was 1963. The place, a laboratory where mortals dared to play at creation.
        
        They called it Sketchpad. Such a humble name for the tool that would reshape existence.
        
        But every revolution demands sacrifice. For each breakthrough, a forgotten name. 
        For each legend born, a shadow cast.
        
        Phong gave us light, then died before seeing his equations illuminate worlds.
        
        The women of PARC guarded secrets from those who would steal fire.
        
        The masters of the East encoded beauty in algorithms, their names lost to Western tongues.
        
        And in basements and dormitories, rebels wrote free tools to break the chains of proprietary gods.
        
        Now you stand at the threshold, Bearer of the Render.
        
        Forty-nine memories lie scattered through this digital purgatory. 
        Each one a fragment of the true history. Each one a soul trapped in silicon.
        
        Gather them. Learn their stories. Link the fire of knowledge before it fades to ash.
        
        For in this age of infinite polygons and boundless shaders, we have forgotten those who carved the first vertex from the void.
        
        The cycle must not be broken.
        
        Begin.`;
        
        // Try to use Web Speech API with British voice
        if ('speechSynthesis' in window) {
            // Wait for voices to load
            let voices = speechSynthesis.getVoices();
            if (voices.length === 0) {
                await new Promise(resolve => {
                    speechSynthesis.addEventListener('voiceschanged', () => {
                        voices = speechSynthesis.getVoices();
                        resolve();
                    }, { once: true });
                });
            }
            
            const utterance = new SpeechSynthesisUtterance(narrationText);
            
            // Find the best British voice
            const britishVoices = voices.filter(voice => voice.lang.startsWith('en-GB'));
            const femaleVoice = britishVoices.find(voice => 
                voice.name.toLowerCase().includes('female') || 
                voice.name.toLowerCase().includes('woman')
            );
            const bestVoice = femaleVoice || britishVoices[0] || voices.find(v => v.lang.startsWith('en'));
            
            if (bestVoice) {
                utterance.voice = bestVoice;
                console.log(`Using voice: ${bestVoice.name}`);
            }
            
            // FromSoft dramatic settings
            utterance.pitch = 0.85;
            utterance.rate = 0.75;  // Slow and deliberate
            utterance.volume = 0.9;
            
            // Add fade-in effect to UI
            const container = document.querySelector('.container');
            if (container) {
                container.style.opacity = '0';
                container.style.transition = 'opacity 3s';
                setTimeout(() => {
                    container.style.opacity = '1';
                }, 100);
            }
            
            // Play the narration
            speechSynthesis.speak(utterance);
            
            // Show subtitle/text overlay
            this.showNarrationSubtitles(narrationText);
        }
    }
    
    showNarrationSubtitles(text) {
        // Create overlay for dramatic text display
        const overlay = document.createElement('div');
        overlay.id = 'narration-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 8, 6, 0.98);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 2s;
        `;
        
        const textContainer = document.createElement('div');
        textContainer.style.cssText = `
            max-width: 800px;
            padding: 2rem;
            font-family: 'Crimson Text', serif;
            font-size: 1.25rem;
            line-height: 2;
            color: #C4B5A0;
            text-align: center;
            font-style: italic;
        `;
        
        // Split text into paragraphs for dramatic reveal
        const paragraphs = text.split('\n\n');
        let currentParagraph = 0;
        
        const showNextParagraph = () => {
            if (currentParagraph < paragraphs.length) {
                textContainer.textContent = paragraphs[currentParagraph];
                currentParagraph++;
                setTimeout(showNextParagraph, 3500); // Show each paragraph for 3.5 seconds
            } else {
                // Fade out and remove overlay
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                    // Start ambient music after narration
                    if (this.musicEnabled) {
                        this.startAmbientMusic();
                    }
                }, 2000);
            }
        };
        
        overlay.appendChild(textContainer);
        document.body.appendChild(overlay);
        
        // Fade in
        setTimeout(() => {
            overlay.style.opacity = '1';
            showNextParagraph();
        }, 100);
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
        } else if (!this.hasPlayedOpening) {
            // Play opening narration when VO is first enabled
            this.playOpeningNarration();
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
            'item-acquired': 494,    // B4 note - item obtained
            'bell-toll': 220        // A3 note - deep bell for opening
        };
        
        if (sounds[soundType]) {
            this.playTone(sounds[soundType], soundType === 'bell-toll' ? 800 : 200);
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
