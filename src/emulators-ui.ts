import { layers } from "./dom/layers";
import { resolveBundle } from "./network/xhr";
import { webGl } from "./graphics/webgl";
import { keyboard } from "./controls/keyboard";
import { nippleArrows } from "./controls/nipple-arrows";
import { domToKeyCode, domToKeyCodes, keyCodesToDom } from "./dom/keys";
import { audioNode } from "./sound/audio-node";

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

    controls = {
        domToKeyCodes, // mapping from DOM key codes to js-dos key codes
        domToKeyCode, // function that converts DOM key code to js-dos key code
        keyCodesToDom, // mapping from js-dos key codes to DOM key codes
        keyboard, // default keyboard processor
        nippleArrows, // multitouch control for emulating keyboard on mobiles
    };
};

(window as any).emulatorsUi = new EmulatorsUi();
