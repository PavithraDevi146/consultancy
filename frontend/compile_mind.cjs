const { Compiler } = require('mind-ar/src/image-target/compiler.js');
const { loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

async function compile() {
    console.log("Loading image...");
    const imagePath = process.argv[2];
    const outputPath = process.argv[3];

    if (!imagePath || !outputPath) {
        console.error("Usage: node compile_mind.js <input.png> <output.mind>");
        process.exit(1);
    }

    try {
        const image = await loadImage(imagePath);
        console.log("Image loaded! Initializing compiler...");
        const compiler = new Compiler();
        console.log("Compiling... This may take a moment.");
        await compiler.compileImageTargets([image], (progress) => {
            console.log(`Progress: ${progress.toFixed(2)}%`);
        });
        console.log("Compilation complete. Exporting buffer...");
        const buffer = compiler.exportData();
        fs.writeFileSync(outputPath, new Uint8Array(buffer));
        console.log(`Saved to ${outputPath}`);
    } catch (e) {
        console.error("Error during compilation:", e);
    }
}

compile();
