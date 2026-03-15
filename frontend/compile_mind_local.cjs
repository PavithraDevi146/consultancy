const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function compile() {
    console.log("Launching Edge...");
    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        headless: process.env.HEADLESS !== 'false'
    });
    const page = await browser.newPage();

    const downloadPath = path.resolve(__dirname, 'public');
    const client = await page.createCDPSession();
    await client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath,
    });

    console.log("Navigating to MindAR compiler...");
    await page.goto('https://hiukim.github.io/mind-ar-js-doc/tools/compile', { waitUntil: 'networkidle2' });

    const fileInput = await page.$('input[type="file"]');
    if (!fileInput) {
        console.log("File input not found");
        await browser.close();
        return;
    }
    console.log("Uploading land.png...");
    await fileInput.uploadFile(path.resolve(__dirname, 'public/land.png'));

    // The Start button might be just a button
    await new Promise(r => setTimeout(r, 1000));
    const buttons = await page.$$('button');
    for (let btn of buttons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text.includes('Start')) {
            await btn.click();
            break;
        }
    }

    console.log("Wait for Download button (this might take 10-30s)...");
    await page.waitForFunction(() => {
        return Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Download compiled'));
    }, { timeout: 60000 });

    console.log("Clicking Download...");
    for (let btn of await page.$$('button')) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text.includes('Download compiled')) {
            await btn.click();
            break;
        }
    }

    // Wait for file
    console.log("Waiting for file to download to public directory...");
    await new Promise(r => setTimeout(r, 3000));
    await browser.close();

    // Check if targets.mind downloaded
    if (fs.existsSync(path.join(downloadPath, 'targets.mind'))) {
        fs.renameSync(path.join(downloadPath, 'targets.mind'), path.join(downloadPath, 'land.mind'));
        console.log("Success! land.mind is ready at", path.join(downloadPath, 'land.mind'));
    } else {
        console.log("targets.mind not found in", downloadPath, " - download might have failed or went somewhere else.");
    }
}

compile().catch(console.error);
