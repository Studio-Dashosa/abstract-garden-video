// Enhanced Audio System with Better British Voice Support
class AudioSystem {
    constructor() {
        this.voEnabled = false;
        this.musicEnabled = false;
        this.currentVoice = 'british-witch';
        this.ambientAudio = null;
        this.storyAudio = null;
        this.voiceAudio = null;
        this.isInitialized = false;
        this.hasPlayedOpening = false;
        this.voicesLoaded = false;
        this.selectedVoice = null;
        
        // Voice options for British narrator
        this.voiceOptions = {
            'british-witch': {
                pitch: 0.85,
                rate: 0.75,
                volume: 1.0,
                voice: 'Google UK English Female'
            }
        };
        
        this.init();
    }
    
    async init() {
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
        
        // Load voices
        await this.loadVoices();
        
        console.log('Audio System initialized with real audio files');
        this.isInitialized = true;
    }
    
    async loadVoices() {
        return new Promise((resolve) => {
            // Check if speech synthesis is available
            if (!('speechSynthesis' in window)) {
                console.warn('Speech synthesis not supported in this browser');
                resolve();
                return;
            }
            
            // Function to get and select best voice
            const selectBestVoice = () => {
                const voices = speechSynthesis.getVoices();
                console.log(`Found ${voices.length} voices`);
                
                if (voices.length === 0) {
                    return null;
                }
                
                // Priority list of British voices
                const voicePriority = [
                    // Windows voices
                    'Microsoft Hazel Online (Natural) - English (United Kingdom)',
                    'Microsoft Hazel - English (United Kingdom)',
                    'Microsoft Susan - English (United Kingdom)',
                    'Microsoft George - English (United Kingdom)',
                    
                    // Google voices
                    'Google UK English Female',
                    'Google UK English Male',
                    
                    // Mac voices
                    'Fiona',
                    'Kate',
                    'Stephanie',
                    'Daniel',
                    
                    // Generic British
                    'en-GB',
                    'en_GB'
                ];
                
                // Try to find voice by exact name
                for (const name of voicePriority) {
                    const voice = voices.find(v => v.name === name);
                    if (voice) {
                        console.log(`Selected voice by name: ${voice.name}`);
                        return voice;
                    }
                }
                
                // Try to find any British female voice
                const britishFemale = voices.find(v => 
                    v.lang.includes('en-GB') && 
                    (v.name.toLowerCase().includes('female') || 
                     v.name.toLowerCase().includes('woman') ||
                     v.name.toLowerCase().includes('hazel') ||
                     v.name.toLowerCase().includes('kate'))
                );
                if (britishFemale) {
                    console.log(`Selected British female: ${britishFemale.name}`);
                    return britishFemale;
                }
                
                // Try any British voice
                const anyBritish = voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en_GB'));
                if (anyBritish) {
                    console.log(`Selected any British: ${anyBritish.name}`);
                    return anyBritish;
                }
                
                // Fallback to any English voice
                const anyEnglish = voices.find(v => v.lang.startsWith('en'));
                if (anyEnglish) {
                    console.log(`Fallback to English: ${anyEnglish.name}`);
                    return anyEnglish;
                }
                
                // Use first available voice
                console.log(`Using first available: ${voices[0].name}`);
                return voices[0];
            };
            
            // Try to get voices immediately
            let voices = speechSynthesis.getVoices();
            
            if (voices.length > 0) {
                this.selectedVoice = selectBestVoice();
                this.voicesLoaded = true;
                resolve();
            } else {
                // Wait for voices to load
                console.log('Waiting for voices to load...');
                speechSynthesis.addEventListener('voiceschanged', () => {
                    this.selectedVoice = selectBestVoice();
                    this.voicesLoaded = true;
                    resolve();
                }, { once: true });
                
                // Trigger voice loading
                speechSynthesis.getVoices();
                
                // Timeout fallback
                setTimeout(() => {
                    if (!this.voicesLoaded) {
                        console.warn('Voice loading timeout');
                        resolve();
                    }
                }, 3000);
            }
        });
    }
    
