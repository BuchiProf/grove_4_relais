/**
 * Extension Grove 4-Channel Relay V1.0
 * Basé sur la bibliothèque officielle Seeed Studio
 */
//% color=#03a9f4 icon="\uf0e7" block="Grove 4-Relais"
namespace Grove4Relais {
    
    const CMD_CHANNEL_CTRL = 0x10;

    // On crée une variable pour l'adresse, par défaut 0x11
    let _moduleAddr = 0x11;
    let channel_state = 0;

    /**
         * Définit l'adresse I2C du module (0x11 ou 0x12).
         * @param addr l'adresse I2C (ex: 17 pour 0x11, 18 pour 0x12)
         */
    //% block="utiliser le module à l'adresse %addr"
    //% addr.defl=0x11
    export function setAddress(addr: number): void {
        _moduleAddr = addr;
    }

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
     * Contrôle un relais spécifique.
     */
    //% block="mettre le relais %channel à %state"
    export function controlRelay(channel: RelayNumber, state: RelayState): void {
        if (state == RelayState.ON) {
            channel_state |= (1 << (channel - 1));
        } else {
            channel_state &= ~(1 << (channel - 1));
        }

        let buf = pins.createBuffer(2);
        buf[0] = CMD_CHANNEL_CTRL;
        buf[1] = channel_state;

        // On utilise la variable _moduleAddr au lieu de la constante ADDR
        pins.i2cWriteBuffer(_moduleAddr, buf);
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
        pins.i2cWriteBuffer(_moduleAddr, buf);
    }
}