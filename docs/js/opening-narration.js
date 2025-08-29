// FromSoft-style Opening Narration
const openingNarration = {
    text: `Long before the first pixel stirred in the phosphor dark...
    
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
    
    Begin.`,
    
    voiceSettings: {
        voice: 'en-GB',  // British English
        pitch: 0.85,      // Slightly lower for gravitas
        rate: 0.75,       // Slower, more deliberate
        volume: 0.9,      // Clear but not overwhelming
        // Dramatic pauses are built into the text with ellipses
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = openingNarration;
} else {
    window.openingNarration = openingNarration;
}
