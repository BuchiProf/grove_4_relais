/**
 * Extension Grove 4-Channel Relay V1.0
 * Basé sur la bibliothèque officielle Seeed Studio
 */
//% color=#03a9f4 icon="\uf0e7" block="Grove 4-Relais"
namespace Grove4Relais {
    const ADDR = 0x11;
    const CMD_CHANNEL_CTRL = 0x10;

    // On garde l'état en mémoire comme dans la librairie C++
    let channel_state = 0;

    export enum RelayState {
        //% block="allumé"
        ON = 1,
        //% block="éteint"
        OFF = 0
    }

    export enum RelayNumber {
        //% block="1"
        R1 = 1,
        //% block="2"
        R2 = 2,
        //% block="3"
        R3 = 3,
        //% block="4"
        R4 = 4
    }

    /**
     * Change l'état d'un seul relais sans affecter les autres.
     */
    //% block="mettre le relais %channel à %state"
    //% channel.min=1 channel.max=4
    export function controlRelay(channel: RelayNumber, state: RelayState): void {
        if (state == RelayState.ON) {
            // Equivalent Arduino : channel_state |= (1 << (channel - 1))
            channel_state |= (1 << (channel - 1));
        } else {
            // Equivalent Arduino : channel_state &= ~(1 << (channel - 1))
            channel_state &= ~(1 << (channel - 1));
        }

        let buf = pins.createBuffer(2);
        buf[0] = CMD_CHANNEL_CTRL;
        buf[1] = channel_state;
        pins.i2cWriteBuffer(ADDR, buf);
    }

    /**
     * Éteint tous les relais immédiatement.
     */
    //% block="éteindre tous les relais"
    export function allOff(): void {
        channel_state = 0;
        let buf = pins.createBuffer(2);
        buf[0] = CMD_CHANNEL_CTRL;
        buf[1] = 0;
        pins.i2cWriteBuffer(ADDR, buf);
    }
}