const btc = require('./btcscooper.js'),
      scooper = new btc();


scooper.wallet();

/*

console.log('BTC Scooper started');

process.stdout.write(`Total Ran: ${scooper.totalRan}`);

setInterval(() => {
    if(scooper.shouldRun === false) return undefined;
    else scooper.scoop();
}, 2000);

setInterval(() => {
    process.stdout.cursorTo(11)

    process.stdout.clearLine(1);

    process.stdout.write(String(scooper.totalRan));
}, 5000) */