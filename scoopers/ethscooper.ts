import { HDNodeWallet, WebSocketProvider } from 'ethers';
import list from '../wordlist.json' with { type: 'json' };

export type EthOptions = {
    run: boolean,
    timegap?: number,
    url: string,
    phraseLength?: number
}

export class EthScooper {

    provider: WebSocketProvider | undefined
    timegap: number | undefined
    url: string
    phraseLength: number
    totalRan: number

    constructor(options: EthOptions) {

        this.provider = undefined;

        this.timegap = options.timegap ? options.timegap : 100

        this.url = options.url

        this.phraseLength = options.phraseLength ? options.phraseLength : 12;
        
        this.totalRan = 0;

        this.setProvider(this.url);

    }

    setProvider(url: string) {
        try {
            const provider = new WebSocketProvider(url);
                this.provider = provider;
        } catch(err) {
            throw err;
        }
    }

    async scoop() {
        const phrase = this.phrase(this.phraseLength),
              wallet = this.wallet(phrase);

            if(wallet === false) return undefined;

        const balance = await this.provider?.getBalance(wallet.address);
            this.totalRan += 1;

            if(balance === undefined) return undefined;

            if(balance !== BigInt(0n)) {
                console.log(`[ Phrase succesful: ] ${phrase}`);
                console.log({
                    Address: wallet.address,
                    PubKey: wallet.publicKey,
                    Balance: balance,
                    wallet
                })
            }
        return undefined;
    }

    phrase(length: number) {
        const words: string[] = [];
        
        while (words.length < length) {
            const randomNumber = Math.floor(Math.random() * 2048);
            words.push(list[randomNumber]);
        }

        return words.join(' ');
    }

    wallet(phrase: string) {

        try {
            const wallet = HDNodeWallet.fromPhrase(phrase, undefined, `m/44'/60'/0'/0/0`);
            return wallet
        } catch(e) {
            return false;
        }
    }
}