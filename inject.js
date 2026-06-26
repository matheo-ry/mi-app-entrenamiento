const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

app = app.replace(/notes:\s*"(\d+)\sserie.*?",/g, (match, num) => {
    return match + '\n                totalSets: ' + num + ',';
});

fs.writeFileSync('app.js', app);
console.log("Done");
