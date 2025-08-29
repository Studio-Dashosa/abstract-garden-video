// Dark Ambient Music Generator - FromSoft/Dragon Age Style
class DarkAmbientMusic {
    constructor() {
        this.audioContext = null;
        this.nodes = {};
        this.isPlaying = false;
        this.masterVolume = 0.3;
    }
    
    init() {
        if (!window.AudioContext && !window.webkitAudioContext) {
            console.warn('Web Audio API not supported');
            return false;
        }
        
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        return true;
    }
    
    createDarkAmbient() {
        if (!this.audioContext) {
            if (!this.init()) return;
        }
        
        // Master gain
        this.nodes.masterGain = this.audioContext.createGain();
        this.nodes.masterGain.gain.value = this.masterVolume;
        this.nodes.masterGain.connect(this.audioContext.destination);
        
        // Reverb convolver for cathedral-like space
        this.nodes.reverb = this.audioContext.createConvolver();
        this.nodes.reverb.connect(this.nodes.masterGain);
        
        // Create reverb impulse response
        const length = this.audioContext.sampleRate * 4;
        const impulse = this.audioContext.createBuffer(2, length, this.audioContext.sampleRate);
        
        for (let channel = 0; channel < 2; channel++) {
            const channelData = impulse.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
            }
        }
        this.nodes.reverb.buffer = impulse;
        
        // Low drone (Dark Souls bonfire hum)
        this.createDrone();
        
        // Ethereal pad (Dragon Age mystical atmosphere)
        this.createEtherealPad();
        
        // Distant bells (FromSoft signature)
        this.createDistantBells();
        
        // Wind/breathing texture
        this.createWindTexture();
        
        this.isPlaying = true;
    }
    
    createDrone() {
        // Deep bass drone around 55Hz (A1)
        const drone = this.audioContext.createOscillator();
        drone.frequency.value = 55;
        drone.type = 'sine';
        
        const droneGain = this.audioContext.createGain();
        droneGain.gain.value = 0.15;
        
        // Add subtle vibrato
        const vibrato = this.audioContext.createOscillator();
        vibrato.frequency.value = 0.2; // Very slow
        vibrato.type = 'sine';
        
        const vibratoGain = this.audioContext.createGain();
        vibratoGain.gain.value = 1.5;
        
        vibrato.connect(vibratoGain);
        vibratoGain.connect(drone.frequency);
        
        // Low-pass filter for warmth
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 200;
        filter.Q.value = 1;
        
        drone.connect(filter);
        filter.connect(droneGain);
        droneGain.connect(this.nodes.reverb);
        
        drone.start();
        vibrato.start();
        
        this.nodes.drone = { osc: drone, gain: droneGain, vibrato: vibrato };
    }
    
    createEtherealPad() {
        // Ethereal pad with slow evolution
        const frequencies = [220, 277, 330, 440]; // A minor chord
        this.nodes.pad = [];
        
        frequencies.forEach((freq, index) => {
            const osc = this.audioContext.createOscillator();
            osc.frequency.value = freq;
            osc.type = 'triangle';
            
            const gain = this.audioContext.createGain();
            gain.gain.value = 0;
            
            // Slow fade in and out
            const now = this.audioContext.currentTime;
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.03, now + 10 + index * 2);
            gain.gain.linearRampToValueAtTime(0, now + 20 + index * 2);
            
            // High-pass filter to make it ethereal
            const filter = this.audioContext.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 400;
            filter.Q.value = 0.1;
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.nodes.reverb);
            
            osc.start();
            
            // Loop the envelope
            setInterval(() => {
                const now = this.audioContext.currentTime;
                gain.gain.linearRampToValueAtTime(0.03, now + 10);
                gain.gain.linearRampToValueAtTime(0, now + 20);
            }, 30000);
            
            this.nodes.pad.push({ osc, gain });
        });
    }
    
    createDistantBells() {
        // Occasional distant bell sounds (FromSoft signature)
        const playBell = () => {
            const bellFreq = [523.25, 659.25, 783.99][Math.floor(Math.random() * 3)]; // C5, E5, G5
            
            const bell = this.audioContext.createOscillator();
            bell.frequency.value = bellFreq;
            bell.type = 'sine';
            
            const bellGain = this.audioContext.createGain();
            const now = this.audioContext.currentTime;
            
            // Bell envelope
            bellGain.gain.setValueAtTime(0, now);
            bellGain.gain.linearRampToValueAtTime(0.05, now + 0.01);
            bellGain.gain.exponentialRampToValueAtTime(0.001, now + 4);
            
            // Add harmonics for metallic sound
            const harmonic = this.audioContext.createOscillator();
            harmonic.frequency.value = bellFreq * 2.76;
            harmonic.type = 'sine';
            
            const harmonicGain = this.audioContext.createGain();
            harmonicGain.gain.value = 0.02;
            
            bell.connect(bellGain);
            harmonic.connect(harmonicGain);
            harmonicGain.connect(bellGain);
            bellGain.connect(this.nodes.reverb);
            
            bell.start(now);
            harmonic.start(now);
            bell.stop(now + 4);
            harmonic.stop(now + 4);
            
            // Schedule next bell
            if (this.isPlaying) {
                setTimeout(playBell, 15000 + Math.random() * 30000); // Every 15-45 seconds
            }
        };
        
        // Start first bell after 5 seconds
        setTimeout(playBell, 5000);
    }
    
    createWindTexture() {
        // Brown noise for wind-like texture
        const bufferSize = 4096;
        const windNoise = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
        let lastOut = 0.0;
        
        windNoise.onaudioprocess = (e) => {
            const output = e.outputBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                output[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = output[i];
                output[i] *= 3.5;
            }
        };
        
        // Band-pass filter for wind character
        const windFilter = this.audioContext.createBiquadFilter();
        windFilter.type = 'bandpass';
        windFilter.frequency.value = 1000;
        windFilter.Q.value = 0.5;
        
        const windGain = this.audioContext.createGain();
        windGain.gain.value = 0.02;
        
        // LFO for wind variation
        const windLFO = this.audioContext.createOscillator();
        windLFO.frequency.value = 0.1;
        windLFO.type = 'sine';
        
        const windLFOGain = this.audioContext.createGain();
        windLFOGain.gain.value = 500;
        
        windLFO.connect(windLFOGain);
        windLFOGain.connect(windFilter.frequency);
        
        windNoise.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(this.nodes.reverb);
        
        windLFO.start();
        
        this.nodes.wind = { noise: windNoise, filter: windFilter, gain: windGain, lfo: windLFO };
    }
    
    stop() {
        if (!this.isPlaying) return;
        
        // Stop all oscillators
        if (this.nodes.drone) {
            this.nodes.drone.osc.stop();
            this.nodes.drone.vibrato.stop();
        }
        
        if (this.nodes.pad) {
            this.nodes.pad.forEach(p => p.osc.stop());
        }
        
        if (this.nodes.wind) {
            this.nodes.wind.lfo.stop();
            this.nodes.wind.noise.disconnect();
        }
        
        this.isPlaying = false;
        this.nodes = {};
    }
    
    setVolume(value) {
        this.masterVolume = value;
        if (this.nodes.masterGain) {
            this.nodes.masterGain.gain.value = value;
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkAmbientMusic;
} else {
    window.DarkAmbientMusic = DarkAmbientMusic;
}
