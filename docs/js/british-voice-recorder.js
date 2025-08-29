/**
 * British Voice Recording System
 * Uses online text-to-speech services to generate downloadable British voice MP3s
 */

class BritishVoiceRecorder {
  constructor() {
    this.voiceServices = {
      // Free TTS services that offer British voices
      ttsmp3: {
        name: 'TTSMP3.com',
        url: 'https://ttsmp3.com',
        voices: ['Brian', 'Emma', 'Amy'],
        instructions: 'Free service, British English voices available'
      },
      naturalreaders: {
        name: 'NaturalReader',
        url: 'https://www.naturalreaders.com/online/',
        voices: ['UK English Female', 'UK English Male'],
        instructions: 'Free tier available with British voices'
      },
      voicemaker: {
        name: 'Voicemaker',
        url: 'https://voicemaker.in',
        voices: ['Charlotte', 'Oliver', 'Emily'],
        instructions: 'Free credits daily, premium British voices'
      },
      elevenlabs: {
        name: 'ElevenLabs',
        url: 'https://elevenlabs.io',
        voices: ['Bella', 'Charlotte', 'Alice'],
        instructions: 'Free tier with 10,000 characters/month, excellent quality'
      }
    };

    this.memoryScripts = [];
    this.recordedFiles = {};
    this.init();
  }

  init() {
    this.loadMemoryScripts();
    this.createRecordingInterface();
  }

