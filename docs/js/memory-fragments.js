// FromSoft-style Memory Fragment Stories
const memoryFragments = [
    // Act I: The Awakening (1-10)
    {
        id: 1,
        title: "The First Vertex",
        text: "In the beginning, there was darkness. Then Sutherland placed the first point in digital space, 1963. The light pen trembled in his hand as reality bent. 'Sketchpad,' he whispered, and the void learned to remember shapes.",
        souls: 100,
        embers: 75
    },
    {
        id: 2,
        title: "The Cathode Ray Prophecy",
        text: "The oscilloscope's green glow birthed phantoms. Whirlwind I at MIT, 1951 - where light first danced to numbers' commands. The engineers spoke in binary tongues, summoning storms of electrons.",
        souls: 100,
        embers: 75
    },
    {
        id: 3,
        title: "Bresenham's Line",
        text: "1962. IBM kept the algorithm locked away, classified. 'Too powerful,' they said. Bresenham drew perfect lines with only integers - no floating point sorcery needed. The machine spirits rejoiced.",
        souls: 150,
        embers: 95
    },
    {
        id: 4,
        title: "The Utah Covenant",
        text: "1974. Evans & Sutherland's disciples gathered in Salt Lake City. They rendered a teapot - not for tea, but for testing reality itself. Martin Newell's wife Sandra chose it from their kitchen. Now it lives eternal.",
        souls: 150,
        embers: 95
    },
    {
        id: 5,
        title: "Gouraud's Shade",
        text: "Henri Gouraud, 1971, discovered how light flows across polygons like water. The French mathematician made surfaces smooth where there were only sharp edges. The digital realm learned to dream in gradients.",
        souls: 200,
        embers: 105
    },
    {
        id: 6,
        title: "Phong's Last Light",
        text: "Bui Tuong Phong burned bright and brief. 1973, he taught pixels to reflect like mirrors, to gleam like wet stone. Dead at 32, his equations outlived him - every highlight, a memorial.",
        souls: 200,
        embers: 105
    },
    {
        id: 7,
        title: "The Z-Buffer Revelation",
        text: "Edwin Catmull, 1974, solved the ancient riddle: which polygon stands before another? The Z-buffer remembers depth, sorting reality pixel by pixel. Hidden surfaces stayed hidden. Order emerged from chaos.",
        souls: 250,
        embers: 115
    },
    {
        id: 8,
        title: "Blinn's Specular Truth",
        text: "Jim Blinn improved upon Phong's work, 1977. 'Why calculate the reflection vector?' he asked the void. The half-vector was born - faster, smoother, more elegant. NASA used it to render Voyager's journey.",
        souls: 250,
        embers: 115
    },
    {
        id: 9,
        title: "The Xerox Heresy",
        text: "1973, Xerox PARC. They built the Alto - first to show bitmapped graphics to mortals. Adele Goldberg guarded Smalltalk's secrets. Steve Jobs came seeking fire; she tried to deny him. The future leaked out anyway.",
        souls: 300,
        embers: 125
    },
    {
        id: 10,
        title: "The Frame Buffer Prophecy",
        text: "Richard Shoup at Xerox, 1973, built SuperPaint. First full-color frame buffer - 640x486 pixels, each one addressable. He painted with light itself. The canvas was memory, the brush was mathematics.",
        souls: 300,
        embers: 125
    },

    // Act II: The Rendering Wars (11-20)
    {
        id: 11,
        title: "Whitted's Ray",
        text: "Turner Whitted, 1980, cast the first recursive ray. It bounced through digital mirrors, refracted through virtual glass. 'An Improved Illumination Model' he called it. Understatement of the century.",
        souls: 350,
        embers: 135
    },
    {
        id: 12,
        title: "Cook's Monte Carlo Gambit",
        text: "Robert Cook at Pixar, 1984, embraced chaos. Distributed ray tracing - scatter rays like dice, let statistics paint the picture. Motion blur, depth of field, soft shadows. Order through disorder.",
        souls: 350,
        embers: 135
    },
    {
        id: 13,
        title: "The Reyes Architecture",
        text: "Loren Carpenter's wife Rachel whispered the name: 'Reyes.' Renders Everything You Ever Saw. Pixar's secret weapon, 1987. Split, dice, shade, sample. Every film frame, a conquered infinity.",
        souls: 400,
        embers: 145
    },
    {
        id: 14,
        title: "Kajiya's Rendering Equation",
        text: "James Kajiya, 1986, wrote the equation that rules all light. Three lines of mathematics containing every possible rendering algorithm. The Digital Pharaoh's curse: 'Solve this, and you solve reality.'",
        souls: 400,
        embers: 145
    },
    {
        id: 15,
        title: "The Shadow Volume Tome",
        text: "Frank Crow, 1977, taught shadows to have volume. Extend silhouette edges to infinity, count entries and exits. Medieval mathematics for modern machines. Even darkness has geometry.",
        souls: 450,
        embers: 155
    },
    {
        id: 16,
        title: "Subdivision's Promise",
        text: "Catmull-Clark, 1978. Doo-Sabin, 1978. Two teams, same year, same revelation: infinite smoothness through recursive subdivision. Start with rough stone, split forever, approach perfection asymptotically.",
        souls: 450,
        embers: 155
    },
    {
        id: 17,
        title: "The NURBS Heresy",
        text: "Non-Uniform Rational B-Splines. The CAD world's dark magic. Precise curves for engineers, smooth surfaces for artists. Pierre Bézier at Renault, Paul de Casteljau at Citroën - rivals encoding car curves in mathematics.",
        souls: 500,
        embers: 165
    },
    {
        id: 18,
        title: "Perlin's Noise",
        text: "Ken Perlin, 1983, working on TRON. 'The textures look too perfect,' they said. So he invented controlled chaos - coherent noise. Now every cloud, every mountain, every flame dances to Perlin's algorithm.",
        souls: 500,
        embers: 165
    },
    {
        id: 19,
        title: "The Mandelbrot Recursion",
        text: "Benoit Mandelbrot, 1980, revealed infinity in bounded space. Fractals - patterns within patterns, forever. 'Clouds are not spheres,' he declared. Nature builds with recursion, not geometry.",
        souls: 550,
        embers: 175
    },
    {
        id: 20,
        title: "Porter-Duff Compositing",
        text: "Thomas Porter and Tom Duff at Lucasfilm, 1984. The algebra of transparency - how to layer realities. OVER, IN, OUT, ATOP. Every Photoshop layer, every film composite, follows their rules.",
        souls: 550,
        embers: 175
    },

    // Act III: The Silicon Renaissance (21-30)
    {
        id: 21,
        title: "SGI's Geometry Engine",
        text: "Jim Clark, 1982, left Stanford to build Silicon Graphics. First hardware transform and lighting. The Geometry Engine - twelve custom chips doing matrix math at light speed. Reality at 30 frames per second.",
        souls: 600,
        embers: 185
    },
    {
        id: 22,
        title: "The OpenGL Covenant",
        text: "1992, SGI released their power to the world. OpenGL - the graphics library that would outlive its creator. Kurt Akeley, Mark Segal, prophets of the open standard. DirectX would come later, but OpenGL came first.",
        souls: 600,
        embers: 185
    },
    {
        id: 23,
        title: "id's Dimensional Break",
        text: "John Carmack at id Software, 1991. Wolfenstein 3D's ray casting trick. Not true 3D, but it felt real. Then Doom, then Quake. Each engine, a revolution. Carmack opened doorways to digital hells.",
        souls: 650,
        embers: 195
    },
    {
        id: 24,
        title: "The Voodoo Acceleration",
        text: "3dfx Interactive, 1996. The Voodoo Graphics card. First consumer 3D acceleration under $300. Glide API, bilinear filtering, alpha blending. PC gaming ascended. Every teenager became a wizard.",
        souls: 650,
        embers: 195
    },
    {
        id: 25,
        title: "nVidia's CUDA Prophecy",
        text: "2006, Jensen Huang's vision manifest. Graphics cards computing more than graphics. CUDA - Compute Unified Device Architecture. GPUs became the new supercomputers. Parallel processing for the masses.",
        souls: 700,
        embers: 205
    },
    {
        id: 26,
        title: "The Unreal Awakening",
        text: "Tim Sweeney, 1998. Unreal Engine 1.0. Not just a game, but a platform. Every version, more powerful. By Unreal Engine 5, 2021, Nanite and Lumen - unlimited polygons, infinite light bounces.",
        souls: 700,
        embers: 205
    },
    {
        id: 27,
        title: "Physically Based Rendering",
        text: "2010s, the industry converged on truth. Energy conservation, Fresnel equations, measured BRDFs. Disney, Epic, everyone agreed: stop faking, start simulating. Materials became real.",
        souls: 750,
        embers: 215
    },
    {
        id: 28,
        title: "The Texture Space Revolution",
        text: "id Software's Megatexture, 2007. Virtual texturing - stream what you see, forget what you don't. John Carmack again, breaking RAM's chains. Every surface unique, no repetition.",
        souls: 750,
        embers: 215
    },
    {
        id: 29,
        title: "Ambient Occlusion's Soft Truth",
        text: "2002, ILM used it for Pearl Harbor. Darkness where surfaces meet, shadows in the creases. Not physically accurate, but perceptually perfect. Sometimes wrong looks more right than right.",
        souls: 800,
        embers: 225
    },
    {
        id: 30,
        title: "The Motion Capture Prophecy",
        text: "Rotoscoping evolved. Optical markers, magnetic sensors, then markerless capture. Andy Serkis became Gollum, 2001. The boundary dissolved - where does actor end and animation begin?",
        souls: 800,
        embers: 225
    },

    // Act IV: The Open Source Rebellion (31-40)
    {
        id: 31,
        title: "Stallman's GNU Manifesto",
        text: "1985, Richard Stallman declared war on proprietary software. 'Free as in freedom,' he said. GNU tools spread like wildfire. The revolution needed graphics. Blender would answer the call.",
        souls: 850,
        embers: 235
    },
    {
        id: 32,
        title: "The Blender Liberation",
        text: "Ton Roosendaal's NaN went bankrupt, 2002. Blender held hostage. '€100,000 to free it,' said the creditors. The community raised it in seven weeks. October 13, 2002 - Blender's source code released.",
        souls: 850,
        embers: 235
    },
    {
        id: 33,
        title: "GIMP's Defiance",
        text: "Spencer Kimball and Peter Mattis, 1995, UC Berkeley students. 'Why should Photoshop cost $600?' Built GIMP - GNU Image Manipulation Program. Proved students could match Adobe. Free tools for free minds.",
        souls: 900,
        embers: 245
    },
    {
        id: 34,
        title: "The Linux Render Farms",
        text: "DreamWorks Animation, 2001, moved to Linux for Shrek. Thousands of machines, zero Windows licenses. Open source OS rendering closed source films. The irony was not lost on Microsoft.",
        souls: 900,
        embers: 245
    },
    {
        id: 35,
        title: "WebGL's Democratic Light",
        text: "2011, Khronos Group brought OpenGL to browsers. No plugins, no installation. Every device a potential render farm. Three.js made it accessible. The democratization of 3D.",
        souls: 950,
        embers: 255
    },
    {
        id: 36,
        title: "The Godot Engine Rising",
        text: "Juan Linietsky and Ariel Manzur, 2014. MIT licensed game engine. 'If Unity can charge, we can be free.' Godot waiting for the industry that never came. So they built their own.",
        souls: 950,
        embers: 255
    },
    {
        id: 37,
        title: "Vulkan's Low Level Truth",
        text: "2016, Khronos Group again. OpenGL's successor - closer to metal, less overhead. Every draw call deliberate, every state change explicit. Power through responsibility.",
        souls: 1000,
        embers: 265
    },
    {
        id: 38,
        title: "The USD Alliance",
        text: "Pixar's Universal Scene Description, 2016, made open. Disney, Apple, Nvidia, everyone joined. One format to rule them all. Scenes as databases, animation as differential equations.",
        souls: 1000,
        embers: 265
    },
    {
        id: 39,
        title: "Machine Learning's Dark Art",
        text: "2017, Neural networks learned to denoise ray tracing. OptiX AI denoiser - one sample looking like a thousand. GANs creating textures from nothing. The machine dreams of electric sheep.",
        souls: 1050,
        embers: 275
    },
    {
        id: 40,
        title: "The Ray Tracing Return",
        text: "2018, Nvidia RTX. Real-time ray tracing in hardware. Thirty years after Whitted's paper, his algorithm in silicon. Every reflection real, every shadow true. The circle closes.",
        souls: 1050,
        embers: 275
    },

    // Act V: The Digital Transcendence (41-49)
    {
        id: 41,
        title: "NeRF's Implicit Revolution",
        text: "2020, Neural Radiance Fields. No polygons, no textures - just a neural network dreaming of space. Feed it photos, it dreams the scene. Reality compressed into weights and biases.",
        souls: 1100,
        embers: 285
    },
    {
        id: 42,
        title: "The Metahuman Prophecy",
        text: "Epic Games, 2021. Photorealistic humans in minutes. Every pore, every hair, every subtle expression. The uncanny valley crossed. Digital actors indistinguishable from real.",
        souls: 1100,
        embers: 285
    },
    {
        id: 43,
        title: "Nanite's Infinite Detail",
        text: "Unreal Engine 5, 2021. Virtualized geometry - billions of polygons, rendered in real-time. LOD automatic, seamless. The promise of unlimited detail finally kept.",
        souls: 1150,
        embers: 295
    },
    {
        id: 44,
        title: "Lumen's Global Illumination",
        text: "Real-time infinite light bounces. No baking, no light maps. Every surface a light source. The renderer thinking at the speed of light. Dreams of photons made manifest.",
        souls: 1150,
        embers: 295
    },
    {
        id: 45,
        title: "The Simulation Hypothesis",
        text: "As our renders approach reality, a question emerges: If we can simulate reality perfectly, how do we know we're not already in one? The renderer's final paradox.",
        souls: 1200,
        embers: 305
    },
    {
        id: 46,
        title: "Quantum Rendering Hypothesis",
        text: "Research papers appear: 'Quantum algorithms for ray tracing.' Superposition of light paths, entangled photons. The next revolution waiting in laboratories. Schrödinger's pixel.",
        souls: 1200,
        embers: 305
    },
    {
        id: 47,
        title: "The Holographic Principle",
        text: "Light field displays, no glasses needed. Every angle correct, parallax perfect. The screen dissolves, only the image remains. The boundary between digital and physical erased.",
        souls: 1250,
        embers: 315
    },
    {
        id: 48,
        title: "The Last Frame",
        text: "Every renderer chases the perfect frame - indistinguishable from reality. But what happens when we achieve it? Do we transcend, or realize we were always there?",
        souls: 1250,
        embers: 315
    },
    {
        id: 49,
        title: "The Eternal Return",
        text: "In the end, all graphics return to the first principle: light and shadow, form and void. From Sutherland's first line to neural networks dreaming of worlds. The cycle completes. The render never ends.",
        souls: 1500,
        embers: 500
    }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = memoryFragments;
} else {
    window.memoryFragments = memoryFragments;
}
