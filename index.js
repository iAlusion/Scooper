const ETHScooper = require('./ethscooper.js'),
      BTCScooper = require('./btcscooper.js'),
      ethScooper = new ETHScooper(),
      btcScooper = new BTCScooper;

// combine eth/btc logs

if(ethScooper.shouldRun === true) {
    setInterval(() => {
        ethScooper.scoop();
    }, 100);
    console.log('ETH Scooper started')
}

if(btcScooper.shouldRun === true) {
    setInterval(() => {
        btcScooper.scoop();
    }, 100);
    console.log('BTC Scooper started')
}

if(btcScooper.shouldRun && ethScooper.shouldRun) {
    process.stdout.write(`BTC Ran: ${btcScooper.totalRan} | ETH Ran: ${ethScooper.totalRan}`);
} 
else {
    process.stdout.write(`${btcScooper.shouldRun === true ? 'BTC' : 'ETH' } Ran: ${btcScooper.shouldRun === true ? btcScooper.totalRan : ethScooper.totalRan}`);
        setInterval(() => {
            process.stdout.cursorTo(11)
        
            process.stdout.clearLine(1);
        
            process.stdout.write(String(btcScooper.shouldRun === true ? btcScooper.totalRan : ethScooper.totalRan));
        }, 5000)
};