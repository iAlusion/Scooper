import Controller from './controller.ts'

const control = new Controller({
    eth: {
        run: true,
        url: 'somesocketurl',
        phraseLength: 12,
        timegap: 100
    }
});

control.startLoop();