const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../public/assets/reviews');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const reviews = [
  {
    id: 1,
    source: 'IMG_0872_16d5e823.png',
    platform: 'Instagram',
    crop: { top: 620, bottom: 1670 },
    avatars: [
      { cx: 109, cy: 1176, r: 46 },
      { cx: 109, cy: 1504, r: 46 },
    ],
    redactions: [],
    highlight: 'All good , great job ❤️',
    fullText: 'Yes got the service. Its all good. How\'s your experience? All good , great job ❤️',
  },
  {
    id: 2,
    source: 'IMG_0880_41f4fe48.png',
    platform: 'Messages',
    crop: { top: 780, bottom: 1560 },
    avatars: [],
    redactions: [],
    highlight: 'It was excellent they were very professional and pleasant',
    fullText: 'Did my technicians came or Called yet? Yes, they came around 1 PM and left around two. Great how was the service? It was excellent they were very professional and pleasant',
  },
  {
    id: 3,
    source: 'IMG_0874_9aba1e4d.png',
    platform: 'Facebook',
    crop: { top: 410, bottom: 1890 },
    avatars: [
      { cx: 79, cy: 740, r: 42 },
      { cx: 79, cy: 1164, r: 42 },
      { cx: 79, cy: 1820, r: 42 },
    ],
    redactions: [
      { x: 440, y: 492, w: 350, h: 46, color: '#1b75e4' },
    ],
    highlight: 'They were quite quick and efficient I\'m very happy thank you',
    fullText: 'Hello, Did you get our services? Yes I did thank you very much. How was our service? They were quite quick and efficient I\'m very happy thank you. Please do recommend... I will indeed thank you',
  },
  {
    id: 4,
    source: 'IMG_0877_10effc30.png',
    platform: 'Messages',
    crop: { top: 720, bottom: 1560 },
    avatars: [
      { cx: 76, cy: 1480, r: 42 },
    ],
    redactions: [],
    highlight: 'The gentlemen were very efficient and respectful. I assume that the cleaning was well done',
    fullText: 'THU AT 9:33 PM How was the service? The gentlemen were very efficient and respectful. I assume that the cleaning was well done and that my house will be more dustless. Thanks.',
  },
  {
    id: 5,
    source: 'IMG_0873_73f569a3.png',
    platform: 'Facebook',
    crop: { top: 530, bottom: 1840 },
    avatars: [
      { cx: 79, cy: 920, r: 42 },
      { cx: 80, cy: 1512, r: 42 },
      { cx: 1142, cy: 1738, r: 24 },
    ],
    redactions: [],
    highlight: 'They r doing a gr8 job n Freindly respectful',
    fullText: 'Okay, How was the service of your house? They r doing a gr8 job n Freindly respectful. Glad you like it 😊. Can you have more customers for me? We are also available on next week for the services in the area. I\'ll ask around ❤️. Thank you!',
  },
  {
    id: 6,
    source: 'IMG_0878_095a5bf9.png',
    platform: 'Instagram',
    crop: { top: 820, bottom: 1560 },
    avatars: [
      { cx: 75, cy: 1405, r: 42 },
      { cx: 1135, cy: 1435, r: 24 },
    ],
    redactions: [],
    highlight: 'It had not been done before so needed the extra clean. Thanks again!',
    fullText: 'How was the service? Hi Jeff, thank you for the services. It had nit been done before so needed the extra clean. Thanks again! ❤️',
  },
  {
    id: 7,
    source: 'IMG_0875_96939cbb.png',
    platform: 'Instagram',
    crop: { top: 720, bottom: 1640 },
    avatars: [
      { cx: 75, cy: 1195, r: 42 },
      { cx: 1130, cy: 1210, r: 24 },
    ],
    redactions: [
      { x: 808, y: 768, w: 104, h: 32, color: '#1c1c1c' },
    ],
    highlight: 'It was great! Yes they did, thank you very much',
    fullText: 'Yes they did, thank you very much. How was the service? It was great! You can let me know if any of your friends neighbors and relatives wants the service too 😊.',
  },
  {
    id: 8,
    source: 'IMG_0871_fecfc5c7.png',
    platform: 'Instagram',
    crop: { top: 380, bottom: 2080 },
    avatars: [
      { cx: 87, cy: 1444, r: 49 },
      { cx: 87, cy: 1920, r: 49 },
    ],
    redactions: [
      { x: 420, y: 448, w: 110, h: 48, color: '#8b20e0' },
    ],
    highlight: 'It was good he was super nice. It was a lot more than I had planned but it is what it is!',
    fullText: 'Ya he came yesterday. How\'s the service? It was good he was super nice. It was a lot more than I had planned but it is what it is! ❤️',
  },
  {
    id: 9,
    source: 'IMG_0876_9bce5160.png',
    platform: 'Messages',
    crop: { top: 980, bottom: 1420 },
    avatars: [
      { cx: 78, cy: 1230, r: 48 },
    ],
    redactions: [],
    highlight: 'They just left; did a wonderful job; thank you!',
    fullText: 'Hi have you done by the service? They just left; did a wonderful job; thank you!',
  },
  {
    id: 10,
    source: 'IMG_0879_bdc2859a.png',
    platform: 'Instagram',
    crop: { top: 900, bottom: 1480 },
    avatars: [
      { cx: 75, cy: 1380, r: 44 },
    ],
    redactions: [],
    highlight: 'It was done ❤️',
    fullText: 'Hi have you done by the service? ❤️ It was done',
  },
];

async function run() {
  for (const item of reviews) {
    const srcPath = path.resolve(__dirname, '../public/assets/aistudio', item.source);
    const img = sharp(srcPath);
    const meta = await img.metadata();
    const width = meta.width;

    const svgParts = [];
    for (const av of item.avatars) {
      svgParts.push(`<circle cx="${av.cx}" cy="${av.cy}" r="${av.r}" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>`);
    }
    for (const red of item.redactions) {
      svgParts.push(`<rect x="${red.x}" y="${red.y}" width="${red.w}" height="${red.h}" rx="10" fill="${red.color}"/>`);
    }

    const svg = Buffer.from(`
      <svg width="${width}" height="${meta.height}" xmlns="http://www.w3.org/2000/svg">
        ${svgParts.join('\n')}
      </svg>
    `);

    const composited = await sharp(srcPath)
      .composite([{ input: svg, top: 0, left: 0 }])
      .toBuffer();

    const cropH = item.crop.bottom - item.crop.top;
    const cropped = sharp(composited).extract({
      left: 0,
      top: item.crop.top,
      width: width,
      height: cropH,
    });

    const webpPath = path.join(outDir, `review_${item.id}.webp`);
    const pngPath = path.join(outDir, `review_${item.id}.png`);

    await cropped.clone().webp({ quality: 92 }).toFile(webpPath);
    await cropped.clone().png({ compressionLevel: 8 }).toFile(pngPath);

    console.log(`Generated review_${item.id}.webp & .png (${width}x${cropH})`);
  }
}

run().catch(console.error);
