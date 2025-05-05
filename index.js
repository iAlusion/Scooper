const eth = require('./ethscooper.js'),
      scooper = new eth();

console.log('ETH Scooper started')

process.stdout.write(`Total Ran: ${scooper.totalRan}`);

setInterval(() => {
    if(scooper.shouldRun === false) return undefined;
    else scooper.scoop();
}, 100);

setInterval(() => {
    process.stdout.cursorTo(11)

    process.stdout.clearLine(1);

    process.stdout.write(String(scooper.totalRan));
}, 5000)