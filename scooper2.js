const { HDNodeWallet } = require('ethers'),
      wordlist = require('./wordlist.json'),
      axios = require('axios'),
      cheerio = require('cheerio');

class Scooper {
    constructor() {

    }

    scoop() {
        return new Promise(async (resolve, reject) => {
            const wallet = this.wallet();
            if(wallet == undefined || wallet == null) return undefined;

                await this.walletDetails(wallet.address);

            return undefined;
        })
        
    }

    
    phrase() {
        const words = [];
    
        while (words.length < 12) {
            const randomNumber = Math.floor(Math.random() * 2048);
            words.push(wordlist[randomNumber]);
        }

        return words.join(' ');
    }

    wallet() {
        const phrase = this.phrase();
            console.log(phrase);
        try {
            const wallet = HDNodeWallet.fromPhrase(phrase, undefined, `m/44'/60'/0'/0/0'`);
                console.log(wallet);
            return wallet;
        } catch(e) {
            // Do nothing.
        }
    }

    async walletDetails(address) {
        const url = `https://etherscan.io/address/${address}`;
            console.log(url);

        return new Promise(async (resolve, reject) => {
            const data = await fetch(url);

            console.log(data);
            
            resolve(data);
        });
        





        /*
        const { data } = await axios.get(url);
        
            const $ = cheerio.load(data),
            balanceInfo = $("i[class='fab fa-ethereum me-1 text-muted']"),
            whole = balanceInfo['0'].next.data,
            partials = balanceInfo['0'].next.next.next.data,
            tokensDiv = $("tbody[class='js-assets text-nowrap align-middle']"),
            tokenHoldings = [];

        tokensDiv.find('tr').each((i, elem) => {
            tokenName = $(elem).find('td').eq(1).text().trim();
            totalTokens = $(elem).find('td').eq(4).text().trim();
            tokenValue = $(elem).find('td').eq(5).text().trim();

                tokenHoldings.push(`${tokenName} @${tokenValue} / ${totalTokens}`);
        })

        console.log(`ETH Balance: ${whole}.${partials}`);
        console.log('Token Holdings:', tokenHoldings);*/

    }
}

module.exports = Scooper;