import { layers } from "./dom/layers";
import { resolveBundle } from "./network/xhr";
import { webGl } from "./graphics/webgl";
import { keyboard } from "./controls/keyboard";
import { nippleArrows } from "./controls/nipple-arrows";
import { audioNode } from "./sound/audio-node";

export class EmulatorsUi {
    dom = {
        layers,
    };

    network = {
        resolveBundle,
    };

    graphics = {
        webGl,
    };

    sound = {
        audioNode,
    };

    controls = {
        keyboard,
        nippleArrows,
    };
};

(window as any).emulatorsUi = new EmulatorsUi();
