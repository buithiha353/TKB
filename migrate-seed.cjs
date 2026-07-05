const fs = require('fs');
let code = fs.readFileSync('src/lib/timetable/seed.ts', 'utf8');

code = code.replace(
  /"primarySchoolId":\s*([^,]+),\s*(?:("secondarySchoolId":\s*[^,]+),\s*)?"morningOffDay":\s*(\d+)/g,
  (match, p1, p2, p3) => {
    let schools = [p1];
    if (p2) {
      let secMatch = p2.match(/"secondarySchoolId":\s*([^,]+)/);
      if (secMatch && secMatch[1] !== 'null') {
        schools.push(secMatch[1]);
      }
    }
    return `"schoolIds": [${schools.join(', ')}],\n    "offDay": ${p3},\n    "isOffFullDay": false`;
  }
);

fs.writeFileSync('src/lib/timetable/seed.ts', code);
