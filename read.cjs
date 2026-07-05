const xlsx = require("xlsx");
const wb = xlsx.readFile("TKB.xls");
const sheet = wb.Sheets[wb.SheetNames[0]];
console.log(xlsx.utils.sheet_to_csv(sheet).substring(0, 3000));
