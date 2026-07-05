const fs = require('fs');
const header = fs.readFileSync('TKB.xls').slice(0, 4);
console.log(header.toString('hex'));
