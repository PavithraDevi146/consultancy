const { Compiler } = require('mind-ar/src/image-target/compiler.js');
const { loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

async function compile() {
    console.log("Loading image...");
    const imagePath = path.join(__dirname, '../frontend/public/land.png');
    const outputPath = path.join(__dirname, '../frontend/public/land.mind');

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
