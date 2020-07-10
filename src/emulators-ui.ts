import { layers } from "./dom/layers";
import { resolveBundle } from "./network/xhr";
import { webGl } from "./graphics/webgl";
import { keyboard } from "./controls/keyboard";
import { audioNode } from "./sound/audio-node";

export const EmulatorsUi = {
    dom: {
        layers,
    },
    network: {
        resolveBundle,
    },
    graphics: {
        webGl,
    },
    sound: {
        audioNode,
    },
    controls: {
        keyboard,
    },
};

(window as any).emulatorsUi = EmulatorsUi;
