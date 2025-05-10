import BtcScooper, { BtcOptions } from "./scoopers/btcscooper.ts";
import { EthScooper } from "./scoopers/ethscooper.ts";
import type { EthOptions } from "./scoopers/ethscooper.ts";

export default class Controller {

    ethScooper: EthScooper | undefined
    btcScooper: BtcScooper | undefined

    constructor(options: {
        eth?: EthOptions
        btc?: BtcOptions
    }) {

        this.ethScooper = undefined;

            if(options?.eth?.run && options.eth.run === true) this.ethScooper = new EthScooper(options.eth);
        
        this.btcScooper = undefined;

            if(options?.btc?.run && options.btc.run === true) this.btcScooper = new BtcScooper(options.btc);
    }

    /*
     - Add console funcs
     - Fix BTC scooper towards TS
     - Fix BTC scooper wallet grabbing
     */

    startLoop() {
        /*
        if(this.btcScooper instanceof BtcScooper) {
            // Add loop btc
        }
        */
        if(this.ethScooper instanceof EthScooper) {
            setInterval(() => {
                this?.ethScooper?.scoop();
            }, this.ethScooper.timegap);
            console.log('ETH Scooper started')
        }

        this.log();
    }

    log() {
        const temp = undefined //temporary

        /*if(this.ethScooper instanceof EthScooper && this.btcScooper instanceof BtcScooper) {
            process.stdout.write(`BTC Ran: ${this.btcScooper.totalRan} | ETH Ran: ${this.ethScooper.totalRan}`);

            // process double
        } else if(this.btcScooper instanceof BtcScooper) {

        } else */ if(this.ethScooper instanceof EthScooper) {
            process.stdout.write(`${/*this.btcScooper.shouldRun*/ temp === true ? 'BTC' : 'ETH' } Ran: ${/*this.btcScooper.shouldRun*/ temp === true ? /*this.btcScooper.totalRan*/0 : this.ethScooper.totalRan}`);
            setInterval(() => {
                process.stdout.cursorTo(9)
            
                process.stdout.clearLine(1);
            
                process.stdout.write(String(/*this.btcScooper.shouldRun*/ temp === true ? /*this.btcScooper.totalRan*/ '0' : this.ethScooper?.totalRan));
            }, 5000)
        }
    }
}