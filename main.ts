/**
 * Extension pour le module Grove 4-Relais (I2C)
 */
//% color=#03a9f4 icon="\uf0e7" block="Grove 4-Relais"
namespace Grove4Relais {
    const ADDR = 0x11; // Adresse I2C par défaut du module

    export enum RelayState {
        //% block="allumé"
        ON = 1,
        //% block="éteint"
        OFF = 0
    }

    export enum RelayNumber {
        //% block="1"
        Relay1 = 1,
        //% block="2"
        Relay2 = 2,
        //% block="3"
        Relay3 = 3,
        //% block="4"
        Relay4 = 4
    }

    /**
     * Contrôle un relais spécifique du module.
     * @param relay le numéro du relais (1-4)
     * @param state l'état souhaité (ON ou OFF)
     */
    //% block="mettre le relais %relay à %state"
    //% relay.defl=RelayNumber.Relay1
    export function controlRelay(relay: RelayNumber, state: RelayState): void {
        let buffer = pins.createBuffer(2);

        // La commande I2C pour le Seeed 4-Relay :
        // Registre correspondant au relais (0x01 à 0x04)
        // Valeur (0xFF pour ON, 0x00 pour OFF)

        buffer[0] = relay;
        buffer[1] = (state == RelayState.ON) ? 0xFF : 0x00;

        pins.i2cWriteBuffer(ADDR, buffer);
    }

    /**
     * Contrôle tous les relais en même temps via un masque binaire.
     * @param mask un nombre entre 0 et 15 (ex: 15 pour tout allumer)
     */
    //% block="tous les relais état (masque) %mask"
    //% mask.min=0 mask.max=15
    //% advanced=true
    export function allRelays(mask: number): void {
        let buffer = pins.createBuffer(2);
        buffer[0] = 0x00; // Registre de contrôle global
        buffer[1] = mask;
        pins.i2cWriteBuffer(ADDR, buffer);
    }
}