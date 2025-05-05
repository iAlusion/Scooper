const bip39 = require('bip39'),
      ecc = require('tiny-secp256k1'),
      { BIP32Factory } = require('bip32'),
      bip32 = BIP32Factory(ecc),
      crypto = require('crypto'),
      bitcoin = require('bitcoinjs-lib');

      /** 
       * @todo => {
       * - Multi pc
       * - Express server send/receive
       * - Multi path validation }
       * 
      */


class BtcScooper {
    constructor() {

        this.shouldRun = false;

        this.totalRan = 0;

    }

    getAddress (node, network) {
        return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
    }

    async wallet() {
        this.totalRan += 1;
        const randomBytes = crypto.randomBytes(16);
                console.log(randomBytes);
        const phrase = bip39.entropyToMnemonic(randomBytes.toString('hex'));
                console.log(phrase);
        const seed = bip39.mnemonicToSeedSync(phrase);
                console.log(seed);
        const root = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
                console.log(root);

        const child = root.derivePath("m/44'/0'/0'"),
              address = this.getAddress(child);
              //lookup = await this.btcLookup(address);

        const wallet = {
            address: address,
            pubKey: child.publicKey.toString('hex'),
            privKey: child.privateKey.toString('hex'),
            //Balance: Number(lookup.balance),
            //Total_Received: Number(lookup.totalReceived),
            //Total_Sent: Number(lookup.totalSent),
            //Txs_Count: lookup.txs,
            //Unconfirmed_Balance: Number(lookup.unconfirmedBalance),
            //Unconfirmed_Txs: lookup.unconfirmedTxs
        }

        //if(wallet.Balance !== 0) console.log(`[ Running Phrase: ] ${phrase}`);
            console.log(wallet);
        return wallet;
    }

    async btcLookup(address) {
        const fetched = await fetch(`https://btcbook.nownodes.io/api/v2/address/${address}`, {
            headers: {
                "api-key": process.env.btckey
            }
        });

        const parsed = await fetched.json();

        return parsed;
    }

    async scoop() {

        const wallet = await this.wallet();

            if(wallet.Balance === 0) return undefined;

            console.log(`[ Result: ]`);
            console.log(wallet);

        return undefined;
    }
}

module.exports = BtcScooper;