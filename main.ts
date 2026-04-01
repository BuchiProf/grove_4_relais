/**
 * Extension Grove 4-Channel Relay V1.0
 */
//% color=#03a9f4 icon="\uf0e7" block="Grove 4-Relais"
namespace Grove4Relais {
    const CMD_CHANNEL_CTRL = 0x10;

    /**
     * Adresses I2C possibles pour le module 4-relais
     */
    export enum RelayAddr {
        //% block="0x11"
        Addr0x11 = 0x11,
        //% block="0x12"
        Addr0x12 = 0x12
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

    // On garde l'adresse active et l'état des relais en mémoire
    let _activeAddr = RelayAddr.Addr0x11;
    let _states: { [key: number]: number } = {};

    /**
     * Sélectionne le module relais sur lequel on veut travailler.
     * @param addr L'adresse I2C du module (0x11 ou 0x12)
     */
    //% block="choisir le module à l'adresse %addr"
    //% addr.defl=RelayAddr.Addr0x11
    export function selectModule(addr: RelayAddr): void {
        _activeAddr = addr;
        // Si c'est la première fois qu'on utilise cette adresse, on initialise son état à 0
        if (_states[_activeAddr] === undefined) {
            _states[_activeAddr] = 0;
        }
    }

    /**
     * Change l'état d'un relais sur le module actuellement sélectionné.
     */
    //% block="mettre le relais %channel à %state"
    export function controlRelay(channel: RelayNumber, state: RelayState): void {
        // Initialisation de l'état si nécessaire
        if (_states[_activeAddr] === undefined) _states[_activeAddr] = 0;

        if (state == RelayState.ON) {
            _states[_activeAddr] |= (1 << (channel - 1));
        } else {
            _states[_activeAddr] &= ~(1 << (channel - 1));
        }

        let buf = pins.createBuffer(2);
        buf[0] = CMD_CHANNEL_CTRL;
        buf[1] = _states[_activeAddr];

        pins.i2cWriteBuffer(_activeAddr, buf);
    }

    /**
     * Éteint tous les relais du module actuel.
     */
    //% block="éteindre tous les relais"
    export function allOff(): void {
        _states[_activeAddr] = 0;
        let buf = pins.createBuffer(2);
        buf[0] = CMD_CHANNEL_CTRL;
        buf[1] = 0;
        pins.i2cWriteBuffer(_activeAddr, buf);
    }
}