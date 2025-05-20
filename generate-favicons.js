const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create favicon directory if it doesn't exist
const faviconDir = path.join(__dirname, 'favicon');
if (!fs.existsSync(faviconDir)) {
    fs.mkdirSync(faviconDir);
}

// Source logo path
const sourceLogo = path.join(__dirname, 'images', 'mpdee_logo.png');

// Generate different sizes
const sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'apple-touch-icon.png': 180,
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512
};

// Process each size
Object.entries(sizes).forEach(([filename, size]) => {
    sharp(sourceLogo)
        .resize(size, size, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toFile(path.join(faviconDir, filename))
        .then(() => console.log(`Generated ${filename}`))
        .catch(err => console.error(`Error generating ${filename}:`, err));
}); 