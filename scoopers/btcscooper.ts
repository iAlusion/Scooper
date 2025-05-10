import { JsonRpcProvider } from "ethers";
import bip39 from 'bip39';
//import ecc from 'tiny-secp256k1';
import BIP32Factory, { BIP32Interface } from 'bip32';
import crypto from 'crypto';
import bitcoin from 'bitcoinjs-lib';

      /** 
       * @todo => {
       * - Multi pc
       * - Express server send/receive
       * - Multi path validation }
       * 
      */

export type BtcOptions = {
    run: boolean
    timegap?: number
    url: string
    phraseLength?: 12
}

export default class BtcScooper {

    provider: JsonRpcProvider | undefined
    timegap?: number
    phraseLength?: number
    url: string
    totalRan: number
    //fac32

    constructor(options: BtcOptions) {

        this.url = options.url

        this.provider = undefined;

        this.totalRan = 0;

        //this.fac32 = BIP32Factory(ecc)

        this.setProvider()

    }

    setProvider() {
        try{
            const provider = new JsonRpcProvider(this.url)
             this.provider = provider;
        } catch(err) {
            throw err;
        }
    }

    getAddress (node) {
        return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network: bitcoin.networks.bitcoin }).address
    }

    async wallet() {
        this.totalRan += 1;
        const randomBytes = crypto.randomBytes(16);
                //console.log(randomBytes);
        const phrase = bip39.entropyToMnemonic(randomBytes.toString('hex'));
                console.log(phrase);
        const seed = bip39.mnemonicToSeedSync(phrase);
                //console.log(seed);
        const root = BIP32Factory.fromSeed() //    .fromSeed(seed, bitcoin.networks.bitcoin);
                //console.log(root);

        const child = root.derivePath("m/44'/0'/0'"),
              address = this.getAddress(child),
              lookup = await this.btcLookup(address);
            return undefined;
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
            //console.log(wallet);
        return wallet;
    }

    async btcLookup(address) {
        const test = await this.provider?.getBalance(address);

        return test;
    }

    async scoop() {

        const wallet = await this.wallet();

            if(wallet == undefined || wallet.Balance === 0) return undefined;

            console.log(`[ Result: ]`);
            console.log(wallet);

        return undefined;
    }
}