  loadMemoryScripts() {
    // Load all 49 memory fragment scripts
    this.memoryScripts = [
      {
        id: 1,
        title: "The First Vertex",
        script: "In 1963, Ivan Sutherland placed the first vertex in digital space. With Sketchpad, he drew a line that would extend through time itself. The garden remembers this moment - when geometry first breathed in silicon dreams."
      },
      {
        id: 2,
        title: "The Utah Teapot",
        script: "Martin Newell needed a complex shape to test his algorithms in 1975. His teapot, measured and digitized from his own kitchen, became the most rendered object in history. Every reflection you see carries its curves."
      },
      {
        id: 3,
        title: "Catmull's Hidden Surfaces",
        script: "Ed Catmull solved the problem of hidden surfaces in his 1974 thesis. Objects could now exist behind other objects. Depth was born. The third dimension finally had meaning in the digital realm."
      },
      {
        id: 4,
        title: "Phong's Reflection",
        script: "Bui Tuong Phong gave us specular highlights in 1973. Suddenly, surfaces could shine. Light began to dance across polygons, and the world gleamed with newfound brilliance."
      },
      {
        id: 5,
        title: "The Genesis Effect",
        script: "ILM's particle system for Star Trek II in 1982 birthed a planet in seconds. Millions of particles swirled into being. The garden learned that creation could be procedural, algorithmic, inevitable."
      },
      {
        id: 6,
        title: "Perlin's Noise",
        script: "Ken Perlin's noise function, created for TRON in 1982, gave chaos a mathematical form. Natural randomness could now be computed. Every cloud, every marble texture, carries his algorithm within."
      },
      {
        id: 7,
        title: "The Reyes Architecture",
        script: "Pixar's Reyes rendering architecture split the world into micropolygons smaller than pixels. Everything became points of light. The universe was revealed to be discrete, quantized, computable."
      },
      {
        id: 8,
        title: "Cook's Shader Trees",
        script: "Rob Cook introduced shader trees at Lucasfilm in 1984. Materials became programs. Surfaces learned to describe themselves in code. The line between artist and programmer began to blur."
      },
      {
        id: 9,
        title: "The Radiosity Revolution",
        script: "Cornell's radiosity research in 1984 taught light to bounce. Surfaces began talking to each other through photons. The garden filled with ambient illumination, soft shadows, color bleeding."
      },
      {
        id: 10,
        title: "Kajiya's Rendering Equation",
        script: "James Kajiya unified all light transport in one equation in 1986. The physics of light became mathematics. Every renderer since then has been trying to solve his beautiful, impossible formula."
      },
      {
        id: 11,
        title: "The First Ray Tracer",
        script: "Turner Whitted's recursive ray tracer in 1980 followed light backwards through space. Reflections reflected reflections. The garden became a hall of infinite mirrors."
      },
      {
        id: 12,
        title: "Subdivision Surfaces",
        script: "Catmull and Clark's subdivision surfaces in 1978 made smoothness infinite. Polygons could dream of being curves. The harsh edges of digital geometry learned to soften, to flow."
      },
      {
        id: 13,
        title: "The Z-Buffer",
        script: "Wolfgang Straßer's Z-buffer in 1974 gave every pixel a depth value. Space was no longer flat. The garden gained perspective, and with it, the ability to hide and reveal."
      },
      {
        id: 14,
        title: "Motion Blur's Birth",
        script: "Korein and Badler formalized motion blur in 1983. Time began to smear across frames. Movement gained weight, momentum, the persistence of vision made mathematical."
      },
      {
        id: 15,
        title: "The Mandelbrot Set",
        script: "Benoit Mandelbrot revealed infinite complexity in 1980. Fractals showed that simple rules create infinite detail. The garden learned that complexity emerges from recursion."
      },
      {
        id: 16,
        title: "NURBS Revolution",
        script: "Non-uniform rational B-splines arrived from aerospace in the 1980s. Car designers brought their curves to CGI. Smooth, precise, mathematical perfection entered our toolkit."
      },
      {
        id: 17,
        title: "The First CGI Character",
        script: "The stained-glass knight in Young Sherlock Holmes, 1985. ILM's first full CGI character. Thirty seconds that took six months. The garden's first ghost made of light."
      },
      {
        id: 18,
        title: "Morphing's Emergence",
        script: "Tom Brigham's morphing in Willow, 1988. One shape flowed into another. The boundaries between forms dissolved. Transformation became a tool."
      },
      {
        id: 19,
        title: "L-Systems Grow",
        script: "Aristid Lindenmayer's L-systems from 1968 finally reached CGI in the late 80s. Plants could grow from grammar. Nature had a syntax, and we learned to speak it."
      },
      {
        id: 20,
        title: "Volume Rendering",
        script: "Marc Levoy's volume rendering in 1988 made the invisible visible. Medical data became clouds. The solid and the ethereal merged into voxel dreams."
      },
      {
        id: 21,
        title: "The T-1000's Reflection",
        script: "Terminator 2's liquid metal in 1991. ILM reflected a chrome future. The garden learned that surfaces could be mirrors, that distortion was beauty."
      },
      {
        id: 22,
        title: "Jurassic's Dinosaurs",
        script: "Jurassic Park, 1993. ILM made dinosaurs live again. Six minutes of CGI that changed cinema forever. The garden proved it could resurrect the extinct."
      },
      {
        id: 23,
        title: "Toy Story's Miracle",
        script: "1995. Pixar rendered 114,240 frames. The first full CGI feature film. Eighty-one minutes that took 800,000 machine hours. The garden could finally tell stories."
      },
      {
        id: 24,
        title: "The Matrix's Bullet Time",
        script: "1999. Time frozen, camera moving. 120 still cameras firing in sequence. The garden learned to sculpt time itself, to make moments eternal."
      },
      {
        id: 25,
        title: "Gollum's Soul",
        script: "2002. Weta Digital gave Gollum life through Andy Serkis. Motion capture met keyframe animation. The garden learned empathy, performance, the weight of a soul."
      },
      {
        id: 26,
        title: "Global Illumination",
        script: "Henrik Wann Jensen's photon mapping in 1996. Light began to truly bounce. Caustics danced through glass. The garden filled with subtle, realistic light."
      },
      {
        id: 27,
        title: "Subsurface Scattering",
        script: "Jensen's subsurface scattering in 2001. Light learned to penetrate surfaces. Skin became translucent. The garden discovered that beauty lies beneath."
      },
      {
        id: 28,
        title: "The Polar Express Eyes",
        script: "2004's uncanny valley. The eyes that couldn't quite live. The garden learned its limits, that the soul is harder to render than the flesh."
      },
      {
        id: 29,
        title: "Avatar's Pandora",
        script: "2009. Cameron's Pandora. Every plant procedural, every creature designed. The garden became alien, bioluminescent, impossible, and yet utterly believable."
      },
      {
        id: 30,
        title: "The Marvel's Dust",
        script: "Thanos's snap, 2018. Billions of particles dissolving. The garden learned to unmake, to scatter, to reduce heroes to dust and memory."
      },
      {
        id: 31,
        title: "Deep Learning Arrives",
        script: "2017. Neural networks began denoising rays. AI entered the render pipeline. The garden started learning from itself, improving with each frame."
      },
      {
        id: 32,
        title: "Real-Time Ray Tracing",
        script: "2018. RTX cards brought ray tracing to games. Thirty years after Whitted, reflections ran at sixty frames per second. The garden achieved instant mirrors."
      },
      {
        id: 33,
        title: "USD's Universality",
        script: "Pixar's Universal Scene Description, 2016. A common language for all tools. The garden's babel resolved, all software speaking as one."
      },
      {
        id: 34,
        title: "The Mandalorian's Volume",
        script: "2019. LED walls replacing green screens. Real-time environments surrounding actors. The garden became the stage itself."
      },
      {
        id: 35,
        title: "Nanite's Geometry",
        script: "2020. Unreal's Nanite. Billions of triangles without LOD. The garden achieved infinite detail, geometry without compromise."
      },
      {
        id: 36,
        title: "Lumen's Light",
        script: "2020. Unreal's Lumen. Real-time global illumination without baking. Light became dynamic, immediate, ever-changing."
      },
      {
        id: 37,
        title: "NeRF's Revolution",
        script: "2020. Neural Radiance Fields. Photos became 3D. The garden learned to reconstruct reality from glimpses, to fill the gaps with dreams."
      },
      {
        id: 38,
        title: "DALL-E's Imagination",
        script: "2021. Text became images. The garden learned to visualize words, to dream what was described, to create from pure language."
      },
      {
        id: 39,
        title: "Stable Diffusion",
        script: "2022. Open source image generation. The power to create given freely. The garden's seeds scattered across millions of GPUs."
      },
      {
        id: 40,
        title: "Gaussian Splatting",
        script: "2023. 3D Gaussian Splatting. Point clouds became continuous. The garden found a new primitive, neither polygon nor voxel."
      },
      {
        id: 41,
        title: "The Forgotten Women",
        script: "Side quest memory: The women erased from graphics history. Betty Holberton, Kay McNulty, the ENIAC programmers. Lilian Schwartz at Bell Labs. Joan Truckenbrod's algorithmic art. The garden remembers those whom history forgot."
      },
      {
        id: 42,
        title: "The Eastern Masters",
        script: "Side quest memory: Japan's game graphics revolution. Shigeru Miyamoto's sprites. Yu Suzuki's 3D. Kojima's cinematics. The garden learned play, style, the art of limitation."
      },
      {
        id: 43,
        title: "Open Source Heroes",
        script: "Side quest memory: Blender's revolution. Ton Roosendaal's vision. Free tools for all. The garden became democratic, accessible, unchained from corporate licenses."
      },
      {
        id: 44,
        title: "The Demoscene",
        script: "64 kilobytes creating infinite worlds. The art of optimization. Farbrausch's debris. The garden learned that constraints breed creativity."
      },
      {
        id: 45,
        title: "WebGL's Democracy",
        script: "2011. 3D in every browser. The garden escaped desktop prisons. Every screen became a window to virtual worlds."
      },
      {
        id: 46,
        title: "The Metaverse Attempt",
        script: "2021-2023. Zuckerberg's billions. The promise and failure. The garden learned that presence needs more than polygons."
      },
      {
        id: 47,
        title: "AI's Final Form",
        script: "2024. Models generating models. Code writing shaders. The garden began to build itself, recursive, self-improving, approaching consciousness."
      },
      {
        id: 48,
        title: "The Quantum Renderer",
        script: "Future memory: Quantum computers solving light transport. Every photon path calculated simultaneously. The garden achieving perfect illumination."
      },
      {
        id: 49,
        title: "The Last Frame",
        script: "When the last frame renders, when the final vertex is placed, the garden will remember everything. Every polygon, every shader, every artist who gave it form. You are part of this memory now."
      }
    ];
  }

