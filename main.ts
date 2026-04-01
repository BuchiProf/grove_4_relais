/**
 * Extension pour le module 4-Relais I2C de Seeed Studio
 */
// % color="#03AA14" icon="\uf013" block="Relais Seeed"
namespace seeed4Relay {

    // Menu déroulant pour l'état
    export enum RelayState {
        // % block="allumé"
        On = 1,
        // % block="éteint"
        Off = 0
    }

    // NOUVEAU : Menu déroulant pour le choix du relais
    export enum RelayNumber {
        // % block="sw1"
        Relay1 = 1,
        // % block="sw2"
        Relay2 = 2,
        // % block="sw3"
        Relay3 = 3,
        // % block="sw4"
        Relay4 = 4
    }

    /**
     * Change l'état d'un relais spécifique via menu déroulant
     */
    // % block="mettre le relais %num à %state"
    // % num.defl=RelayNumber.Relay1
    export function controlRelay(num: RelayNumber, state: RelayState): void {
        let buf = pins.createBuffer(2);
        buf[0] = num;   // Utilise la valeur de l'enum (1, 2, 3 ou 4)
        buf[1] = state; // Utilise 1 ou 0
        pins.i2cWriteBuffer(0x11, buf);
    }
}