    async playOpeningNarration() {
        // Only play once per session
        if (this.hasPlayedOpening) return;
        this.hasPlayedOpening = true;
        
        console.log('Starting opening narration...');
        
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
        
        // Check if we can use speech synthesis
        if (!('speechSynthesis' in window)) {
            console.error('Speech synthesis not supported');
            this.showNarrationSubtitles(narrationText);
            return;
        }
        
        // Make sure voices are loaded
        if (!this.voicesLoaded) {
            await this.loadVoices();
        }
        
        // Cancel any existing speech
        speechSynthesis.cancel();
        
        // Create utterance
        const utterance = new SpeechSynthesisUtterance(narrationText);
        
        // Set voice if we found one
        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
            console.log(`Using voice for narration: ${this.selectedVoice.name}`);
        } else {
            console.warn('No voice selected, using default');
        }
        
        // Set voice parameters for dramatic effect
        utterance.pitch = 0.85;  // Slightly lower pitch
        utterance.rate = 0.75;   // Slower for drama
        utterance.volume = 1.0;  // Full volume
        
        // Add event listeners
        utterance.onstart = () => {
            console.log('Narration started');
            this.showNarrationSubtitles(narrationText);
        };
        
        utterance.onend = () => {
            console.log('Narration ended');
            if (this.musicEnabled) {
                this.startAmbientMusic();
            }
        };
        
        utterance.onerror = (event) => {
            console.error('Speech error:', event);
            this.showNarrationSubtitles(narrationText);
        };
        
        // Speak!
        try {
            speechSynthesis.speak(utterance);
            console.log('Speech synthesis started');
        } catch (error) {
            console.error('Failed to start speech:', error);
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
            cursor: pointer;
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
        
        const skipHint = document.createElement('div');
        skipHint.style.cssText = `
            position: absolute;
            bottom: 2rem;
            right: 2rem;
            color: #8B8378;
            font-size: 0.9rem;
            font-family: 'JetBrains Mono', monospace;
        `;
        skipHint.textContent = 'Click to skip';
        
        // Split text into paragraphs for dramatic reveal
        const paragraphs = text.split('\n\n');
        let currentParagraph = 0;
        let timeoutId;
        
        const showNextParagraph = () => {
            if (currentParagraph < paragraphs.length) {
                textContainer.textContent = paragraphs[currentParagraph];
                currentParagraph++;
                timeoutId = setTimeout(showNextParagraph, 3500);
            } else {
                // Fade out and remove overlay
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                    if (this.musicEnabled) {
                        this.startAmbientMusic();
                    }
                }, 2000);
            }
        };
        
        // Allow clicking to skip
        overlay.addEventListener('click', () => {
            clearTimeout(timeoutId);
            speechSynthesis.cancel();
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 500);
            if (this.musicEnabled) {
                this.startAmbientMusic();
            }
        });
        
        overlay.appendChild(textContainer);
        overlay.appendChild(skipHint);
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
        
        // Make sure voices are loaded
        if (!this.voicesLoaded) {
            await this.loadVoices();
        }
        
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(memoryText);
            
            if (this.selectedVoice) {
                utterance.voice = this.selectedVoice;
            }
            
            utterance.pitch = 0.85;
            utterance.rate = 0.75;
            utterance.volume = 1.0;
            
            try {
                speechSynthesis.speak(utterance);
            } catch (error) {
                console.error('Failed to speak memory:', error);
            }
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
            await this.ambientAudio.play();
            this.fadeIn(this.ambientAudio, 0.3, 2000);
            console.log('Playing real ambient music');
        } catch (e) {
            console.log('Ambient music playback failed:', e);
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
    
    async toggleVO() {
        this.voEnabled = !this.voEnabled;
        if (!this.voEnabled) {
            this.stopNarration();
        } else if (!this.hasPlayedOpening) {
            // Make sure voices are loaded before playing
            if (!this.voicesLoaded) {
                console.log('Loading voices before narration...');
                await this.loadVoices();
            }
            // Play opening narration when VO is first enabled
            await this.playOpeningNarration();
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
    
    // Play sound effects - FromSoft style
    playSound(soundType) {
        const sounds = {
            'soul-collected': 440,
            'level-up': 880,
            'memory-unlock': 660,
            'quest-complete': 550,
            'bonfire-lit': 330,
            'covenant-joined': 392,
            'item-acquired': 494,
            'bell-toll': 220
        };
        
        if (sounds[soundType]) {
            this.playTone(sounds[soundType], soundType === 'bell-toll' ? 800 : 200);
        }
    }
    
    playTone(frequency, duration) {
        if (!window.AudioContext && !window.webkitAudioContext) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
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