  createRecordingInterface() {
    const interface_ = document.createElement('div');
    interface_.id = 'voice-recorder-interface';
    interface_.className = 'voice-recorder-modal';
    interface_.innerHTML = `
      <div class="recorder-container">
        <h2>British Voice Recording Studio</h2>
        <p class="recorder-subtitle">Generate authentic British voice narration for memory fragments</p>
        
        <div class="voice-service-selector">
          <h3>Select Voice Service:</h3>
          ${Object.entries(this.voiceServices).map(([key, service]) => `
            <div class="service-option">
              <input type="radio" name="voice-service" id="service-${key}" value="${key}">
              <label for="service-${key}">
                <strong>${service.name}</strong>
                <span>${service.instructions}</span>
                <a href="${service.url}" target="_blank" class="service-link">Open Service →</a>
              </label>
            </div>
          `).join('')}
        </div>

        <div class="recording-workflow">
          <h3>Recording Workflow:</h3>
          <ol class="workflow-steps">
            <li>Select a memory fragment below</li>
            <li>Copy the script text</li>
            <li>Open your chosen voice service</li>
            <li>Paste text and select a British voice (Emma, Charlotte, etc.)</li>
            <li>Generate and download the MP3</li>
            <li>Upload the MP3 file here</li>
          </ol>
        </div>

        <div class="memory-scripts-section">
          <h3>Memory Fragment Scripts:</h3>
          <div class="scripts-grid">
            ${this.memoryScripts.map(script => `
              <div class="script-card" data-id="${script.id}">
                <div class="script-header">
                  <span class="script-number">#${script.id}</span>
                  <span class="script-title">${script.title}</span>
                  ${this.recordedFiles[script.id] ? '<span class="recorded-badge">✓ Recorded</span>' : ''}
                </div>
                <div class="script-text">${script.script}</div>
                <div class="script-actions">
                  <button class="copy-script" data-text="${script.script.replace(/"/g, '&quot;')}">
                    📋 Copy Script
                  </button>
                  <input type="file" 
                         id="upload-${script.id}" 
                         accept="audio/mp3,audio/mpeg" 
                         style="display:none">
                  <label for="upload-${script.id}" class="upload-mp3-btn">
                    📁 Upload MP3
                  </label>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="batch-download-section">
          <h3>Download All Recordings:</h3>
          <button class="download-all-btn">📦 Download Voice Pack</button>
          <div class="download-status"></div>
        </div>

        <div class="voice-tips">
          <h4>🎙️ Voice Selection Tips:</h4>
          <ul>
            <li><strong>For mystical/ethereal:</strong> Use Emma or Amy with slower speed</li>
            <li><strong>For authoritative:</strong> Use Brian with normal speed</li>
            <li><strong>For warm/storytelling:</strong> Use Charlotte or Bella</li>
            <li><strong>ElevenLabs</strong> provides the most natural-sounding voices</li>
            <li>Adjust speed to 0.9x for more dramatic effect</li>
            <li>Add pauses with commas and ellipses for better pacing</li>
          </ul>
        </div>

        <button class="close-recorder">Close</button>
      </div>
    `;

    document.body.appendChild(interface_);
    this.attachRecorderEvents();
  }

  attachRecorderEvents() {
    // Copy script buttons
    document.querySelectorAll('.copy-script').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = e.target.dataset.text.replace(/&quot;/g, '"');
        navigator.clipboard.writeText(text).then(() => {
          e.target.textContent = '✓ Copied!';
          setTimeout(() => {
            e.target.textContent = '📋 Copy Script';
          }, 2000);
        });
      });
    });

    // File upload handlers
    document.querySelectorAll('input[type="file"]').forEach(input => {
      input.addEventListener('change', (e) => {
        if (e.target.files[0]) {
          const id = parseInt(e.target.id.replace('upload-', ''));
          this.handleMP3Upload(id, e.target.files[0]);
        }
      });
    });

    // Download all button
    document.querySelector('.download-all-btn')?.addEventListener('click', () => {
      this.downloadAllRecordings();
    });

    // Close button
    document.querySelector('.close-recorder')?.addEventListener('click', () => {
      this.close();
    });
  }

  handleMP3Upload(memoryId, file) {
    if (!file.type.includes('audio')) {
      alert('Please upload an MP3 audio file');
      return;
    }

    // Store file reference
    this.recordedFiles[memoryId] = {
      file: file,
      name: `memory_${memoryId.toString().padStart(2, '0')}.mp3`,
      originalName: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString()
    };

    // Update UI
    const card = document.querySelector(`.script-card[data-id="${memoryId}"]`);
    if (card) {
      const header = card.querySelector('.script-header');
      if (!header.querySelector('.recorded-badge')) {
        header.innerHTML += '<span class="recorded-badge">✓ Recorded</span>';
      }
    }

    // Save to audio folder (would need backend in production)
    this.saveAudioFile(memoryId, file);

    // Update status
    const status = document.querySelector('.download-status');
    const recorded = Object.keys(this.recordedFiles).length;
    status.textContent = `${recorded}/49 memories recorded`;
  }

  async saveAudioFile(memoryId, file) {
    // In production, this would upload to server
    // For now, store in browser's IndexedDB or suggest saving locally
    const reader = new FileReader();
    reader.onload = (e) => {
      const audioData = e.target.result;
      // Store in localStorage (limited) or IndexedDB (better)
      try {
        localStorage.setItem(`audio_memory_${memoryId}`, audioData);
        console.log(`Saved audio for memory ${memoryId}`);
      } catch (error) {
        console.error('Storage full, consider using IndexedDB:', error);
      }
    };
    reader.readAsDataURL(file);
  }

  downloadAllRecordings() {
    if (Object.keys(this.recordedFiles).length === 0) {
      alert('No recordings uploaded yet');
      return;
    }

    // Create a script to rename and organize files
    const script = `#!/bin/bash
