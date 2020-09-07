import { layers } from "./dom/layers";
import { resolveBundle } from "./network/xhr";
import { webGl } from "./graphics/webgl";
import { keyboard } from "./controls/keyboard";
import { nippleArrows } from "./controls/nipple-arrows";
import { domToKeyCode, domToKeyCodes, keyCodesToDom, namedKeyCodes } from "./dom/keys";
import { audioNode } from "./sound/audio-node";
import { save, load } from "./persist/save-load";

import { DosInstance, DosFactoryType, DosOptions } from "./js-dos";

export class EmulatorsUi {
    dom = {
        layers, // DOM components that used by js-dos player
    };

    network = {
        resolveBundle, // GET request to download bundles
    };

    graphics = {
        webGl, // default webgl renderer
    };

    sound = {
        audioNode, // default auidio processor
    };

    persist = {
        save, // store updated bundle into `emulators.cache`
        load, // get updated bundle form `emulators.cache`
    };

    controls = {
        namedKeyCodes, // mappinf from key name to it's key code
        domToKeyCodes, // mapping from DOM key codes to js-dos key codes
        domToKeyCode, // function that converts DOM key code to js-dos key code
        keyCodesToDom, // mapping from js-dos key codes to DOM key codes
        keyboard, // default keyboard processor
        nippleArrows, // multitouch control for emulating keyboard on mobiles
    };

    // default player
    dos: DosFactoryType = (root: HTMLDivElement, options?: DosOptions) => {
        return new DosInstance(root, this, options || {});
    };
};

const impl = new EmulatorsUi();
(window as any).emulatorsUi = impl;
(window as any).Dos = impl.dos;
