const fs = require('fs');
const path = require('path');

const animeRecords = require('../src/data/animeRecords.json');

const outputFile = path.join(__dirname, '..', 'public', 'api', 'animes.json');

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(animeRecords, null, 2)}\n`);

console.log(`Synced AniFlix API payload to ${outputFile}`);