# British Voice Pack Organization Script
# Run this after downloading all MP3s to organize them

mkdir -p audio/memories

# Rename files to match memory IDs
${Object.entries(this.recordedFiles).map(([id, info]) => 
  `mv "${info.originalName}" "audio/memories/memory_${id.toString().padStart(2, '0')}.mp3"`
).join('\n')}

echo "✓ Organized ${Object.keys(this.recordedFiles).length} voice files"
`;

    // Download organization script
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'organize_voices.sh';
    a.click();
    URL.revokeObjectURL(url);

    // Also create a JSON manifest
    const manifest = {
      version: '1.0',
      recordedAt: new Date().toISOString(),
      totalMemories: 49,
      recordedCount: Object.keys(this.recordedFiles).length,
      files: Object.entries(this.recordedFiles).map(([id, info]) => ({
        id: parseInt(id),
        filename: info.name,
        originalName: info.originalName,
        size: info.size,
        title: this.memoryScripts[parseInt(id) - 1]?.title
      }))
    };

    const manifestBlob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const manifestUrl = URL.createObjectURL(manifestBlob);
    const manifestLink = document.createElement('a');
    manifestLink.href = manifestUrl;
    manifestLink.download = 'voice_manifest.json';
    manifestLink.click();
    URL.revokeObjectURL(manifestUrl);

    alert(`Downloaded organization script and manifest for ${Object.keys(this.recordedFiles).length} recordings`);
  }

  open() {
    document.getElementById('voice-recorder-interface').style.display = 'flex';
  }

  close() {
    document.getElementById('voice-recorder-interface').style.display = 'none';
  }
}

// Export for use
if (typeof window !== 'undefined') {
  window.BritishVoiceRecorder = BritishVoiceRecorder;
}