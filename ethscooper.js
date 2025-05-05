const { HDNodeWallet, WebSocketProvider, getIndexedAccountPath } = require('ethers'),
      list = require('./wordlist.json'),
      { WSS_URL } = require('./env');

class Scooper {
    constructor() {

        this.provider = new WebSocketProvider(WSS_URL);

        this.shouldRun = true;

        this.totalRan = 0;

    }

    async scoop() {
        const wallet = this.wallet();

            if(wallet === false) return undefined;

        const balance = await this.provider.getBalance(wallet.address);
        this.totalRan += 1;
            if(balance !== BigInt(0n)) {
                console.log(`[ Phrase succesful: ] ${phrase}`);
                console.log({
                    Address: wallet.address,
                    PubKey: wallet.publicKey,
                    Balance: balance
                })
            }
        return undefined;
    }

    phrase() {
        const words = [];
        
        while (words.length < 12) {
            const randomNumber = Math.floor(Math.random() * 2048);
            words.push(list[randomNumber]);
        }

        return words.join(' ');
    }

    wallet() {
        const phrase = this.phrase();

        try {
            const wallet = HDNodeWallet.fromPhrase(phrase, undefined, `m/44'/60'/0'/0/0`);
            return wallet;
        } catch(e) {
            return false;
        }
    }
}

module.exports = Scooper;